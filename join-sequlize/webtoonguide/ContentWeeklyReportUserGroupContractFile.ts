import joinProcess from 'join-sequlize/joinProcess';
import ContentWeeklyReportUserGroupContractFile from 'models/webtoonguide/ContentWeeklyReportUserGroupContractFile';
import ResellerAgencyCustomerContractFile from 'models/webtoonguide/ResellerAgencyCustomerContractFile';

const joinList: any = {
	ResellerAgencyCustomerContractFile: () => {
		ContentWeeklyReportUserGroupContractFile.hasMany(
			ResellerAgencyCustomerContractFile,
			{
				foreignKey: 'contract_file_id',
			},
		);
	},
};

const joinFunction = (modelNames: string[] = []) => {
	joinProcess(joinList, modelNames);
};

export default joinFunction;
