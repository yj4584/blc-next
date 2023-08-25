import ResellerAgency, {
	ResellerAgencyAttribute,
} from 'models/webtoonguide/ResellerAgency';
import ResellerAgencyVoucher from 'models/webtoonguide/ResellerAgencyVoucher';
import ResellerAgencyUser from 'models/webtoonguide/ResellerAgencyUser';
import CocodaUser from 'models/webtoonguide/CocodaUser';
import ContentWeeklyReportVoucher from 'models/webtoonguide/ContentWeeklyReportVoucher';
import ResellerAgencyUserController from './ResellerAgencyUserController';
import ResellerAgencyVoucherController from './ResellerAgencyVoucherController';
import { BelongsTo, HasMany, HasOne, Sequelize, where } from 'sequelize';
import CocodaUserController, {
	CocodaUserControllerAttribute,
} from './CocodaUserController';
import { ContentWeeklyReportVoucherControllerAttribute } from './ContentWeeklyReportVoucherController';
import { FindInterface, ParseFindPropsInterface } from 'data-interface/join';
import { InterfaceIncludeDataInterface } from 'data-interface/database/common';
import parseFindProps from 'data-controllers/parseFindProps';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';

export interface ResellerAgencyControllerAttribute
	extends ResellerAgencyAttribute {
	contentWeeklyReportVouchers?: ContentWeeklyReportVoucherControllerAttribute[];
}
export default class ResellerAgencyController {
	static defaultAttributes = ['id', 'name', 'memo', 'language_id'];
	constructor() {}

	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}

	static async findAll(
		props: FindInterface,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	): Promise<ResellerAgencyControllerAttribute[]> {
		let selectOptions: ParseFindPropsInterface =
			typeof props != 'undefined' ? parseFindProps(props) : {};

		if (typeof selectOptions.attributes == 'undefined') {
			selectOptions.attributes = ResellerAgencyController.defaultAttributes;
		}
		if (typeof selectOptions.where == 'undefined') {
			selectOptions.where = {};
		}

		selectOptions.include =
			ResellerAgencyController.includeChecks(includeDatas);

		const result = await ResellerAgency.findAll(selectOptions);
		return result;
	}

	static async getAllSeller() {
		const result = await ResellerAgency.findAll();
		return result;
	}

	static async getSellerInfo(sellerId: number) {
		const seller = await ResellerAgency.findOne({
			attributes: ['id', 'name', 'memo', 'language_id'],
			where: { id: sellerId },
			include: [
				{
					model: ResellerAgencyVoucher,
					attributes: ['voucher_id'],
					association: new HasMany(ResellerAgency, ResellerAgencyVoucher, {
						foreignKey: 'reseller_agency_id',
					}),
					include: [
						{
							model: ContentWeeklyReportVoucher,
							association: new BelongsTo(
								ResellerAgencyVoucher,
								ContentWeeklyReportVoucher,
								{ foreignKey: 'voucher_id' },
							),
						},
					],
				},
				{
					model: ResellerAgencyUser,
					attributes: ['cocoda_user_id'],
					association: new HasOne(ResellerAgency, ResellerAgencyUser, {
						foreignKey: 'reseller_agency_id',
					}),
					include: [
						{
							model: CocodaUser,
							attributes: ['email'],
							association: new BelongsTo(ResellerAgencyUser, CocodaUser, {
								foreignKey: 'cocoda_user_id',
							}),
						},
					],
				},
			],
		});

		return seller;
	}

	static async updateSeller(
		sellerId: number,
		cocodaUserId: number,
		updateObj: {
			name?: string;
			email?: string;
			memo?: string;
			vouchers?: number[];
			langId?: number;
		},
	) {
		const sellerAttr: any = {};
		if (updateObj.name) {
			sellerAttr.name = updateObj.name;
		}
		if (updateObj.memo) {
			sellerAttr.memo = updateObj.memo;
		}
		if (updateObj.langId || updateObj.langId == 0) {
			sellerAttr['language_id'] = updateObj.langId;
		}
		const apiCalls = [];
		if (Object.keys(sellerAttr).length) {
			apiCalls.push(
				ResellerAgency.update({ ...sellerAttr }, { where: { id: sellerId } }),
			);
		}
		if (updateObj.email) {
			apiCalls.push(
				CocodaUserController.update(
					{
						name: updateObj.email,
						nickname: updateObj.email,
						email: updateObj.email,
						check_email: updateObj.email,
					},
					{
						where: {
							id: cocodaUserId,
						},
					},
				),
			);
		}
		if (updateObj.vouchers) {
			apiCalls.push(
				ResellerAgencyVoucherController.updateSellerVouchers(
					sellerId,
					updateObj.vouchers,
				),
			);
		}
		try {
			const result = await Promise.all(apiCalls);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	static async createOne(args: {
		name: string;
		memo: string;
		cocodaUserId: number;
		voucherIds: number[];
		langId: 1 | 3;
	}) {
		const { name, memo, cocodaUserId, voucherIds, langId } = args;

		let result;
		try {
			result = await ResellerAgency.create({
				name,
				memo,
				language_id: Number(langId),
			});
			const sellerId = result.dataValues.id;
			await Promise.all([
				ResellerAgencyUserController.createOne(
					sellerId as number,
					cocodaUserId,
				),
				ResellerAgencyVoucherController.createMany(
					sellerId as number,
					voucherIds,
				),
			]);
		} catch (err) {
			console.log(err);
		}
		return result;
	}

	static async findOneByName(name: string) {
		const result = await ResellerAgency.findOne({ where: { name } });
		return result;
	}
}
