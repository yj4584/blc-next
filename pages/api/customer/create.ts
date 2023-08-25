// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import { getFetchData } from 'modules/back/FetchModule';
import MonetaryUnitController from 'data-controllers/webtoonguide/MonetaryUnitController';
import { Op } from 'sequelize';
import CocodaUserController, {
	CocodaUserControllerAttribute,
} from 'data-controllers/webtoonguide/CocodaUserController';
import { ResellerAgencyControllerAttribute } from 'data-controllers/webtoonguide/ResellerAgencyController';
import ContentWeeklyReportVoucherController, {
	ContentWeeklyReportVoucherControllerAttribute,
} from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherController';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const userId = loginInfo.userId;
	const monetaryUnits = await MonetaryUnitController.findAll({
		where: { id: { [Op.in]: [1, 2, 3] } },
	});
	let vouchers: ContentWeeklyReportVoucherControllerAttribute[] = [];
	if (loginInfo.otherData.isAdmin) {
		const dbVouchers = await ContentWeeklyReportVoucherController.findAll({}, [
			{
				key: 'contentWeeklyReportVoucherPrice',
				required: false,
			},
		]);
		if (typeof dbVouchers == 'undefined') {
			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: 'Vouchers Not Found',
				code: 404,
				result: null,
			});
		}
		dbVouchers.forEach((dbVoucher) => {
			const voucherPrices = dbVoucher?.contentWeeklyReportVoucherPrices ?? [];
			vouchers.push({
				id: dbVoucher.id,
				name: dbVoucher.name,
				prices: voucherPrices,
			});
		});
	} else {
		const cocodaUser: CocodaUserControllerAttribute | null =
			await CocodaUserController.findOne(
				{
					where: { id: userId },
					attributes: ['id'],
				},
				[
					{
						key: 'resellerAgency',
						required: false,
						through: { attributes: [] },
						includes: [
							{
								key: 'contentWeeklyReportVoucher',
								required: false,
								through: { attributes: [] },
								includes: [
									{
										key: 'contentWeeklyReportVoucherPrice',
										required: false,
									},
								],
							},
						],
					},
				],
			);
		if (cocodaUser == null) {
			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: 'Not Found User',
				code: 404,
				result: null,
			});
		}

		const resellerAgencies: ResellerAgencyControllerAttribute[] =
			cocodaUser?.resellerAgencies ?? [];
		resellerAgencies.forEach((resellerAgencie) => {
			const dbVouchers = resellerAgencie?.contentWeeklyReportVouchers;
			if (typeof dbVouchers == 'undefined') {
				return res.status(200).json({
					isLogin: loginInfo.isLogin,
					msg: 'Vouchers Not Found',
					code: 404,
					result: null,
				});
			}
			dbVouchers.forEach((dbVoucher) => {
				const voucherPrices = dbVoucher?.contentWeeklyReportVoucherPrices ?? [];
				vouchers.push({
					id: dbVoucher.id,
					name: dbVoucher.name,
					prices: voucherPrices,
				});
			});
		});
	}

	const pageTitle = `고객사 추가`;
	defaultMetaInfo = {
		title: pageTitle,
		description: `고객사 추가`,
		titleTextKey: 'add_client',
		descriptionTextKey: 'add_client',
		headerDatas: [
			{
				title: '고객사/이용권 관리',
				link: '/customer',
				textKey: 'manage_clients_users',
			},
			{
				title: '고객사 관리',
				link: '/customer',
				textKey: 'manage_clients',
			},
			{ title: `고객사 추가`, link: `/customer/create`, textKey: 'add_client' },
		],
	};

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Success',
		code: 200,
		result: {
			monetaryUnits,
			vouchers,
		},
		metaInfo: defaultMetaInfo,
	});
};

const AuthApiMethods: any = {
	GET: GetMethod,
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
	const isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'Not Login',
			code: 400,
			result: null,
		});
	}
	const bodyData = await getFetchData(req, res);

	// TODO: 페이지 헤더를 위한 작업 추가
	const pageTitle = '사용자 상세페이지';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '사용자 상세페이지',
		headerDatas: [
			{ title: '사용자 관리', link: '/user' },
			{ title: '사용자 상세페이지', link: `/user/${bodyData.userId}` },
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
