import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportUserGroupVoucher, {
	ContentWeeklyReportUserGroupVoucherAttribute,
} from 'models/webtoonguide/ContentWeeklyReportUserGroupVoucher';
import parseFindProps from 'data-controllers/parseFindProps';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

// import JoinContentWeeklyReportUserGroupVoucher from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroupVoucher';
// JoinContentWeeklyReportUserGroupVoucher([]);

export interface ContentWeeklyReportUserGroupVoucherControllerAttribute
	extends ContentWeeklyReportUserGroupVoucherAttribute {}
export default class ContentWeeklyReportUserGroupVoucherController {
	static defaultAttributes = ['id', 'voucher_name', 'sum_price'];
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
				ContentWeeklyReportUserGroupVoucherController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupVoucherController.includeChecks(includeDatas);

		const result = await ContentWeeklyReportUserGroupVoucher.findAll(
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
				ContentWeeklyReportUserGroupVoucherController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportUserGroupVoucherController.includeChecks(includeDatas);

		const result: ContentWeeklyReportUserGroupVoucherAttribute | null =
			await ContentWeeklyReportUserGroupVoucher.findOne(selectOptions).then(
				(res) => {
					return !res ? null : res.get({ plain: true });
				},
			);
		return result;
	}

	static async updateOne(id: number, updateData: any): Promise<boolean> {
		try {
			let result = await ContentWeeklyReportUserGroupVoucher.update(
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

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<ContentWeeklyReportUserGroupVoucherController | null> {
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
		const result = await ContentWeeklyReportUserGroupVoucher.create(
			convertInsertData,
			props,
		).catch(null);
		return result;
	}

	static async delete(props: FindInterface = {}): Promise<boolean> {
		const result = await ContentWeeklyReportUserGroupVoucher.destroy({
			where: props.where,
		});
		return true;
	}
}
