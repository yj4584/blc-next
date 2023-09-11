// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthCheck } from "modules/back/AuthCheck";
import { getFetchData } from "modules/back/FetchModule";
import { ApiDataInterface } from "data-interface/common";
import { LoginInfoInterface } from "data-interface/auth-interface";
import ImageController from "data-controllers/blcrasno/ImageController";

const GetMethod = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiDataInterface>,
  loginInfo: LoginInfoInterface
) => {
  try {
    
    const introData = await ImageController.findAll(
        {
            where: {
                page: 'deck',
                category: 'intro'
            }
        }
    );
    const materialData = await ImageController.findAll(
        {
            where: {
                page: 'deck',
                category: 'material'
            }
        }
    )
    const productData = await ImageController.findAll(
      {
          where: {
              page: 'deck',
              category: ['product', 'draft']
          },
      }
    ).then((res)=>res.map((item:any)=>item.get({plain:true})))
    let groupedProductData:any[] = [];
    productData.forEach((productDatum:any)=>{
      if(productDatum.order > groupedProductData.length) {
        groupedProductData.push({order: productDatum.order, products: [], drafts: []})
      }
      if (productDatum.category == "product") {
        groupedProductData[productDatum.order-1].products.push(productDatum.url)
      }
      if (productDatum.category == "draft") {
        groupedProductData[productDatum.order-1].drafts.push(productDatum.url)
      }
    })

    return res.status(200).json({
      isLogin: loginInfo.isLogin,
      msg: "조회 성공",
      code: 200,
      result: {
        intro: introData,
        materials: materialData,
        products: groupedProductData
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      isLogin: true,
      msg: "업로드 실패",
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
  res: NextApiResponse<ApiDataInterface>
) {
  let isLogin = {isLogin: true}
  // let isLogin = await AuthCheck(req, res);
  // if (isLogin.isLogin == false) {
  //   return res.status(200).json({
  //     isLogin: isLogin.isLogin,
  //     msg: "not login",
  //     code: 400,
  //     result: null,
  //   });
  // }

  if (typeof req.method != "string") {
    return res.status(200).json({
      isLogin: true,
      msg: "알 수 없는 메소드",
      code: 404,
      result: null,
    });
  }
  if (Object.keys(ApiMethods).includes(req.method) == false) {
    return res.status(200).json({
      isLogin: true,
      msg: "알 수 없는 메소드",
      code: 404,
      result: null,
    });
  }
  return ApiMethods[req.method](req, res, isLogin);
}
