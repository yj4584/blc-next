import ResellerAgencyVoucher from 'models/webtoonguide/ResellerAgencyVoucher';

export default class ResellerAgencyVoucherController {
	static async createMany(sellerId: number, voucherIds: number[]) {
		const arrForBulk = voucherIds.map((voucherId) => {
			return { reseller_agency_id: sellerId, voucher_id: voucherId };
		});
		const arrHavingVoucher = arrForBulk.filter(
			(item) => +item['voucher_id'] > 0,
		);

		const result = await ResellerAgencyVoucher.bulkCreate(arrHavingVoucher);
		return result;
	}
	static async updateSellerVouchers(sellerId: number, vouchers: number[]) {
		await ResellerAgencyVoucher.destroy({
			where: { reseller_agency_id: sellerId },
		});
		await ResellerAgencyVoucherController.createMany(sellerId, vouchers);
	}
}
