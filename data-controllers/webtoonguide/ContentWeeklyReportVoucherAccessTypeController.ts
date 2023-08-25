import {
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportVoucherAccessType from 'models/webtoonguide/ContentWeeklyReportVoucherAccessType';
import parseFindProps from 'data-controllers/parseFindProps';

export default class ContentWeeklyReportVoucherAccessTypeController {
	static defaultAttributes = ['id', 'access_type_id', 'voucher_id'];
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
				ContentWeeklyReportVoucherAccessTypeController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportVoucherAccessTypeController.includeChecks(
				includeDatas,
			);

		const result = await ContentWeeklyReportVoucherAccessType.findAll(
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
				ContentWeeklyReportVoucherAccessTypeController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportVoucherAccessTypeController.includeChecks(
				includeDatas,
			);

		const result = await ContentWeeklyReportVoucherAccessType.findOne(
			selectOptions,
		);
		return result;
	}

	static async insertByIds(accessTypeId: number, voucherId: number) {
		const curTime = new Date(Date.now());
		await ContentWeeklyReportVoucherAccessType.findOrCreate({
			where: {
				access_type_id: accessTypeId,
				voucher_id: voucherId,
			},
			defaults: {
				access_type_id: accessTypeId,
				voucher_id: voucherId,
				created_at: curTime,
				updated_at: curTime,
			},
		});
	}

	static async deleteByIds(accessTypeId: number, voucherId: number) {
		await ContentWeeklyReportVoucherAccessType.destroy({
			where: {
				access_type_id: accessTypeId,
				voucher_id: voucherId,
			},
		});
	}
}
