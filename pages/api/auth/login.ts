// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import bcrypt from 'bcrypt';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) => {
	const defaultPassword = '123456789a';
	const encPassword = await bcrypt.hash(defaultPassword, 12);
	console.log(encPassword)
	return res.status(200).json({
		isLogin: false,
		msg: '',
		code: 200,
		result: {},
		metaInfo: {
			title: '로그인 페이지',
			description: '로그인 페이지',
		},
	});
};

const PostMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) => {
	let bodyData = await getFetchData(req, res);
	let loginResult = await loginAction(
		bodyData.email,
		bodyData.password,
		req,
		res,
	);

	return res.status(200).json({
		isLogin: loginResult.isSuccess,
		msg: loginResult.msg,
		code: loginResult.isSuccess ? 200 : 403,
		result: loginResult.isSuccess,
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
