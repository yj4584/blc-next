import joinProcess from 'join-sequlize/joinProcess';
import ResellerAgencyUser from 'models/webtoonguide/ResellerAgencyUser';
import ResellerAgency from 'models/webtoonguide/ResellerAgency';

const joinList: any = {
	ResellerAgency: () => {
		ResellerAgencyUser.belongsTo(ResellerAgency, {
			foreignKey: 'reseller_agency_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
