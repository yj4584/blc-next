import { Types } from 'redux-components/constants/actionTypes';
import { ReduxActionInterface } from 'data-interface/common';

const initialStateUser = {
	id: null,
	name: null,
	email: null,
	isAdmin: false,
	// accessTypes: [],
	// contentWeeklyReportUserGroups: [],
};

export const userReducer = (
	state = initialStateUser,
	action: ReduxActionInterface,
) => {
	switch (action.type) {
		case Types.LOGIN:
			return {
				...state,
				id: action.payload.id,
				name: action.payload.name,
				email: action.payload.email,
				isAdmin: action.payload.isAdmin,
				// accessTypes: action.payload.accessTypes,
				// userGroups: action.payload.userGroups,
				// ip: action.payload.ip,
				//contentWeeklyReportUserGroups: action.payload.contentWeeklyReportUserGroups,
			};
		case Types.LOGOUT:
			return {
				...state,
				initialStateUser,
			};
		default:
			return state;
	}
};
