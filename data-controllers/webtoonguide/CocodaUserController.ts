import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import CocodaUser, {
	CocodaUserAttribute,
} from 'models/webtoonguide/CocodaUser';
import parseFindProps from 'data-controllers/parseFindProps';
import bcrypt from 'bcrypt';

import { CocodaUserGroupAttribute } from 'models/webtoonguide/CocodaUserGroup';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';
import { ResellerAgencyControllerAttribute } from './ResellerAgencyController';

import JoinCocodaUser from 'join-sequlize/webtoonguide/CocodaUser';
JoinCocodaUser(['CocodaUserGroup', 'ResellerAgency']);
import JoinResellerAgency from 'join-sequlize/webtoonguide/ResellerAgency';
JoinResellerAgency(['Voucher']);
import JoinContentWeeklyReportVoucher from 'join-sequlize/webtoonguide/ContentWeeklyReportVoucher';
JoinContentWeeklyReportVoucher(['ContentWeeklyReportVoucherPrice']);

export interface CocodaUserControllerAttribute extends CocodaUserAttribute {
	cocodaUserGroups?: CocodaUserGroupAttribute[];
	resellerAgencies?: ResellerAgencyControllerAttribute[];
}

export default class CocodaUserController {
	static defaultAttributes = ['id', 'name', 'email'];
	static initPassWord = '123456789a';
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<CocodaUserControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = CocodaUserController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}
		if (typeof selectOptions.where?.is_delete == 'undefined') {
			selectOptions.where.is_delete = false;
		}

		selectOptions.include = CocodaUserController.includeChecks(includeDatas);

		const result = await CocodaUser.findAll(selectOptions);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<CocodaUserControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = CocodaUserController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}
		if (typeof selectOptions.where?.is_delete == 'undefined') {
			selectOptions.where.is_delete = false;
		}

		selectOptions.include = CocodaUserController.includeChecks(includeDatas);

		const result = await CocodaUser.findOne(selectOptions);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<CocodaUserControllerAttribute | null> {
		const convertInsertData: any = Object.keys(insertData).reduce(
			(result, insertDataKey) => {
				const convertKey = convertCamelCaseToSnakeCase(insertDataKey);
				return {
					...result,
					[convertKey]: insertData[insertDataKey],
				};
			},
			{},
		);
		const result = await CocodaUser.create(convertInsertData, props).catch(
			null,
		);
		return result;
	}

	static async update(
		updateData: any,
		props: FindInterface = {},
	): Promise<boolean> {
		const updateResult = await CocodaUser.update(updateData, {
			where: props.where,
		});
		return updateResult[0] != 0;
	}

	static async findOneByEmail(email: string) {
		const result = await CocodaUser.findOne({
			attributes: ['id', 'name', 'email'],
			where: { email: email, is_delete: 0 },
		});
		return result;
	}

	static async updateUserPassword(
		userId: number,
		changePassword: string,
	): Promise<boolean> {
		const changeHashPassword = await bcrypt.hash(changePassword, 12);
		const updateResult = await CocodaUser.update(
			{
				password: changeHashPassword,
			},
			{
				where: {
					id: userId,
				},
			},
		);
		return updateResult[0] != 0;
	}

	static async resetPassword(userId: number) {
		const result = await CocodaUserController.updateUserPassword(
			userId,
			CocodaUserController.initPassWord,
		);

		return result;
	}
}
