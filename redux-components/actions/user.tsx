import { Types } from 'redux-components/constants/actionTypes';
import { UserDataInterface } from 'data-interface/common';

export const ActionCreators = {
	login: (user: UserDataInterface) => {
		return {
			type: Types.LOGIN,
			payload: {
				id: user.userId,
				name: user.userName,
				email: user.userEmail,
				isAdmin: user.otherData.isAdmin,
				// langCode: user.langCode,
				// isLogin: user.isLogin,
				// accessTypes: user.accessTypes,
				// userGroups: user.userGroups,
				// ip: user.ip,
			},
		};
	},
};
