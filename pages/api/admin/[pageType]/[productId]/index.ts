// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import ImageController from 'data-controllers/blcrasno/ImageController';
import ProductController from 'data-controllers/blcrasno/ProductController';
import JoinProduct from 'join-sequlize/blcrasno/Product';
JoinProduct(['ProductInfo', 'Image']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	try {
		const productId = req.query.productId;
		const productData = await ProductController.findOne(
			{
				where: {
					id: productId,
				},
			},
			[
				{
					key: 'productInfo',
				},
				{
					key: 'image',
				},
			],
		).then((res: any) => res?.get({ plain: true }));
		let newImageData: any = {
			products: [],
			drafts: [],
			models: [],
		};
		productData.images.map((imageItem: any) => {
			if (imageItem.category == 'product') {
				newImageData.products.push(imageItem);
			} else if (imageItem.category == 'draft') {
				newImageData.drafts.push(imageItem);
			} else if (imageItem.category == 'model') {
				newImageData.models.push(imageItem);
			}
		});
		productData.images = newImageData;

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '조회 성공',
			code: 200,
			result: {
				productData: productData,
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
	GET: GetMethod,
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
