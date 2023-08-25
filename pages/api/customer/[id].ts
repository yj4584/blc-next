// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import CocodaUserController, {
	CocodaUserControllerAttribute,
} from 'data-controllers/webtoonguide/CocodaUserController';
import ContentWeeklyReportUserGroupController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupController';
import JoinContentWeeklyReportUserGroup from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroup';
import { Op } from 'sequelize';
import ContentWeeklyReportUserGroupVoucherController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupVoucherController';
import bcrypt from 'bcrypt';
import CocodaUserCocodaUserGroupController from 'data-controllers/webtoonguide/CocodaUserCocodaUserGroupController';
import ContentWeeklyReportUserGroupUserController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupUserController';
import ContentWeeklyReportUserGroupDailyServiceUserController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupDailyServiceUserController';
import ResellerAgencyUserController from 'data-controllers/webtoonguide/ResellerAgencyUserController';
import MonetaryUnitController from 'data-controllers/webtoonguide/MonetaryUnitController';
import { ResellerAgencyControllerAttribute } from 'data-controllers/webtoonguide/ResellerAgencyController';
import ContentWeeklyReportVoucherController, {
	ContentWeeklyReportVoucherControllerAttribute,
} from 'data-controllers/webtoonguide/ContentWeeklyReportVoucherController';
import {
	convertUnixTo23_59_59,
	convertUnixTo00_00_00,
} from 'modules/common/TimeFunction';
import ContentWeeklyReportUserGroupContractFileController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupContractFileController';
import JoinContentWeeklyReportUserGroupContractFile from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroupContractFile';
import { timeConverterUnixToDashString } from 'modules/common/TimeFunction';
import {
	sendSlackAddVoucherInfo,
	sendSlackDeleteVoucherInfo,
	sendSlackEditVoucherInfo,
} from 'modules/common/SlackNotificationFunctions';

JoinContentWeeklyReportUserGroup([
	'ContentWeeklyReportUserGroupVoucher',
	'CocodaUser',
	'ContentWeeklyReportUserGroupDailyServiceUser',
]);
JoinContentWeeklyReportUserGroupContractFile();

const GetMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	const bodyData = await getFetchData(req, res);
	let { id } = bodyData;
	const monetaryUnits = await MonetaryUnitController.findAll({
		where: { id: { [Op.in]: [1, 2, 3] } },
	});
	let vouchers: ContentWeeklyReportVoucherControllerAttribute[] = [];
	if (loginInfo.otherData.isAdmin) {
		const dbVouchers = await ContentWeeklyReportVoucherController.findAll({}, [
			{
				key: 'contentWeeklyReportVoucherPrice',
				required: false,
			},
		]);
		if (typeof dbVouchers == 'undefined') {
			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: 'Vouchers Not Found',
				code: 404,
				result: null,
			});
		}
		dbVouchers.forEach((dbVoucher) => {
			const voucherPrices = dbVoucher?.contentWeeklyReportVoucherPrices ?? [];
			vouchers.push({
				id: dbVoucher.id,
				name: dbVoucher.name,
				prices: voucherPrices,
			});
		});
	} else {
		const cocodaUser: CocodaUserControllerAttribute | null =
			await CocodaUserController.findOne(
				{
					where: { id: loginInfo.userId },
					attributes: ['id'],
				},
				[
					{
						key: 'resellerAgency',
						required: false,
						through: { attributes: [] },
						includes: [
							{
								key: 'contentWeeklyReportVoucher',
								required: false,
								through: { attributes: [] },
								includes: [
									{
										key: 'contentWeeklyReportVoucherPrice',
										required: false,
									},
								],
							},
						],
					},
				],
			);
		if (cocodaUser == null) {
			return res.status(200).json({
				isLogin: loginInfo.isLogin,
				msg: 'Not Found User',
				code: 404,
				result: null,
			});
		}

		const resellerAgencies: ResellerAgencyControllerAttribute[] =
			cocodaUser?.resellerAgencies ?? [];
		resellerAgencies.forEach((resellerAgencie) => {
			const dbVouchers = resellerAgencie?.contentWeeklyReportVouchers;
			if (typeof dbVouchers == 'undefined') {
				return res.status(200).json({
					isLogin: loginInfo.isLogin,
					msg: 'Vouchers Not Found',
					code: 404,
					result: null,
				});
			}
			dbVouchers.forEach((dbVoucher) => {
				const voucherPrices = dbVoucher?.contentWeeklyReportVoucherPrices ?? [];
				vouchers.push({
					id: dbVoucher.id,
					name: dbVoucher.name,
					prices: voucherPrices,
				});
			});
		});
	}

	let customer = await ContentWeeklyReportUserGroupController.findOne(id, [
		{
			key: 'cocodaUser',
			required: false,
			attributes: ['id', 'email'],
		},
		{
			key: 'contentWeeklyReportUserGroupVoucher',
			required: false,
			attributes: [
				'id',
				'voucher_name',
				'price',
				'tax',
				'sum_price',
				'start_at',
				'end_at',
				'is_delete',
				'monetary_unit_id',
				'memo',
			],
		},
		{
			key: 'contentWeeklyReportUserGroupDailyServiceUser',
			required: false,
			attributes: ['id', 'email'],
		},
		{
			key: 'contentWeeklyReportUserGroupContractFile',
			required: false,
			attributes: ['id', 'customer_id', 'name', 'path'],
			includes: [
				{
					key: 'resellerAgencyCustomerContractFile',
					required: true,
					attributes: [
						'id',
						'contract_file_id',
						'cocoda_user_id',
						'reseller_agency_id',
					],
				},
			],
		},
	]);
	if (customer) {
		let existingVouchers =
			customer.contentWeeklyReportUserGroupVouchers?.filter(
				(item) => item.is_delete == 0,
			);
		customer.contentWeeklyReportUserGroupVouchers = existingVouchers;
	}
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '',
		code: 200,
		result: {
			monetaryUnits,
			vouchers,
			customer,
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
	const { customer, waitVouchers } = bodyData;
	const customerData = {
		name: customer.name,
		updated_at: Date.now(),
	};
	const upadateCustomer =
		await ContentWeeklyReportUserGroupController.updateUserGroup(
			customer.id,
			customerData,
		);
	if (!loginInfo.userId) {
		return res.status(200).json({
			isLogin: loginInfo.isLogin,
			msg: 'Not Login',
			code: 400,
			result: null,
		});
	}
	const resellerId = await ResellerAgencyUserController.findOneByUserId(
		loginInfo.userId,
	).then((res) => res?.dataValues.reseller_agency_id);

	let addVoucherForSendSlackMessageList: string[] = [];
	let addUserForSendSlackMessageList: string[] = [];
	let addDailyServiceUsersForSendSlackMessageList: string[] = [];
	let deleteVoucherForSendSlackMessageList: string[] = [];
	let deleteUserForSendSlackMessageList: string[] = [];
	let deleteDailyServiceUsersForSendSlackMessageList: string[] = [];
	let editedUserForSendSlackMessageList: string[] = [];
	let editedDailyServiceUsersForSendSlackMessageList: string[] = [];

	// 이용권 처리
	const addVouchers: any = [];
	waitVouchers.forEach((waitVoucher: any) => {
		const voucher = {
			user_group_id: customer.id,
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

	for (let addVoucher of addVouchers) {
		const addVoucherResult =
			await ContentWeeklyReportUserGroupVoucherController.create(addVoucher);
	}
	for (let voucher of customer.vouchers) {
		const dbVoucher =
			await ContentWeeklyReportUserGroupVoucherController.findOne({
				where: {
					id: voucher.id,
				},
				attributes: [
					'id',
					'voucher_name',
					'is_delete',
					'updated_at',
					'delete_time',
					'start_at',
					'end_at',
				],
			});
		if (dbVoucher == null) {
			return;
		}

		// 삭제
		if (dbVoucher.is_delete == 0 && voucher.is_delete == 1) {
			voucher = dbVoucher;
			voucher.updated_at = Date.now();
			voucher.delete_time = Date.now() / 1000;
			voucher.is_delete = 1;
			voucher.delete_cocoda_user_id = loginInfo.userId;
			const updateVoucher =
				await ContentWeeklyReportUserGroupVoucherController.updateOne(
					dbVoucher.id,
					voucher,
				);
			const voucherMonth = Math.floor(
				(voucher.end_at - voucher.start_at) / 60 / 60 / 24 / 30,
			);
			const voucherForSendSlackMessage = `${
				voucher.voucher_name
			} ${timeConverterUnixToDashString(
				voucher.start_at,
			)} ~  ${timeConverterUnixToDashString(
				voucher.end_at,
			)} ${voucherMonth}개월`;
			deleteVoucherForSendSlackMessageList.push(voucherForSendSlackMessage);
		}
	}

	// 사용자 처리
	const allUserList = await ContentWeeklyReportUserGroupUserController.findAll({
		where: {
			content_weekly_report_user_group_id: customer.id,
		},
		attributes: ['id', 'cocoda_user_id', 'content_weekly_report_user_group_id'],
	});
	let deleteUserList = allUserList.filter((item: { cocoda_user_id: any }) => {
		return !customer.users.some(
			(other: any) => other.id == item.cocoda_user_id,
		);
	});
	for (let deleteUser of deleteUserList) {
		const deleteUserDb = await CocodaUserController.findOne({
			attributes: ['email'],
			where: {
				id: deleteUser.cocoda_user_id,
			},
		});
		if (deleteUserDb) {
			deleteUserForSendSlackMessageList.push(deleteUserDb.email);
		}

		const deleteUserResult = await CocodaUserController.update(
			{ ...deleteUser, is_delete: 1 },
			{
				where: {
					id: deleteUser.cocoda_user_id,
				},
			},
		);
	}

	const targetDeleteUserGroupUserIds = deleteUserList.map((user) => {
		return user.id;
	});

	const deleteExec = await ContentWeeklyReportUserGroupUserController.delete({
		where: {
			id: { [Op.in]: targetDeleteUserGroupUserIds },
		},
	});

	for (let user of customer.users) {
		let dbUser = await CocodaUserController.findOne({
			where: {
				email: user.email,
			},
		});
		if (dbUser != null) {
			let dbGroupUser =
				await ContentWeeklyReportUserGroupUserController.findOne({
					where: {
						cocoda_user_id: dbUser.id,
						content_weekly_report_user_group_id: customer.id,
					},
				});
			if (!dbGroupUser) {
				const createContentWeeklyReportUserGroupUser =
					await ContentWeeklyReportUserGroupUserController.create({
						cocoda_user_id: dbUser.id,
						content_weekly_report_user_group_id: customer.id,
					});
				addUserForSendSlackMessageList.push(user.email);
			}
		} else if (user.id != null) {
			// 수정
			const addUser = {
				email: user.email,
				check_email: user.email,
			};
			let beforeDbUser = await CocodaUserController.findOne({
				where: { id: user.id },
			});
			if (beforeDbUser) {
				editedUserForSendSlackMessageList.push('`기존` ' + beforeDbUser.email);
				editedUserForSendSlackMessageList.push('`수정` ' + user.email);
			}

			let dbUser = await CocodaUserController.update(addUser, {
				where: { id: user.id },
			});
		} else {
			// 생성
			const encPassword = await bcrypt.hash('123456789a', 12);
			const addUser = {
				name: user.name,
				email: user.email,
				nickname: user.name,
				check_email: user.email,
				birth: '1970-01-01',
				gender: '알 수 없음',
				password: encPassword,
			};
			addUserForSendSlackMessageList.push(user.email);
			dbUser = await CocodaUserController.create(addUser);
			if (dbUser != null) {
				const addUserGroup = {
					cocoda_user_id: dbUser?.id,
					user_group_id: 3,
				};
				const createUserUserGroup =
					await CocodaUserCocodaUserGroupController.create(addUserGroup);
				const addContentWeeklyReportUserGroupUser = {
					cocoda_user_id: dbUser.id,
					content_weekly_report_user_group_id: customer.id,
				};
				const createContentWeeklyReportUserGroupUser =
					await ContentWeeklyReportUserGroupUserController.create(
						addContentWeeklyReportUserGroupUser,
					);
			}
		}
	}

	// 계약서 처리
	const newFilesIds = bodyData.fileListInfo
		.filter((fi: any) => fi.new)
		.map(({ fileId }: any) => fileId);
	await ContentWeeklyReportUserGroupContractFileController.update(
		{ customer_id: customer.id },
		{
			where: {
				id: {
					[Op.in]: [...newFilesIds],
				},
			},
		},
	);

	// 데일리 서비스 수신자 처리
	// 삭제
	const allDailyServiceUserList =
		await ContentWeeklyReportUserGroupDailyServiceUserController.findAll({
			where: {
				content_weekly_report_user_group_id: customer.id,
			},
		});
	let deleteDailyServiceUserList = allDailyServiceUserList.filter(
		(item: { id: any }) => {
			return !customer.daily_service_users.some(
				(other: any) => other.id === item.id,
			);
		},
	);

	for (let deleteDailyServiceUser of deleteDailyServiceUserList) {
		let deleteDailyServiceUserDb =
			await ContentWeeklyReportUserGroupDailyServiceUserController.findOne({
				attributes: ['email'],
				where: {
					id: deleteDailyServiceUser.id,
				},
			});

		if (deleteDailyServiceUserDb) {
			deleteDailyServiceUsersForSendSlackMessageList.push(
				deleteDailyServiceUserDb.email,
			);
		}
	}
	const targetDeleteDailyServiceUserIds = deleteDailyServiceUserList.map(
		(user) => {
			return user.id;
		},
	);
	const deleteDailyServiceUserResult =
		await ContentWeeklyReportUserGroupDailyServiceUserController.delete({
			where: {
				id: targetDeleteDailyServiceUserIds,
			},
		});

	for (let dailyServiceUser of customer.daily_service_users) {
		if (dailyServiceUser.id == null && dailyServiceUser.email !== '') {
			// 생성
			const addDailyServiceUser = {
				content_weekly_report_user_group_id: customer.id,
				name: dailyServiceUser.name,
				job_title: dailyServiceUser.job_title,
				email: dailyServiceUser.email,
				phone_number: dailyServiceUser.phone_number,
				created_at: Date.now(),
				updated_at: Date.now(),
			};
			addDailyServiceUsersForSendSlackMessageList.push(dailyServiceUser.email);
			const createDailyServiceUser =
				await ContentWeeklyReportUserGroupDailyServiceUserController.create(
					addDailyServiceUser,
				);
		} else {
			// 수정
			const dbDailyServiceUser =
				await ContentWeeklyReportUserGroupDailyServiceUserController.findOne({
					attributes: ['id', 'name', 'email'],
					where: {
						id: dailyServiceUser.id,
					},
				});
			if (dbDailyServiceUser != null) {
				if (dbDailyServiceUser.email !== dailyServiceUser.email) {
					editedDailyServiceUsersForSendSlackMessageList.push(
						'`기존` ' + dbDailyServiceUser.email,
					);
					editedDailyServiceUsersForSendSlackMessageList.push(
						'`수정` ' + dailyServiceUser.email,
					);
				}
				const updatedDailyServiceUser = {
					name: dailyServiceUser.name,
					job_title: dailyServiceUser.job_title,
					email: dailyServiceUser.email,
					phone_number: dailyServiceUser.phone_number,
					updated_at: Date.now(),
				};
				const updateDailyServiceUser =
					await ContentWeeklyReportUserGroupDailyServiceUserController.updateOne(
						dailyServiceUser.id,
						updatedDailyServiceUser,
					);
			}
		}
	}

	//  슬랙 전송
	sendSlackAddVoucherInfo(
		customer,
		addVoucherForSendSlackMessageList,
		addUserForSendSlackMessageList,
		addDailyServiceUsersForSendSlackMessageList,
		loginInfo,
	);

	sendSlackDeleteVoucherInfo(
		customer,
		deleteVoucherForSendSlackMessageList,
		deleteUserForSendSlackMessageList,
		deleteDailyServiceUsersForSendSlackMessageList,
		loginInfo,
	);

	sendSlackEditVoucherInfo(
		customer,
		[],
		editedUserForSendSlackMessageList,
		editedDailyServiceUsersForSendSlackMessageList,
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
	PUT: PutMethod,
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

	const pageTitle = '고객사 수정';
	let defaultMetaInfo = {
		title: pageTitle,
		description: '고객사 수정',
		headerDatas: [
			{
				title: '고객사/이용권 관리',
				link: '',
				textKey: 'manage_clients_users',
			},
			{ title: '고객사 수정', link: '/customer', textKey: 'edit_client' },
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
