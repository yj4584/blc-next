import joinProcess from 'join-sequlize/joinProcess';
import ContentWeeklyReportUserGroupVoucher from 'models/webtoonguide/ContentWeeklyReportUserGroupVoucher';
import ResellerAgency from 'models/webtoonguide/ResellerAgency';

const joinList: any = {
	ResellerAgency: () => {
		ContentWeeklyReportUserGroupVoucher.belongsTo(ResellerAgency, {
			foreignKey: 'insert_reseller_agency_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
