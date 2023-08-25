// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';
import bcrypt from 'bcrypt';
import DBAccess from 'models/index';

import joinUser from 'join-sequlize/webtoonguide/CocodaUser';
import CocodaUserCocodaUserGroupController from 'data-controllers/webtoonguide/CocodaUserCocodaUserGroupController';
import ResellerAgencyController from 'data-controllers/webtoonguide/ResellerAgencyController';
joinUser(['UserGroup']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	if (req.query.email) {
		const result = await CocodaUserController.findOneByEmail(
			req.query.email as string,
		);
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: 'Success',
			code: 200,
			result: {
				user: result,
			},
		});
	}

	const users = await CocodaUserController.findAll({}, [
		{ key: 'cocodaUserGroup', through: { attributes: [] } },
	]);
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Success',
		code: 200,
		result: {
			users,
		},
		metaInfo: defaultMetaInfo,
	});
};

const PostMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const bodyData = await getFetchData(req, res);
	const defaultPassword = '123456789a';
	const encPassword = await bcrypt.hash(defaultPassword, 12);
	const userGroupId = bodyData.userGroupId;

	try {
		await DBAccess['webtoonguide'].transaction(async (t) => {
			const cocodaUser = await CocodaUserController.create({
				name: bodyData.name,
				nickname: bodyData.nickname,
				email: bodyData.email,
				check_email: bodyData.email,
				password: encPassword,
				is_delete: 0,
			});

			if (!cocodaUser) {
				return res.status(200).json({
					isLogin: loginInfo.isLogin,
					msg: 'Create Failed',
					code: 500,
					result: null,
				});
			}

			const cocodasUserCocodaUserGroup =
				await CocodaUserCocodaUserGroupController.create({
					cocoda_user_id: cocodaUser.id,
					cocoda_user_group_id: userGroupId,
				});

			if (cocodasUserCocodaUserGroup && userGroupId == 2) {
				const result = await ResellerAgencyController.createOne({
					name: '',
					memo: '',
					cocodaUserId: cocodaUser.id,
					voucherIds: [],
					langId: 1,
				});
			} else {
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

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Create Success',
		code: 200,
		result: {},
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
	const pageTitle = '사용자 관리';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '사용자 관리',
		headerDatas: [{ title: '사용자 관리', link: '/user' }],
	};
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
	const isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'Not Login',
			code: 400,
			result: null,
		});
	}
	return AuthApiMethods[req.method](req, res, isLogin, defaultMetaInfo);
}
