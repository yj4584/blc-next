import ResellerAgencyUser from 'models/webtoonguide/ResellerAgencyUser';
import {
	FindInterface,
	InterfaceIncludeDataInterface,
} from 'data-interface/database/common';
import parseWebtoonguideInclude from 'data-controllers/parseWebtoonguideInclude';
import JoinResellerAgencyUser from 'join-sequlize/webtoonguide/ResellerAgencyUser';
JoinResellerAgencyUser(['ResellerAgency']);

export default class ResellerAgencyUserController {
	static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
		return parseWebtoonguideInclude(includeDatas);
	}
	static async createOne(sellerId: number, userId: number) {
		const result = await ResellerAgencyUser.create({
			reseller_agency_id: sellerId,
			cocoda_user_id: userId,
		});
		return result;
	}

	static async findOneByUserId(userId: number) {
		const result = await ResellerAgencyUser.findOne({
			where: { cocoda_user_id: userId },
		});

		return result;
	}
	static async getOneByUserIdWithInclude(
		userId: number,
		includeDatas: InterfaceIncludeDataInterface[] = [],
	) {
		let include = ResellerAgencyUserController.includeChecks(includeDatas);
		const result = await ResellerAgencyUser.findOne({
			where: { cocoda_user_id: userId },
			include,
		}).then((res) => res?.get({ plain: true }));

		return result;
	}

	static async delete(props: FindInterface = {}): Promise<boolean> {
		const result = await ResellerAgencyUser.destroy({
			where: props.where,
		});
		return true;
	}
}
