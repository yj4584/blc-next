// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import S3ToongaStorage from 'modules/back/S3ToongaStorage';
import ImageController from 'data-controllers/blcrasno/ImageController';

export const config = {
	api: {
		bodyParser: {
			sizeLimit: '50mb', // Set desired value here
		},
	},
};

const PostMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	let bodyData = await getFetchData(req, res); //body 데이터
	try {
		const path = await S3ToongaStorage.imageUpload(
			bodyData.base64Data,
			bodyData.fileType,
			bodyData.fileName,
			bodyData.parentPath,
		);
		const types = bodyData.parentPath.split('/');
		let whereAttributes: any = {
			page: types[0],
			category: types[1],
			product_id: bodyData.productId,
		};
		if (bodyData.order2) {
			whereAttributes.order2 = bodyData.order2;
		}
		const imageData = await ImageController.findOne({
			where: whereAttributes,
		});
		if (imageData == null) {
			await ImageController.create({
				page: types[0],
				category: types[1],
				order: bodyData.order,
				url: 'https://blcrasno-bucket.s3.ap-northeast-2.amazonaws.com/' + path,
			});
		} else {
			await ImageController.update(
				{
					url:
						'https://blcrasno-bucket.s3.ap-northeast-2.amazonaws.com/' + path,
				},
				{
					where: {
						id: imageData.id,
					},
				},
			);
		}

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '업로드 성공',
			code: 200,
			result: {
				path: path,
			},
		});
	} catch (error) {
		console.log(error);
		return res.status(200).json({
			isLogin: true,
			msg: '업로드 실패',
			code: 500,
			result: null,
		});
	}
};

const ApiMethods: any = {
	POST: PostMethod,
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
