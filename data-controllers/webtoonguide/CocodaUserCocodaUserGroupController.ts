import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import parseFindProps from 'data-controllers/parseFindProps';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';
import CocodaUserCocodaUserGroup, {
	CocodaUserCocodaUserGroupAttribute,
} from 'models/webtoonguide/CocodaUserCocodaUserGroup';

export interface CocodaUserCocodaUserGroupControllerAttribute
	extends CocodaUserCocodaUserGroupAttribute {}

export default class CocodaUserCocodaUserGroupController {
	static defaultAttributes = ['cocoda_user_id', 'cocoda_user_group_id'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<CocodaUserCocodaUserGroupControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes =
				CocodaUserCocodaUserGroupController.defaultAttributes;
		}

		selectOptions.include =
			CocodaUserCocodaUserGroupController.includeChecks(includeDatas);

		const result = await CocodaUserCocodaUserGroup.findAll(selectOptions);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<CocodaUserCocodaUserGroupControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes =
				CocodaUserCocodaUserGroupController.defaultAttributes;
		}

		selectOptions.include =
			CocodaUserCocodaUserGroupController.includeChecks(includeDatas);

		const result = await CocodaUserCocodaUserGroup.findOne(selectOptions);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<CocodaUserCocodaUserGroupControllerAttribute | null> {
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
		const result = await CocodaUserCocodaUserGroup.create(
			convertInsertData,
			props,
		).catch(null);
		return result;
	}

	static async update(
		updateData: any,
		props: FindInterface = {},
	): Promise<boolean> {
		const updateResult = await CocodaUserCocodaUserGroup.update(updateData, {
			where: props.where,
		});
		return true;
		// return updateResult[0] != 0;
	}

	static async delete(props: FindInterface = {}): Promise<boolean> {
		const result = await CocodaUserCocodaUserGroup.destroy({
			where: props.where,
		});
		return true;
	}
}
