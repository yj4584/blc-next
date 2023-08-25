// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController from 'data-controllers/webtoonguide/CocodaUserController';
import ContentWeeklyReportUserGroupController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupController';
import JoinContentWeeklyReportUserGroup from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroup';
import JoinContentWeeklyReportUserGroupUser from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroupUser';
import joinCocodaUser from 'join-sequlize/webtoonguide/CocodaUser';
import { Op } from 'sequelize';
import ContentWeeklyReportUserGroupVoucherController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupVoucherController';
import bcrypt from 'bcrypt';
import CocodaUserCocodaUserGroupController from 'data-controllers/webtoonguide/CocodaUserCocodaUserGroupController';
import ContentWeeklyReportUserGroupUserController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupUserController';
import ContentWeeklyReportUserGroupDailyServiceUserController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupDailyServiceUserController';
import ResellerAgencyUserController from 'data-controllers/webtoonguide/ResellerAgencyUserController';
import {
	convertUnixTo00_00_00,
	convertUnixTo23_59_59,
} from 'modules/common/TimeFunction';
import ResellerAgencyCustomerContractFileController from 'data-controllers/webtoonguide/ResellerAgencyCustomerContractFileController';
import ContentWeeklyReportUserGroupContractFileController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupContractFileController';
import { sendSlackAddVoucherInfo } from 'modules/common/SlackNotificationFunctions';

JoinContentWeeklyReportUserGroupUser(['User', 'CocodaUser']);
JoinContentWeeklyReportUserGroup([
	'ContentWeeklyReportUserGroupUser',
	'ContentWeeklyReportUserGroupVoucher',
]);
joinCocodaUser(['UserGroup']);

async function getMainWhereAttributes(isAdmin: boolean, loginInfo: any) {
	if (!isAdmin) {
		let userResellerAgency = await ResellerAgencyUserController.findOneByUserId(
			loginInfo.userId,
		).then((res) => res?.get({ plain: true }));

		if (!userResellerAgency?.reseller_agency_id) {
			return false;
		}
		return {
			'$contentWeeklyReportUserGroupVouchers.insert_reseller_agency_id$':
				userResellerAgency.reseller_agency_id,
		};
	}

	return {};
}

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	if (req.query.name) {
		const user = await ContentWeeklyReportUserGroupController.findOneByName(
			req.query.name as string,
		);

		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: '',
			code: 200,
			result: {
				user,
			},
		});
	}

	let users = await CocodaUserController.findAll({}, [{ key: 'userGroup' }]);

	let mainWhereAttributes = await getMainWhereAttributes(
		loginInfo.otherData.isAdmin,
		loginInfo,
	);

	if (mainWhereAttributes === false) {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 유저',
			code: 403,
			result: { hasResellerAgency: false },
		});
	}

	let contentWeeklyReportUserGroup =
		await ContentWeeklyReportUserGroupController.findAll(
			[
				{
					key: 'contentWeeklyReportUserGroupVoucher',
					required: false,
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
						'is_delete',
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
						{ key: 'cocodaUser', attributes: ['id', 'email', 'name'] },
					],
				},
			],
			['id', 'name'],
			mainWhereAttributes,
		);
	if (contentWeeklyReportUserGroup) {
		let filteredContentWeeklyReportUserGroup = contentWeeklyReportUserGroup.map(
			(item) => {
				let filteredItem = JSON.parse(JSON.stringify(item));
				let existingVouchers =
					item.contentWeeklyReportUserGroupVouchers?.filter(
						(item) => item.is_delete == 0,
					);
				filteredItem.contentWeeklyReportUserGroupVouchers = existingVouchers;
				return filteredItem;
			},
		);
		contentWeeklyReportUserGroup = filteredContentWeeklyReportUserGroup;
		// console.log(JSON.stringify(filteredContentWeeklyReportUserGroup));
	}

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

const PostMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'Not Login',
			code: 400,
			result: null,
		});
	}
	const bodyData = await getFetchData(req, res);
	const { customer, waitVouchers } = bodyData;
	const createData = {
		name: customer.name,
		created_at: Date.now(),
		updated_at: Date.now(),
	};
	const createCustomer = await ContentWeeklyReportUserGroupController.create(
		createData,
	);
	if (!createCustomer) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'Create Failed',
			code: 500,
			result: null,
		});
	}
	if (!loginInfo.userId) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'Not Login',
			code: 400,
			result: null,
		});
	}
	const resellerResult = await ResellerAgencyUserController.findOneByUserId(
		loginInfo.userId,
	);
	const resellerId = resellerResult?.dataValues.reseller_agency_id;

	// 계약서 처리
	const newFilesIds = bodyData.fileListInfo.map(({ fileId }: any) => fileId);
	await ContentWeeklyReportUserGroupContractFileController.update(
		{ customer_id: createCustomer.id },
		{
			where: {
				id: {
					[Op.in]: [...newFilesIds],
				},
			},
		},
	);

	let addVoucherForSendSlackMessageList: string[] = [];
	let addUserForSendSlackMessageList: string[] = [];
	let addDailyServiceUsersForSendSlackMessageList: string[] = [];

	// 이용권 처리
	const addVouchers: any = [];
	waitVouchers.forEach((waitVoucher: any) => {
		const voucher = {
			user_group_id: createCustomer.id,
			voucher_id: waitVoucher.nowSelectVoucher.value,
			voucher_name: waitVoucher.nowSelectVoucher.label,
			start_at: convertUnixTo00_00_00(
				new Date(waitVoucher.startDate).getTime() / 1000,
			),
			end_at: convertUnixTo23_59_59(
				new Date(waitVoucher.endDate).getTime() / 1000,
			),
			count: waitVoucher.count,
			sum_price: waitVoucher.real_price + waitVoucher.tax,
			ori_price: waitVoucher.price,
			price: waitVoucher.real_price,
			tax: waitVoucher.tax,
			memo: waitVoucher.memo,
			created_at: Date.now(),
			updated_at: Date.now(),
			insert_cocoda_user_id: loginInfo.userId,
			insert_reseller_agency_id: resellerId,
			monetary_unit_id: waitVoucher.currency,
			insert_time: Date.now() / 1000,
		};
		addVouchers.push(voucher);
		const voucherForSendSlackMessage = `${waitVoucher.nowSelectVoucher.label} ${waitVoucher.startDate} ~  ${waitVoucher.endDate} (${waitVoucher.month}개월)`;
		addVoucherForSendSlackMessageList.push(voucherForSendSlackMessage);
	});

	addVouchers.forEach(async (addVoucher: any) => {
		const addVoucherResult =
			await ContentWeeklyReportUserGroupVoucherController.create(addVoucher);
	});

	// 사용자 처리
	customer.users.forEach(async (user: any) => {
		addUserForSendSlackMessageList.push(user.email);
		let dbUser = await CocodaUserController.findOne({
			where: {
				email: user.email,
			},
		});
		if (dbUser != null) {
			const createContentWeeklyReportUserGroupUser =
				await ContentWeeklyReportUserGroupUserController.create({
					cocoda_user_id: dbUser.id,
					content_weekly_report_user_group_id: createCustomer.id,
				});
		} else {
			const encPassword = await bcrypt.hash('123456789a', 12);
			const addUser = {
				name: user.email,
				email: user.email,
				nickname: user.email,
				check_email: user.email,
				birth: '1970-01-01',
				gender: '알 수 없음',
				password: encPassword,
			};
			let userCheck = await CocodaUserController.findOne({
				where: {
					email: user.email,
				},
			});
			if (userCheck == null) {
				let dbUser = await CocodaUserController.create(addUser);
				if (dbUser != null) {
					const addUserGroup = {
						cocoda_user_id: dbUser.id,
						cocoda_user_group_id: 3,
					};
					const createUserUserGroup =
						await CocodaUserCocodaUserGroupController.create(addUserGroup);

					const addContentWeeklyReportUserGroupUser = {
						cocoda_user_id: dbUser.id,
						content_weekly_report_user_group_id: createCustomer.id,
						created_at: Date.now(),
						updated_at: Date.now(),
					};
					const createContentWeeklyReportUserGroupUser =
						await ContentWeeklyReportUserGroupUserController.create(
							addContentWeeklyReportUserGroupUser,
						);
				}
			}
		}
	});

	// 데일리 서비스 수신자 처리
	customer.daily_service_users.forEach(async (dailyServiceUser: any) => {
		const addDailyServiceUser = {
			content_weekly_report_user_group_id: createCustomer.id,
			name: dailyServiceUser.name,
			job_title: dailyServiceUser.job_title,
			email: dailyServiceUser.email,
			phone_number: dailyServiceUser.phone_number,
			created_at: Date.now(),
			updated_at: Date.now(),
		};
		const createDailyServiceUser =
			await ContentWeeklyReportUserGroupDailyServiceUserController.create(
				addDailyServiceUser,
			);
		const dailyServiceUsersForSendSlackMessage = `${dailyServiceUser.name} ${dailyServiceUser.job_title} ${dailyServiceUser.email}`;
		addDailyServiceUsersForSendSlackMessageList.push(
			dailyServiceUsersForSendSlackMessage,
		);
	});
	// 슬랙 전송
	sendSlackAddVoucherInfo(
		customer,
		addVoucherForSendSlackMessageList,
		addUserForSendSlackMessageList,
		addDailyServiceUsersForSendSlackMessageList,
		loginInfo,
	);

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
	console.log('!! api index');
	console.log(' req.method:', req.method);

	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}

	const pageTitle = '고객사 관리';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '고객사 관리',
		titleTextKey: 'manage_clients',
		descriptionTextKey: 'manage_clients',
		headerDatas: [
			{
				title: '고객사/이용권 관리',
				link: '',
				textKey: 'manage_clients_users',
			},
			{ title: '고객사 관리', link: '/customer', textKey: 'manage_clients' },
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
