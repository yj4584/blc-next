import joinProcess from 'join-sequlize/joinProcess';
import ContentWeeklyReportVoucher from 'models/webtoonguide/ContentWeeklyReportVoucher';
import ResellerAgency from 'models/webtoonguide/ResellerAgency';

const joinList: any = {
	Voucher: () => {
		ResellerAgency.belongsToMany(ContentWeeklyReportVoucher, {
			through: 'reseller_agency_voucher',
			otherKey: 'voucher_id',
			foreignKey: 'reseller_agency_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
