import joinProcess from 'join-sequlize/joinProcess';
import CocodaUser from 'models/webtoonguide/CocodaUser';
import CocodaUserCocodaUserGroup from 'models/webtoonguide/CocodaUserCocodaUserGroup';
import CocodaUserGroup from 'models/webtoonguide/CocodaUserGroup';
import ResellerAgency from 'models/webtoonguide/ResellerAgency';
import ResellerAgencyUser from 'models/webtoonguide/ResellerAgencyUser';

const joinList: any = {
	CocodaUserCocodaUserGroup: () => {
		CocodaUser.hasMany(CocodaUserCocodaUserGroup, {
			foreignKey: 'cocoda_user_id',
		});
	},
	CocodaUserGroup: () => {
		CocodaUser.belongsToMany(CocodaUserGroup, {
			through: 'cocoda_user_cocoda_user_group',
			otherKey: 'cocoda_user_group_id',
			foreignKey: 'cocoda_user_id',
		});
	},
	ResellerAgencyUser: () => {
		CocodaUser.hasMany(ResellerAgencyUser, {
			foreignKey: 'cocoda_user_id',
		});
	},
	ResellerAgency: () => {
		CocodaUser.belongsToMany(ResellerAgency, {
			through: 'reseller_agency_user',
			otherKey: 'reseller_agency_id',
			foreignKey: 'cocoda_user_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
