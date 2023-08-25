import joinProcess from 'join-sequlize/joinProcess';
import User from 'models/webtoonguide/User';
import CocodaUser from 'models/webtoonguide/CocodaUser';
import ContentWeeklyReportUserGroupUser from 'models/webtoonguide/ContentWeeklyReportUserGroupUser';

const joinList: any = {
	User: () => {
		ContentWeeklyReportUserGroupUser.belongsTo(User, {
			foreignKey: 'user_id',
		});
	},
	CocodaUser: () => {
		ContentWeeklyReportUserGroupUser.belongsTo(CocodaUser, {
			foreignKey: 'cocoda_user_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
