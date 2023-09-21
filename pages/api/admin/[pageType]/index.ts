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
		const pageType = req.query.pageType;
		const productData = await ProductController.findAll(
			{
				where: {
					category: pageType,
				},
			},
			// [
			//   {
			//     key: 'productInfo',
			//   },
			//   {
			//     key: 'image'
			//   }
			// ]
		).then((res) => res.map((item: any) => item.get({ plain: true })));
		// productData.map((productItem:any)=>{
		//   let newImageData:any = {
		//     products: [],
		//     drafts: []
		//   };
		//   productItem.images.map((imageItem:any)=>{
		//     if (imageItem.category == "product") {
		//       newImageData.products.push(imageItem);
		//     } else if (imageItem.category == "draft") {
		//       newImageData.drafts.push(imageItem);
		//     }
		//   })
		//   productItem.images = newImageData;
		// })
		// const productImageData = await ImageController.findAll(
		//   {
		//       where: {
		//           page: 'deck',
		//           category: ['product', 'draft']
		//       },
		//   }
		// ).then((res)=>res.map((item:any)=>item.get({plain:true})))
		// let groupedProductImageData:any[] = [];
		// productImageData.forEach((productImageDatum:any)=>{
		//   if(productImageDatum.order > groupedProductImageData.length) {
		//     groupedProductImageData.push({order: productImageDatum.order, products: [], drafts: []})
		//   }
		//   if (productImageDatum.category == "product") {
		//     groupedProductImageData[productImageDatum.order-1].products.push(productImageDatum.url)
		//   }
		//   if (productImageDatum.category == "draft") {
		//     groupedProductImageData[productImageDatum.order-1].drafts.push(productImageDatum.url)
		//   }
		// })

		if (pageType == 'deck' || pageType == 'fence') {
			const introData = await ImageController.findAll({
				where: {
					page: pageType,
					category: 'intro',
				},
			});
			const materialData = await ImageController.findAll({
				where: {
					page: pageType,
					category: 'material',
				},
			});

			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: '조회 성공',
				code: 200,
				result: {
					intro: introData,
					materials: materialData,
					products: productData,
				},
			});
		}

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '조회 성공',
			code: 200,
			result: {
				products: productData,
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
