import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import parseFindProps from 'data-controllers/parseFindProps';
import CocodaUserGroup, {
	CocodaUserGroupAttribute,
} from 'models/webtoonguide/CocodaUserGroup';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

export interface CocodaUserGroupControllerAttribute
	extends CocodaUserGroupAttribute {}

export default class CocodaUserGroupController {
	static defaultAttributes = ['id', 'name'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<CocodaUserGroupControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = CocodaUserGroupController.defaultAttributes;
		}

		selectOptions.include =
			CocodaUserGroupController.includeChecks(includeDatas);

		const result = await CocodaUserGroup.findAll(selectOptions);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<CocodaUserGroupControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = CocodaUserGroupController.defaultAttributes;
		}

		selectOptions.include =
			CocodaUserGroupController.includeChecks(includeDatas);

		const result = await CocodaUserGroup.findOne(selectOptions);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<CocodaUserGroupControllerAttribute | null> {
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
		const result = await CocodaUserGroup.create(convertInsertData, props).catch(
			null,
		);
		return result;
	}
}
