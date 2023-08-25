// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import ResellerAgencyController from 'data-controllers/webtoonguide/ResellerAgencyController';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	const seller = await ResellerAgencyController.getSellerInfo(
		Number(req.query.id),
	);

	if (!seller) {
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '',
			code: 404,
			result: {
				seller,
			},
		});
	}

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Success',
		code: 200,
		result: {
			seller,
		},
	});
};

const PutMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	const { name, memo, vouchers, email, langId } = JSON.parse(req.body.data);

	const initialSellerInfo: any = await ResellerAgencyController.getSellerInfo(
		Number(req.query.id),
	);

	// 1.메일이 수정되었나 검증
	// const userId =

	const cocodaUserId =
		initialSellerInfo?.dataValues.resellerAgencyUser.dataValues[
			'cocoda_user_id'
		];
	const originalEmail =
		initialSellerInfo.dataValues.resellerAgencyUser.dataValues.cocodaUser
			.dataValues.email;
	const originalName = initialSellerInfo.dataValues.name;
	const originalMemo = initialSellerInfo.dataValues.memo;
	const originalLangId = initialSellerInfo.dataValues['language_id'];
	const originalVouchers =
		initialSellerInfo.dataValues.resellerAgencyVouchers.map(
			(v: any) => +v.dataValues['voucher_id'],
		);

	const isNameModified = originalName != name;
	const isEmailModified = originalEmail != email;
	const isMemoModified = originalMemo != memo;
	const isVoucherModified =
		JSON.stringify(originalVouchers) !=
		JSON.stringify(vouchers.map((v: any) => +v));
	const isLangModified = +originalLangId != +langId;

	if (isEmailModified) {
		try {
			const user = await CocodaUserController.findOneByEmail(email);
			if (user) {
				res.status(400).json({
					isLogin: loginInfo.isLogin,
					msg: '이미 user로 등록된 이메일',
					code: 400,
					result: {
						resultUser: user,
					},
				});
				return;
			}
		} catch (err) {
			console.log(err);
			res.status(404).json({
				isLogin: loginInfo.isLogin,
				msg: '서버 오류 발생',
				code: 404,
				result: {
					err,
				},
			});
			return;
		}
	}

	const updateObj: any = {};
	if (isNameModified) {
		updateObj.name = name;
	}
	if (isLangModified) {
		updateObj.langId = +langId;
	}

	if (isMemoModified) {
		updateObj.memo = memo;
	}
	if (isEmailModified) {
		updateObj.email = email;
	}
	if (isVoucherModified) {
		updateObj.vouchers = vouchers.map((v: any) => +v);
	}
	if (Object.keys(updateObj).length) {
		try {
			await ResellerAgencyController.updateSeller(
				Number(req.query.id),
				cocodaUserId,
				{ ...updateObj },
			);
			return res.status(201).json({
				isLogin: loginInfo.isLogin,
				msg: '총판 정보 수정 성공',
				code: 201,
				result: null,
			});
		} catch (err) {
			return res.status(404).json({
				isLogin: loginInfo.isLogin,
				msg: '서버에러 발생',
				code: 404,
				result: { err },
			});
		}
	}
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '수정된 사항이 없습니다.',
		code: 200,
		result: null,
	});
};

const AuthApiMethods: any = {
	PUT: PutMethod,
	GET: GetMethod,
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}

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
	return AuthApiMethods[req.method](req, res, isLogin);
}
