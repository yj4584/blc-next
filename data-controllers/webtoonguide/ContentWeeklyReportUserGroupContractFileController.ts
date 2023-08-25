import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportUserGroupContractFile, {
	ContentWeeklyReportUserGroupContractFileAttribute,
} from 'models/webtoonguide/ContentWeeklyReportUserGroupContractFile';
import parseFindProps from 'data-controllers/parseFindProps';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

export interface ContentWeeklyReportUserGroupContractFileControllerAttribute
	extends ContentWeeklyReportUserGroupContractFileAttribute {}

export default class ContentWeeklyReportUserGroupContractFileController {
	static defaultAttributes = ['id', 'name', 'path'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<ContentWeeklyReportUserGroupContractFileControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes =
				ContentWeeklyReportUserGroupContractFileController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupContractFileController.includeChecks(
				includeDatas,
			);

		const result = await ContentWeeklyReportUserGroupContractFile.findAll(
			selectOptions,
		);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<ContentWeeklyReportUserGroupContractFileControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes =
				ContentWeeklyReportUserGroupContractFileController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupContractFileController.includeChecks(
				includeDatas,
			);

		const result = await ContentWeeklyReportUserGroupContractFile.findOne(
			selectOptions,
		);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<ContentWeeklyReportUserGroupContractFileControllerAttribute | null> {
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
		const result = await ContentWeeklyReportUserGroupContractFile.create(
			convertInsertData,
			props,
		).catch(null);
		return result;
	}

	static async update(
		updateData: any,
		props: FindInterface = {},
	): Promise<boolean> {
		const updateResult = await ContentWeeklyReportUserGroupContractFile.update(
			updateData,
			{
				where: props.where,
			},
		);
		return updateResult[0] != 0;
	}
}
