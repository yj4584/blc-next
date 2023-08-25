import joinProcess from 'join-sequlize/joinProcess';
import ContentWeeklyReportVoucher from 'models/webtoonguide/ContentWeeklyReportVoucher';
import ContentWeeklyReportVoucherPrice from 'models/webtoonguide/ContentWeeklyReportVoucherPrice';
import ContentWeeklyReportAccessType from 'models/webtoonguide/ContentWeeklyReportAccessType';

const joinList: any = {
	ContentWeeklyReportVoucherPrice: () => {
		ContentWeeklyReportVoucher.hasMany(ContentWeeklyReportVoucherPrice, {
			foreignKey: 'voucher_id',
		});
	},
	ContentWeeklyReportAccessType: () => {
		ContentWeeklyReportVoucher.belongsToMany(ContentWeeklyReportAccessType, {
			through: 'content_weekly_report_voucher_access_type',
			otherKey: 'access_type_id',
			foreignKey: 'voucher_id',
		});
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
