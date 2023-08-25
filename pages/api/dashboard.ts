// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthCheck } from "modules/back/AuthCheck";
import { getFetchData } from "modules/back/FetchModule";
import { loginAction } from "modules/back/AuthModule";
import { ApiDataInterface } from "data-interface/common";

const GetMethod = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiDataInterface>
) => {
  let isLogin = await AuthCheck(req, res);
  if (isLogin.isLogin == false) {
    return res.status(200).json({
      isLogin: isLogin.isLogin,
      msg: "not login",
      code: 400,
      result: null,
    });
  }

  const pageTitle = isLogin.isLogin
    ? `사용자: [${isLogin.userName}] 총판 관리자 Dashboard`
    : "총판 관리자 Dashboard";
  return res.status(200).json({
    isLogin: isLogin.isLogin,
    msg: "",
    code: 200,
    result: { isAdmin: isLogin.otherData.isAdmin },
    metaInfo: {
      title: pageTitle,
      description: "총판 관리자 Dashboard",
      headerDatas: [{ title: "Dashboard", link: "/" }],
    },
  });
};

const AuthApiMethods: any = {
  GET: GetMethod,
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiDataInterface>
) {
  if (typeof req.method != "string") {
    return res.status(200).json({
      isLogin: true,
      msg: "알 수 없는 메소드",
      code: 404,
      result: null,
    });
  }
  if (Object.keys(AuthApiMethods).includes(req.method) == false) {
    return res.status(200).json({
      isLogin: true,
      msg: "알 수 없는 메소드",
      code: 404,
      result: null,
    });
  }
  return AuthApiMethods[req.method](req, res);
}
