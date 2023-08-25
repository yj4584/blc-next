// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';
import ContentWeeklyReportUserGroupController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupController';
import JoinContentWeeklyReportUserGroup from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroup';
import JoinContentWeeklyReportUserGroupUser from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroupUser';
import JoinContentWeeklyReportUserGroupVoucher from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroupVoucher';
import joinCocodaUser from 'join-sequlize/webtoonguide/CocodaUser';
import { Op } from 'sequelize';

JoinContentWeeklyReportUserGroup([
	'ContentWeeklyReportUserGroupUser',
	'ContentWeeklyReportUserGroupVoucher',
]);
JoinContentWeeklyReportUserGroupVoucher(['ResellerAgency']);
JoinContentWeeklyReportUserGroupUser(['User', 'CocodaUser']);
joinCocodaUser(['UserGroup']);

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	let users = await CocodaUserController.findAll({}, [{ key: 'userGroup' }]);

	let mainWhereAttributes = {
		// '$contentWeeklyReportUserGroupUsers.cocodaUser.id$': loginInfo.userId,
	};
	let contentWeeklyReportUserGroup =
		await ContentWeeklyReportUserGroupController.findAll(
			[
				{
					key: 'contentWeeklyReportUserGroupVoucher',
					required: false,
					includes: [
						{
							key: 'resellerAgency',
						},
					],
					attributes: [
						'id',
						'user_group_id',
						'voucher_id',
						'voucher_name',
						'start_at',
						'end_at',
						'count',
						'sum_price',
						'ori_price',
						'price',
						'tax',
						'memo',
						'is_delete',
						'created_at',
						'updated_at',
						'insert_time',
						'delete_time',
						'insert_cocoda_user_id',
						'insert_reseller_agency_id',
						// 'expireType',   없는 것임 기존(admin2)에는 추가되어있던 속성
					],
					whereAttributes: {
						end_at: { [Op.gte]: Math.floor(Date.now() / 1000) },
					},
				},
				{
					key: 'contentWeeklyReportUserGroupUser',
					attributes: ['id'],
					includes: [
						{ key: 'user', attributes: ['id', 'email', 'name'] },
						{
							key: 'cocodaUser',
							attributes: ['id', 'email', 'name'],
						},
					],
				},
			],
			['id', 'name'],
			mainWhereAttributes,
		);

	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '',
		code: 200,
		result: {
			users,
			contentWeeklyReportUserGroup,
		},
		metaInfo: defaultMetaInfo,
	});
};

const AuthApiMethods: any = {
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

	const pageTitle = '전체 고객사 리스트';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '전체 고객사 리스트',
		titleTextKey: 'entire_clients',
		descriptionTextKey: 'entire_clients',
		headerDatas: [
			{
				title: '고객사/이용권 관리',
				link: '',
				textKey: 'manage_clients_users',
			},
			{
				title: '전체 고객사 관리',
				link: '/all-cutomer',
				textKey: 'entire_clients',
			},
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
	return AuthApiMethods[req.method](req, res, isLogin, defaultMetaInfo);
}
