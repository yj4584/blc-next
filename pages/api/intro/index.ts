// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import IntroController from 'data-controllers/blcrasno/IntroController';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	try {
		const introData = await IntroController.findOne({
			where: {
				id: 1,
			},
		});

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '조회 성공',
			code: 200,
			result: {
				introData,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			isLogin: true,
			msg: '조회 실패',
			code: 500,
			result: null,
		});
	}
};

const PutMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	try {
		let bodyData = await getFetchData(req, res);
		await IntroController.update(
			{
				text: bodyData.text,
			},
			{
				where: {
					id: 1,
				},
			},
		);

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '저장 성공',
			code: 200,
			result: {
				success: true,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			isLogin: true,
			msg: '저장 실패',
			code: 500,
			result: null,
		});
	}
};

const ApiMethods: any = {
	GET: GetMethod,
	PUT: PutMethod,
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
	let isLogin = { isLogin: true };
	// let isLogin = await AuthCheck(req, res);
	// if (isLogin.isLogin == false) {
	//   return res.status(200).json({
	//     isLogin: isLogin.isLogin,
	//     msg: "not login",
	//     code: 400,
	//     result: null,
	//   });
	// }

	if (typeof req.method != 'string') {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 메소드',
			code: 404,
			result: null,
		});
	}
	if (Object.keys(ApiMethods).includes(req.method) == false) {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 메소드',
			code: 404,
			result: null,
		});
	}
	return ApiMethods[req.method](req, res, isLogin);
}
