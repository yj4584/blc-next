import joinProcess from 'join-sequlize/joinProcess';
import ContentWeeklyReportUserGroup from 'models/webtoonguide/ContentWeeklyReportUserGroup';
import ContentWeeklyReportUserGroupUser from 'models/webtoonguide/ContentWeeklyReportUserGroupUser';
import ContentWeeklyReportUserGroupVoucher from 'models/webtoonguide/ContentWeeklyReportUserGroupVoucher';
import CocodaUser from 'models/webtoonguide/CocodaUser';
import ContentWeeklyReportUserGroupDailyServiceUser from 'models/webtoonguide/ContentWeeklyReportUserGroupDailyServiceUser';
import ContentWeeklyReportUserGroupContractFile from 'models/webtoonguide/ContentWeeklyReportUserGroupContractFile';

const joinList: any = {
	ContentWeeklyReportUserGroupUser: () => {
		ContentWeeklyReportUserGroup.hasMany(ContentWeeklyReportUserGroupUser, {
			foreignKey: 'content_weekly_report_user_group_id',
		});
	},
	ContentWeeklyReportUserGroupVoucher: () => {
		ContentWeeklyReportUserGroup.hasMany(ContentWeeklyReportUserGroupVoucher, {
			foreignKey: 'user_group_id',
		});
	},
	CocodaUser: () => {
		ContentWeeklyReportUserGroup.belongsToMany(CocodaUser, {
			through: 'content_weekly_report_user_group_user',
			otherKey: 'cocoda_user_id',
			foreignKey: 'content_weekly_report_user_group_id',
		});
	},
	ContentWeeklyReportUserGroupDailyServiceUser: () => {
		ContentWeeklyReportUserGroup.hasMany(
			ContentWeeklyReportUserGroupDailyServiceUser,
			{
				foreignKey: 'content_weekly_report_user_group_id',
			},
		);
	},
	ContentWeeklyReportUserGroupContractFile: () => {
		ContentWeeklyReportUserGroup.hasMany(
			ContentWeeklyReportUserGroupContractFile,
			{ foreignKey: 'customer_id' },
		);
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
