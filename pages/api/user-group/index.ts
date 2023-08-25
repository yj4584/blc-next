// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserGroupController from 'data-controllers/webtoonguide/CocodaUserGroupController';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const userGroups = await CocodaUserGroupController.findAll({}, []);
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Success',
		code: 200,
		result: {
			userGroups,
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
	const pageTitle = '사용자 신규 등록';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '사용자 관리',
		headerDatas: [
			{ title: '사용자 관리', link: '/user' },
			{ title: '신규 등록', link: '/user/create' },
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
	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}
	return AuthApiMethods[req.method](req, res, isLogin, defaultMetaInfo);
}
