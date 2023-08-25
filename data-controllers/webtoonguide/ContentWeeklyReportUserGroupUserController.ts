import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportUserGroupUser, {
	ContentWeeklyReportUserGroupUserAttribute,
} from 'models/webtoonguide/ContentWeeklyReportUserGroupUser';
import parseFindProps from 'data-controllers/parseFindProps';

import JoinContentWeeklyReportUserGroupUser from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroupUser';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';
JoinContentWeeklyReportUserGroupUser([]);

export interface ContentWeeklyReportUserGroupUserControllerAttribute
	extends ContentWeeklyReportUserGroupUserAttribute {}
export default class ContentWeeklyReportUserGroupUserController {
	static defaultAttributes = [
		'cocoda_user_id',
		'content_weekly_report_user_group_id',
	];
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
				ContentWeeklyReportUserGroupUserController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupUserController.includeChecks(includeDatas);

		const result = await ContentWeeklyReportUserGroupUser.findAll(
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
				ContentWeeklyReportUserGroupUserController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupUserController.includeChecks(includeDatas);

		const result: ContentWeeklyReportUserGroupUserAttribute | null =
			await ContentWeeklyReportUserGroupUser.findOne(selectOptions).then(
				(res) => {
					return !res ? null : res.get({ plain: true });
				},
			);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<ContentWeeklyReportUserGroupUserControllerAttribute | null> {
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
		const result = await ContentWeeklyReportUserGroupUser.create(
			convertInsertData,
			props,
		).catch(null);
		return result;
	}

	static async delete(props: FindInterface = {}): Promise<boolean> {
		const result = await ContentWeeklyReportUserGroupUser.destroy({
			where: props.where,
		});
		return true;
	}

	static async updateOne(id: number, updateData: any): Promise<boolean> {
		try {
			let result = await ContentWeeklyReportUserGroupUser.update(updateData, {
				where: { id: id },
			});

			return true;
		} catch (error) {
			return false;
		}
	}
}
