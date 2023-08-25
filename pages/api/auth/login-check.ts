// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiDataInterface } from 'data-interface/common';
import { AuthCheck } from 'modules/back/AuthCheck';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) => {
	let userInfo = await AuthCheck(req, res);
	return res.status(200).json({
		isLogin: userInfo.isLogin,
		msg: '',
		code: 200,
		result: userInfo,
	});
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
	return AuthApiMethods[req.method](req, res);
}
