// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';

import joinUser from 'join-sequlize/webtoonguide/CocodaUser';
import { getFetchData } from 'modules/back/FetchModule';
import CocodaUserCocodaUserGroupController from 'data-controllers/webtoonguide/CocodaUserCocodaUserGroupController';
import ResellerAgencyController from 'data-controllers/webtoonguide/ResellerAgencyController';
import ResellerAgencyUserController from 'data-controllers/webtoonguide/ResellerAgencyUserController';
joinUser(['CocodaUserGroup']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const bodyData = await getFetchData(req, res);
	let { id } = bodyData;

	if (typeof id == 'undefined' || id == null || id == '0') {
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: 'Wrong Input id',
			code: 400,
			result: null,
		});
	}
	id = Number(id);

	const user = await CocodaUserController.findOne(
		{
			where: {
				id: id,
			},
			attributes: ['id', 'name', 'nickname', 'email'],
		},
		[{ key: 'cocodaUserGroup', through: { attributes: [] } }],
	);

	if (user == null) {
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: 'Not Found User',
			code: 404,
			result: null,
		});
	}

	const pageTitle = `[${user.name}] 상세페이지`;
	defaultMetaInfo = {
		title: pageTitle,
		description: `[${user.name}] 상세페이지`,
		headerDatas: [
			{ title: '사용자 관리', link: '/user' },
			{ title: `[${user.name}] 상세페이지`, link: `/user/${user.id}` },
		],
	};

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Success',
		code: 200,
		result: {
			user,
		},
		metaInfo: defaultMetaInfo,
	});
};

const PutMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const bodyData = await getFetchData(req, res);
	let userId = bodyData.id;

	if (typeof userId == 'undefined' || userId == null || userId == '0') {
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: 'Wrong Input userId',
			code: 400,
			result: null,
		});
	}
	userId = Number(userId);

	try {
		const user = await CocodaUserController.findOne({
			where: {
				id: userId,
			},
		});

		if (user == null) {
			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: 'Not Found User',
				code: 404,
				result: null,
			});
		}
		const updateUser = await CocodaUserController.update(
			{
				name: bodyData.name,
				nickname: bodyData.nickname,
				email: bodyData.email,
				check_email: bodyData.email,
			},
			{
				where: {
					id: user.id,
				},
			},
		);

		const userGroupId = bodyData.userGroupId;
		await CocodaUserCocodaUserGroupController.delete({
			where: {
				cocoda_user_id: user.id,
			},
		});
		const cocodaUserCocodaUserGroup =
			await CocodaUserCocodaUserGroupController.create({
				cocoda_user_id: user.id,
				cocoda_user_group_id: userGroupId,
			});

		if (userGroupId != 2) {
			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: 'Update Success',
				code: 200,
				result: {},
			});
		}

		const resellerAgencyUser =
			await ResellerAgencyUserController.findOneByUserId(user.id);

		if (resellerAgencyUser == null) {
			const result = await ResellerAgencyController.createOne({
				name: '',
				memo: '',
				cocodaUserId: user.id,
				voucherIds: [],
				langId: 1,
			});
			if (result) {
				await ResellerAgencyUserController.createOne(result.id, user.id);
			}
		}
	} catch (error) {
		console.log('[User Update Error]', error);
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: 'Update Success',
			code: 200,
			result: {},
		});
	}

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: 'Update Success',
		code: 200,
		result: {},
	});
};

const AuthApiMethods: any = {
	GET: GetMethod,
	PUT: PutMethod,
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
	const bodyData = await getFetchData(req, res);

	// TODO: 페이지 헤더를 위한 작업 추가
	const pageTitle = '사용자 상세페이지';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '사용자 상세페이지',
		headerDatas: [
			{ title: '사용자 관리', link: '/user' },
			{ title: '사용자 상세페이지', link: `/user/${bodyData.id}` },
		],
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
