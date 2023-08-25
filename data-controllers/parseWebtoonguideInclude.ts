import { InterfaceIncludeDataInterface } from 'data-interface/database/common';
import User from 'models/webtoonguide/User';
import CocodaUser from 'models/webtoonguide/CocodaUser';
import ContentWeeklyReportVoucherAccessType from 'models/webtoonguide/ContentWeeklyReportVoucherAccessType';
import ContentWeeklyReportUserGroupVoucher from 'models/webtoonguide/ContentWeeklyReportUserGroupVoucher';
import ContentWeeklyReportUserGroupUser from 'models/webtoonguide/ContentWeeklyReportUserGroupUser';
import ContentWeeklyReportUserGroup from 'models/webtoonguide/ContentWeeklyReportUserGroup';
import ContentWeeklyReportUserGroupDailyServiceUser from 'models/webtoonguide/ContentWeeklyReportUserGroupDailyServiceUser';
import ContentWeeklyReportAccessType from 'models/webtoonguide/ContentWeeklyReportAccessType';
import ContentWeeklyReportVoucher from 'models/webtoonguide/ContentWeeklyReportVoucher';
import ContentWeeklyReportUserGroupContractFile from 'models/webtoonguide/ContentWeeklyReportUserGroupContractFile';
import ContentWeeklyReportVoucherPrice from 'models/webtoonguide/ContentWeeklyReportVoucherPrice';
import CocodaUserCocodaUserGroup from 'models/webtoonguide/CocodaUserCocodaUserGroup';
import CocodaUserGroup from 'models/webtoonguide/CocodaUserGroup';
import ResellerAgency from 'models/webtoonguide/ResellerAgency';
import ResellerAgencyUser from 'models/webtoonguide/ResellerAgencyUser';
import ResellerAgencyVoucher from 'models/webtoonguide/ResellerAgencyVoucher';
import ResellerAgencyCustomerContractFile from 'models/webtoonguide/ResellerAgencyCustomerContractFile';

const includeJoinDatas: any = {
	user: {
		model: User,
		defaultAttributes: ['id', 'name'],
	},
	cocodaUser: {
		model: CocodaUser,
		defaultAttributes: ['id', 'name'],
	},
	cocodaUserGroup: {
		model: CocodaUserGroup,
		defaultAttributes: ['id', 'name'],
	},
	cocodaUserCocodaUserGroup: {
		model: CocodaUserCocodaUserGroup,
		defaultAttributes: ['cocoda_user_id', 'cocoda_user_group_id'],
	},
	contentWeeklyReportUserGroup: {
		model: ContentWeeklyReportUserGroup,
		defaultAttributes: ['id', 'name'],
	},
	contentWeeklyReportUserGroupUser: {
		model: ContentWeeklyReportUserGroupUser,
		defaultAttributes: [
			'id',
			'cocoda_user_id',
			'content_weekly_report_user_group_id',
		],
	},
	contentWeeklyReportAccessType: {
		model: ContentWeeklyReportAccessType,
		defaultAttributes: ['id', 'name'],
	},
	contentWeeklyReportVoucher: {
		model: ContentWeeklyReportVoucher,
		defaultAttributes: ['id', 'name'],
	},
	contentWeeklyReportVoucherAccessType: {
		model: ContentWeeklyReportVoucherAccessType,
		defaultAttributes: ['id', 'access_type_id', 'voucher_id'],
	},
	contentWeeklyReportVoucherPrice: {
		model: ContentWeeklyReportVoucherPrice,
		defaultAttributes: ['id', 'month', 'price', 'real_price'],
	},
	contentWeeklyReportUserGroupVoucher: {
		model: ContentWeeklyReportUserGroupVoucher,
		defaultAttributes: [
			'id',
			'voucher_id',
			'voucher_name',
			'start_at',
			'end_at',
		],
	},
	contentWeeklyReportUserGroupDailyServiceUser: {
		model: ContentWeeklyReportUserGroupDailyServiceUser,
		defaultAttributes: ['id', 'content_weekly_report_user_group_id', 'email'],
	},
	resellerAgency: {
		model: ResellerAgency,
		defaultAttributes: ['id', 'name'],
	},
	resellerAgencyUser: {
		model: ResellerAgencyUser,
		defaultAttributes: ['cocoda_user_id', 'reseller_agency_id'],
	},
	resellerAgencyVoucher: {
		model: ResellerAgencyVoucher,
		defaultAttributes: ['reseller_agency_id', 'voucher_id'],
	},
	contentWeeklyReportUserGroupContractFile: {
		model: ContentWeeklyReportUserGroupContractFile,
		defaultAttributes: [
			'id',
			'customer_id',
			'name',
			'path',
			'size',
			'insert_time',
		],
	},
	resellerAgencyCustomerContractFile: {
		model: ResellerAgencyCustomerContractFile,
		defaultAttributes: [
			'id',
			'reseller_agency_id',
			'cocoda_user_id',
			'contract_file_id',
		],
	},
};
const recursionParseInclude = (includeData: InterfaceIncludeDataInterface) => {
	let myIncludes: any = {};
	if (typeof includeJoinDatas == 'undefined') {
		return null;
	}
	if (typeof includeJoinDatas[includeData.key] == 'undefined') {
		return null;
	}

	const through =
		typeof includeData.through == 'undefined' ? undefined : includeData.through;
	const separate =
		typeof includeData.separate == 'undefined' ? false : includeData.separate;
	const required =
		typeof includeData.required == 'undefined' ? false : includeData.required;
	const attributes =
		typeof includeData.attributes == 'undefined'
			? includeJoinDatas[includeData.key].defaultAttributes
			: includeData.attributes;
	myIncludes = {
		model: includeJoinDatas[includeData.key].model,
		required: required,
		attributes: attributes,
		separate: separate,
		through: through,
	};
	if (typeof includeData.whereAttributes != 'undefined') {
		myIncludes.where = includeData.whereAttributes;
	}

	if (
		typeof includeJoinDatas[includeData.key].defaultWhereAttributes !=
		'undefined'
	) {
		if (typeof myIncludes.where == 'undefined') {
			myIncludes.where =
				includeJoinDatas[includeData.key].defaultWhereAttribute;
		} else {
			const whereKeys = Object.keys(
				includeJoinDatas[includeData.key].defaultWhereAttribute,
			);
			for (let i = 0; i < whereKeys.length; ++i) {
				if (typeof myIncludes.where[whereKeys[i]] != 'undefined') {
					continue;
				}
				myIncludes.where[whereKeys[i]] =
					includeJoinDatas[includeData.key].defaultWhereAttribute[whereKeys[i]];
			}
		}
	}

	if (
		typeof includeData.includes != 'undefined' &&
		includeData.includes.length > 0
	) {
		let childIncludes: any[] = [];
		includeData.includes.map((childIncludeItem) => {
			let childIncludeData = recursionParseInclude(childIncludeItem);
			if (childIncludeData != null) {
				childIncludes.push(childIncludeData);
			}
		});
		if (childIncludes.length > 0) {
			myIncludes.include = childIncludes;
		}
	}
	return myIncludes;
};

const parseWebtoonguideInclude = (
	includeDatas: InterfaceIncludeDataInterface[],
) => {
	let includes: any[] = [];
	includeDatas.map((includeData) => {
		let childIncludeData = recursionParseInclude(includeData);
		if (childIncludeData != null) {
			includes.push(childIncludeData);
		}
	});
	return includes;
};

export default parseWebtoonguideInclude;
