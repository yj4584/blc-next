// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import ContentWeeklyReportVoucherController from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherController';
import ContentWeeklyReportAccessTypeController from 'data-controllers/webtoonguide/ContentWeeklyReportAccessTypeController';
import joinContentWeeklyReportVoucher from 'join-sequlize/webtoonguide/ContentWeeklyReportVoucher';
import ContentWeeklyReportVoucherAccessTypeController from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherAccessTypeController';
import ContentWeeklyReportVoucherPriceController from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherPriceController';
joinContentWeeklyReportVoucher(['ContentWeeklyReportVoucherPrice']);
joinContentWeeklyReportVoucher(['ContentWeeklyReportAccessType']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	let ticketData = await ContentWeeklyReportVoucherController.findOne(
		{ where: { id: req.query.ticketId } },
		[
			{ key: 'contentWeeklyReportVoucherPrice' },
			{ key: 'contentWeeklyReportAccessType' },
		],
	);
	let accessTypeData = await ContentWeeklyReportAccessTypeController.findAll(
		{},
		[],
	);
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '조회 성공',
		code: 200,
		result: {
			ticketData,
			accessTypeData,
		},
		metaInfo: defaultMetaInfo,
	});
};

const PostMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	let bodyData = await getFetchData(req, res);
	// let deleteList = bodyData.accessTypes.deleteList;
	// let insertList = bodyData.accessTypes.insertList;
	let accessTypes = bodyData.accessTypes;
	let voucherId = bodyData.voucherId;
	let name = bodyData.name;
	let priceData = bodyData.priceData;
	let ticketData = await ContentWeeklyReportVoucherController.findOne(
		{ where: { id: voucherId } },
		[
			{ key: 'contentWeeklyReportVoucherPrice' },
			{ key: 'contentWeeklyReportAccessType' },
		],
	);
	try {
		// 이름 처리
		if (name != ticketData?.name) {
			ContentWeeklyReportVoucherController.updateOne(voucherId, { name: name });
		}
		// 권한 처리
		let prevAccessTypes = ticketData?.contentWeeklyReportAccessTypes;
		let deleteList = prevAccessTypes.filter((item: { id: any }) => {
			return !accessTypes.some((other: any) => other.id === item.id);
		});
		let insertList = accessTypes.filter((item: { id: any }) => {
			return !prevAccessTypes.some((other: any) => other.id === item.id);
		});

		deleteList.forEach(async (deleteItem: any, deleteIndex: number) => {
			await ContentWeeklyReportVoucherAccessTypeController.deleteByIds(
				deleteItem.content_weekly_report_voucher_access_type.access_type_id,
				deleteItem.content_weekly_report_voucher_access_type.voucher_id,
			);
		});
		insertList.forEach(async (insertItem: any, insertIndex: number) => {
			await ContentWeeklyReportVoucherAccessTypeController.insertByIds(
				insertItem.id,
				voucherId,
			);
		});

		// 가격 처리
		let prevPriceData = ticketData?.contentWeeklyReportVoucherPrices;
		if (prevPriceData.length > priceData.length) {
			for (let i = 0; i < prevPriceData.length - priceData.length; i++) {
				await ContentWeeklyReportVoucherPriceController.deleteById(
					prevPriceData[prevPriceData.length - i - 1].id,
				);
			}
		}
		priceData.forEach(async (priceItem: any, priceIndex: number) => {
			if (!prevPriceData[priceIndex]) {
				await ContentWeeklyReportVoucherPriceController.insertOne(
					voucherId,
					priceItem,
				);
			} else if (
				priceItem.month != prevPriceData[priceIndex].month ||
				priceItem.price != prevPriceData[priceIndex].price ||
				priceItem.real_price != prevPriceData[priceIndex].real_price
			) {
				await ContentWeeklyReportVoucherPriceController.updateOne(
					prevPriceData[priceIndex].id,
					priceItem,
				);
			}
		});
	} catch (error) {
		return res.status(200).json({
			isLogin: true,
			msg: '서버 오류',
			code: 404,
			result: null,
		});
	}

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '입력 성공',
		code: 200,
		result: 'success',
		metaInfo: defaultMetaInfo,
	});
};

const AuthApiMethods: any = {
	GET: GetMethod,
	POST: PostMethod,
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}

	const pageTitle = '이용권 수정';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '이용권 수정',
		headerDatas: [
			{ title: '고객사/이용권 관리', link: '' },
			{ title: '이용권 관리', link: '/ticket' },
			{ title: '이용권 수정', link: `/ticket/${req.query.ticketId}` },
		],
	};
	if (typeof req.method != 'string') {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 메소드',
			code: 404,
			result: null,
		});
	}
	if (Object.keys(AuthApiMethods).includes(req.method) == false) {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 메소드',
			code: 404,
			result: null,
		});
	}
	return AuthApiMethods[req.method](req, res, isLogin, defaultMetaInfo);
}
