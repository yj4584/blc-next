import {
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportVoucher, {
	ContentWeeklyReportVoucherAttribute,
} from 'models/webtoonguide/ContentWeeklyReportVoucher';
import parseFindProps from 'data-controllers/parseFindProps';

import JoinContentWeeklyReportVoucher from 'join-sequlize/webtoonguide/ContentWeeklyReportVoucher';
import { ContentWeeklyReportVoucherPriceControllerAttribute } from './ContentWeeklyReportVoucherPriceController';
JoinContentWeeklyReportVoucher([]);

export interface ContentWeeklyReportVoucherControllerAttribute
	extends ContentWeeklyReportVoucherAttribute {
	contentWeeklyReportVoucherPrices?: ContentWeeklyReportVoucherPriceControllerAttribute[];
	prices?: ContentWeeklyReportVoucherPriceControllerAttribute[];
}
export default class ContentWeeklyReportVoucherController {
	static defaultAttributes = ['id', 'name', 'service'];
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
				ContentWeeklyReportVoucherController.defaultAttributes;
		}
		if (typeof selectOptions.where != 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportVoucherController.includeChecks(includeDatas);

		const result: ContentWeeklyReportVoucherControllerAttribute[] =
			await ContentWeeklyReportVoucher.findAll(selectOptions);
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
				ContentWeeklyReportVoucherController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportVoucherController.includeChecks(includeDatas);

		const result: ContentWeeklyReportVoucherAttribute | null =
			await ContentWeeklyReportVoucher.findOne(selectOptions).then((res) => {
				return !res ? null : res.get({ plain: true });
			});
		return result;
	}

	static async updateOne(id: number, updateData: any): Promise<boolean> {
		try {
			let result = await ContentWeeklyReportVoucher.update(updateData, {
				where: { id: id },
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	static async insertOne(name: string): Promise<number> {
		const curTime = new Date(Date.now());
		try {
			let data = {
				name: name,
				created_at: curTime,
				updated_at: curTime,
			};
			let result = await ContentWeeklyReportVoucher.create(data);
			return result.id;
		} catch (error) {
			return -1;
		}
	}
}
