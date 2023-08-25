// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import ResellerAgencyCustomerContractFileController from 'data-controllers/webtoonguide/ResellerAgencyCustomerContractFileController';

const DeleteMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) => {
	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}

	try {
		await ResellerAgencyCustomerContractFileController.deleteOneWithFileId(
			Number(req.query.fileId),
		);

		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'delete success',
			code: 200,
			result: {},
		});
	} catch (e) {
		res.status(400).json({
			isLogin: isLogin.isLogin,
			msg: 'delete failed',
			code: 400,
			result: {},
		});
	}
};

const AuthApiMethods: any = {
	DELETE: DeleteMethod,
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
