// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
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
	let accessTypeData = await ContentWeeklyReportAccessTypeController.findAll(
		{},
		[],
	);
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '조회 성공',
		code: 200,
		result: {
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
	let accessTypes = bodyData.accessTypes;
	let name = bodyData.name;
	let priceData = bodyData.priceData;
	try {
		let voucherId = await ContentWeeklyReportVoucherController.insertOne(name);
		// 권한 처리
		accessTypes.forEach(async (accessType: any, accessTypeIndex: number) => {
			await ContentWeeklyReportVoucherAccessTypeController.insertByIds(
				accessType.id,
				voucherId,
			);
		});

		// 가격 처리
		priceData.forEach(async (priceItem: any, priceIndex: number) => {
			await ContentWeeklyReportVoucherPriceController.insertOne(
				voucherId,
				priceItem,
			);
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
			{ title: '이용권 추가', link: `/ticket/create` },
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
