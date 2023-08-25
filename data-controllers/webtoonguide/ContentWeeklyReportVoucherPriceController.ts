import {
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportVoucherPrice, {
	ContentWeeklyReportVoucherPriceAttribute,
} from 'models/webtoonguide/ContentWeeklyReportVoucherPrice';
import parseFindProps from 'data-controllers/parseFindProps';

export interface ContentWeeklyReportVoucherPriceControllerAttribute
	extends ContentWeeklyReportVoucherPriceAttribute {}
export default class ContentWeeklyReportVoucherPriceController {
	static defaultAttributes = ['voucher_id', 'month', 'price', 'real_price'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async updateOne(id: number, updateData: any): Promise<boolean> {
		try {
			let result = await ContentWeeklyReportVoucherPrice.update(updateData, {
				where: { id: id },
			});

			return true;
		} catch (error) {
			return false;
		}
	}

	static async insertOne(voucherId: number, insertData: any): Promise<boolean> {
		const curTime = new Date(Date.now());
		try {
			let data = {
				...insertData,
				voucher_id: voucherId,
				created_at: curTime,
				updated_at: curTime,
			};
			await ContentWeeklyReportVoucherPrice.create(data);
			return true;
		} catch (error) {
			return false;
		}
	}

	static async deleteById(id: number) {
		await ContentWeeklyReportVoucherPrice.destroy({
			where: {
				id: id,
			},
		});
	}
}
