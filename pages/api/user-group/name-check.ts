// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import { getFetchData } from 'modules/back/FetchModule';
import ContentWeeklyReportUserGroupController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupController';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	let bodyData = await getFetchData(req, res);
	let name = bodyData.name;
	try {
		const userGroups = await ContentWeeklyReportUserGroupController.findAll(
			[],
			['id'],
			{ name: name },
		);
		let result = false;
		if (userGroups.length > 0) result = true;
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '조회 성공',
			code: 200,
			result: result,
		});
	} catch (error) {
		return res.status(200).json({
			isLogin: true,
			msg: '서버 오류',
			code: 404,
			result: null,
		});
	}
};

const AuthApiMethods: any = {
	GET: GetMethod,
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
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
	return AuthApiMethods[req.method](req, res, isLogin);
}
