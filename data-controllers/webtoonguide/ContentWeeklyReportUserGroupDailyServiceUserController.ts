import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportUserGroupDailyServiceUser, {
	ContentWeeklyReportUserGroupDailyServiceUserAttribute,
} from 'models/webtoonguide/ContentWeeklyReportUserGroupDailyServiceUser';
import parseFindProps from 'data-controllers/parseFindProps';

import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

export interface ContentWeeklyReportUserGroupDailyServiceUserControllerAttribute
	extends ContentWeeklyReportUserGroupDailyServiceUserAttribute {}
export default class ContentWeeklyReportUserGroupDailyServiceUserController {
	static defaultAttributes = ['id', 'name'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	) {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes =
				ContentWeeklyReportUserGroupDailyServiceUserController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupDailyServiceUserController.includeChecks(
				includeDatas,
			);

		const result = await ContentWeeklyReportUserGroupDailyServiceUser.findAll(
			selectOptions,
		);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	) {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes =
				ContentWeeklyReportUserGroupDailyServiceUserController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupDailyServiceUserController.includeChecks(
				includeDatas,
			);

		const result: ContentWeeklyReportUserGroupDailyServiceUserAttribute | null =
			await ContentWeeklyReportUserGroupDailyServiceUser.findOne(
				selectOptions,
			).then((res) => {
				return !res ? null : res.get({ plain: true });
			});
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<ContentWeeklyReportUserGroupDailyServiceUserControllerAttribute | null> {
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
		const result = await ContentWeeklyReportUserGroupDailyServiceUser.create(
			convertInsertData,
			props,
		).catch(null);
		return result;
	}

	static async delete(props: FindInterface = {}): Promise<boolean> {
		const result = await ContentWeeklyReportUserGroupDailyServiceUser.destroy({
			where: props.where,
		});
		return true;
	}

	static async updateOne(id: number, updateData: any): Promise<boolean> {
		try {
			let result = await ContentWeeklyReportUserGroupDailyServiceUser.update(
				updateData,
				{
					where: { id: id },
				},
			);

			return true;
		} catch (error) {
			return false;
		}
	}
}
