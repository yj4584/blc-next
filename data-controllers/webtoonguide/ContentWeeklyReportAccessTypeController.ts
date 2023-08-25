import {
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import ContentWeeklyReportAccessType from 'models/webtoonguide/ContentWeeklyReportAccessType';
import parseFindProps from 'data-controllers/parseFindProps';

export default class ContentWeeklyReportAccessTypeController {
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
				ContentWeeklyReportAccessTypeController.defaultAttributes;
		}
		if (typeof selectOptions.where != 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportAccessTypeController.includeChecks(includeDatas);

		const result = await ContentWeeklyReportAccessType.findAll(selectOptions);
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
				ContentWeeklyReportAccessTypeController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
			if (typeof selectOptions.where.is_delete == 'undefined') {
				selectOptions.where.is_delete = false;
			}
		}

		selectOptions.include =
			ContentWeeklyReportAccessTypeController.includeChecks(includeDatas);

		const result = await ContentWeeklyReportAccessType.findOne(selectOptions);
		return result;
	}
	static async getAll() {
		const result = await ContentWeeklyReportAccessType.findAll({
			attributes: ['id', 'name'],
		});
		return result;
	}
}
