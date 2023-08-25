import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import { CreateInterface } from 'data-interface/database/common';
import { interfaceIncludeData } from 'data-interface/join';
import ContentWeeklyReportUserGroup, {
	ContentWeeklyReportUserGroupAttribute,
} from 'models/webtoonguide/ContentWeeklyReportUserGroup';
import { CocodaUserControllerAttribute } from './CocodaUserController';
import { convertCamelCaseToSnakeCase } from 'modules/common/CommonFunction';
import { ContentWeeklyReportUserGroupVoucherAttribute } from 'models/webtoonguide/ContentWeeklyReportUserGroupVoucher';
import joinContentWeeklyReportUserGroup from 'join-sequlize/webtoonguide/ContentWeeklyReportUserGroup';
joinContentWeeklyReportUserGroup();
interface ContentWeeklyReportUserGroupControllerAttribute
	extends ContentWeeklyReportUserGroupAttribute {
	contentWeeklyReportUserGroupVouchers?: ContentWeeklyReportUserGroupVoucherAttribute[];
}

export default class ContentWeeklyReportUserGroupController {
	constructor() {}

	static includeChecks(includeDatas: interfaceIncludeData[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findCompanyId(userID: number | null): Promise<number | null> {
		if (userID == null) {
			return null;
		}

		let includes = ContentWeeklyReportUserGroupController.includeChecks([
			{
				key: 'contentWeeklyReportUserGroupUser',
				required: true,
				whereAttributes: { user_id: userID },
			},
		]);

		let result = await ContentWeeklyReportUserGroup.findOne({
			attributes: ['company_id'],
			include: includes,
		});
		if (result == null || result.company_id == null) {
			return null;
		}

		return result.company_id;
	}

	static async findAll(
		includeDatas: interfaceIncludeData[] = [],
		attributes = [
			'id',
			'name',
			'manager',
			'manager_email',
			'manager_phone_number',
			'memo',
		],
		whereAttributes = {},
	): Promise<ContentWeeklyReportUserGroupControllerAttribute[]> {
		const includes =
			ContentWeeklyReportUserGroupController.includeChecks(includeDatas);
		const result: ContentWeeklyReportUserGroupControllerAttribute[] =
			await ContentWeeklyReportUserGroup.findAll({
				include: includes,
				attributes: attributes,
				where: whereAttributes,
			});
		return result;
	}

	static async findOneByName(name: string) {
		const result = await ContentWeeklyReportUserGroup.findOne({
			where: { name },
		});
		return result;
	}

	static async findOne(
		id: number,
		includeDatas: interfaceIncludeData[] = [],
		attributes = [
			'id',
			'name',
			'manager',
			'manager_email',
			'manager_phone_number',
			'memo',
		],
		whereAttributes = { id: id },
	): Promise<ContentWeeklyReportUserGroupControllerAttribute | null> {
		if (!whereAttributes.hasOwnProperty('id')) {
			whereAttributes['id'] = id;
		}

		const includes =
			ContentWeeklyReportUserGroupController.includeChecks(includeDatas);
		const result: ContentWeeklyReportUserGroupControllerAttribute | null =
			await ContentWeeklyReportUserGroup.findOne({
				include: includes,
				attributes: attributes,
				where: whereAttributes,
			});
		return result;
	}

	static async updateUserGroup(id: number, updateData: any): Promise<boolean> {
		if (!updateData.hasOwnProperty('updated_at')) {
			updateData['updated_at'] = new Date();
		}
		const updateResult = await ContentWeeklyReportUserGroup.update(updateData, {
			where: {
				id: id,
			},
		});

		return updateResult[0] != 0;
	}

	static async create(
		insertData: any,
		props: CreateInterface = {},
	): Promise<ContentWeeklyReportUserGroupControllerAttribute | null> {
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
		const result = await ContentWeeklyReportUserGroup.create(
			convertInsertData,
			props,
		).catch(null);
		return result;
	}
}
