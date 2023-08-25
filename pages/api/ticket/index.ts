// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';
import ContentWeeklyReportVoucherController from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherController';

// import joinUser from 'join-sequlize/webtoonguide/CocodaUser';
// joinUser(['UserGroup']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	let tickets = await ContentWeeklyReportVoucherController.findAll({}, []);
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '조회 성공',
		code: 200,
		result: {
			tickets,
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
	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}

	const pageTitle = '이용권 관리';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '이용권 관리',
		headerDatas: [
			{ title: '고객사/이용권 관리', link: '' },
			{ title: '이용권 관리', link: '/ticket' },
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
