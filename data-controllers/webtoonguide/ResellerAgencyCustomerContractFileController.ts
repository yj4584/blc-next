import ResellerAgencyCustomerContractFile from 'models/webtoonguide/ResellerAgencyCustomerContractFile';

export default class ResellerAgencyCustomerContractFileController {
	// static includeChecks(includeDatas: InterfaceIncludeDataInterface[]) {
	// 	return parseWebtoonguideInclude(includeDatas);
	// }

	static async createOne(
		cocoda_user_id: number,
		contract_file_id: number,
		reseller_agency_id?: number,
	) {
		const result = await ResellerAgencyCustomerContractFile.create({
			cocoda_user_id,
			contract_file_id,
			reseller_agency_id,
		});
		return result;
	}

	static async deleteOneWithFileId(contract_file_id: number) {
		const result = await ResellerAgencyCustomerContractFile.destroy({
			where: { contract_file_id },
		});
		return result;
	}
}
