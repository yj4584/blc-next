// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';

import joinUser from 'join-sequlize/webtoonguide/CocodaUser';
import ResellerAgencyController from 'data-controllers/webtoonguide/ResellerAgencyController';
import ContentWeeklyReportVoucherController from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherController';
import ResellerAgencyUserController from 'data-controllers/webtoonguide/ResellerAgencyUserController';

import bcrypt from 'bcrypt';
import DBAccess from 'models/index';

import CocodaUserCocodaUserGroupController from 'data-controllers/webtoonguide/CocodaUserCocodaUserGroupController';
joinUser(['UserGroup']);

joinUser(['UserGroup']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	const sellers = await ResellerAgencyController.getAllSeller();
	// let users = await CocodaUserController.findAll({}, [{ key: 'userGroup' }]);
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '',
		code: 200,
		result: {
			sellers,
		},
	});
};
const PostMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
) => {
	const { name, memo, vouchers, email, lang } = JSON.parse(req.body.data);

	const defaultPassword = '123456789a';
	const encPassword = await bcrypt.hash(defaultPassword, 12);
	const userGroupId = 2; // 총판그룹 아이디
	let newCocodauser: any;

	const userCheckResult = await CocodaUserController.findOneByEmail(email);

	if (userCheckResult) {
		return res.status(400).json({
			isLogin: loginInfo.isLogin,
			msg: '이미 존재하는 계정주소',
			code: 400,
			result: null,
		});
	}

	try {
		await DBAccess['webtoonguide'].transaction(async (t) => {
			const cocodaUser = await CocodaUserController.create({
				name: email,
				nickname: email,
				email: email,
				check_email: email,
				password: encPassword,
				is_delete: 0,
			});
			newCocodauser = cocodaUser;
			if (!cocodaUser) {
				return res.status(200).json({
					isLogin: loginInfo.isLogin,
					msg: 'user Create Failed',
					code: 500,
					result: null,
				});
			}

			const cocodasUserCocodaUserGroup =
				await CocodaUserCocodaUserGroupController.create({
					cocoda_user_id: cocodaUser.id,
					cocoda_user_group_id: userGroupId,
				});
			if (!cocodasUserCocodaUserGroup) {
				return res.status(200).json({
					isLogin: loginInfo.isLogin,
					msg: 'Create Failed',
					code: 500,
					result: null,
				});
			}
		});
	} catch (error) {
		console.log('[User Create Transaction Error]', error);
		return res.status(500).json({
			isLogin: loginInfo.isLogin,
			msg: 'Create Failed',
			code: 500,
			result: null,
		});
	}

	const seller = await ResellerAgencyController.findOneByName(name);
	if (seller) {
		res.status(400).json({
			isLogin: loginInfo.isLogin,
			msg: '이미 사용중인 회사명',
			code: 400,
			result: {
				// resultUser: user,
			},
		});
		return;
	}

	try {
		const result = await ResellerAgencyController.createOne({
			name,
			memo,
			cocodaUserId: newCocodauser?.dataValues?.id,
			voucherIds: vouchers.map((v: string) => +v),
			langId: lang,
		});

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '',
			code: 200,
			result: {},
		});
	} catch (err) {
		console.log(err);
	}
};

const AuthApiMethods: any = {
	GET: GetMethod,
	POST: PostMethod,
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
