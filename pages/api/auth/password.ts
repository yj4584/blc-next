// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import { AuthCheck } from 'modules/back/AuthCheck';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';

const PutMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	const { isLogin } = loginInfo;

	if (isLogin == false) {
		return res.status(400).json({
			isLogin: isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}
	const { init, id: cocodaUserId, newPassword } = req.query;
	if (init) {
		try {
			const result = await CocodaUserController.resetPassword(
				Number(cocodaUserId),
			);
			return res.status(200).json({
				isLogin: isLogin,
				msg: result ? 'password reset success!' : 'password reset failure!',
				code: 200,
				result: result,
			});
		} catch (err) {
			return res.status(404).json({
				isLogin: isLogin,
				msg: '',
				code: 404,
				result: null,
			});
		}
	}
	if (!init) {
		try {
			await CocodaUserController.updateUserPassword(
				Number(cocodaUserId),
				newPassword as string,
			);
			return res.status(200).json({
				isLogin: isLogin,
				msg: 'pw 변경 성공',
				code: 200,
				result: null,
			});
		} catch (err) {
			return res.status(200).json({
				isLogin: isLogin,
				msg: '',
				code: 404,
				result: null,
			});
		}
	}
};

const AuthApiMethods: any = {
	PUT: PutMethod,
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
	let loginObj = await AuthCheck(req, res);

	return AuthApiMethods[req.method](req, res, loginObj);
}
