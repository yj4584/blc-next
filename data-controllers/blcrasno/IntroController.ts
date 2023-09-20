import {
	CreateInterface,
	FindInterface,
	InterfaceIncludeDataInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';
import parseBlcrasnoInclude from 'data-controllers/parseBlcrasnoInclude';
import Intro, { IntroAttribute } from 'models/blcrasno/Intro';
import parseFindProps from 'data-controllers/parseFindProps';
import bcrypt from 'bcrypt';

import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';

export interface IntroControllerAttribute extends IntroAttribute {}

export default class IntroController {
	static defaultAttributes = ['id', 'text'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseBlcrasnoInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<IntroControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = IntroController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include = IntroController.includeChecks(includeDatas);

		const result = await Intro.findAll(selectOptions);
		return result;
	}

	static async findOne(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<IntroControllerAttribute | null> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = IntroController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include = IntroController.includeChecks(includeDatas);

		const result = await Intro.findOne(selectOptions);
		return result;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<IntroControllerAttribute | null> {
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
		const result = await Intro.create(convertInsertData, props).catch(null);
		return result;
	}

	static async update(
		updateData: any,
		props: FindInterface = {},
	): Promise<boolean> {
		const updateResult = await Intro.update(updateData, {
			where: props.where,
		});
		return updateResult[0] != 0;
	}
}
