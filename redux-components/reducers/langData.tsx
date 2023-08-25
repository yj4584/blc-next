import { ReduxActionInterface } from 'data-interface/common';

const initialStateUser = {
	id: null,
	name: null,
	isAdmin: false,
	email: null,
	accessTypes: [],
	contentWeeklyReportUserGroups: [],
};
const initialStateLanguage = {
	langCode: 'ko',
};

export const SET_LANG_DATA = 'langData/SET' as const;
export const SET_LANG_CODE = 'langData/SET_LANG_CODE' as const;
export const GET_LANG_DATA = 'langData/GET' as const;

export const setLangData = (langData: any) => ({
	type: SET_LANG_DATA,
	payload: langData,
});
export const setLangCode = (langCode: any) => ({
	type: SET_LANG_CODE,
	payload: langCode,
});

export const getLangData = () => ({
	type: GET_LANG_DATA,
});

export interface LangDataInterface {
	langCode: any;
	langData: any;
}

export const initialState: LangDataInterface = {
	langCode: '',
	langData: null,
};

export const langDataReducer = (
	state: LangDataInterface = initialState,
	action: ReduxActionInterface,
) => {
	switch (action.type) {
		case SET_LANG_DATA:
			return {
				langData: action.payload.langData,
				langCode: action.payload.langCode,
			};
		case SET_LANG_CODE:
			return {
				langCode: action.payload,
			};
		case GET_LANG_DATA:
			return state.langData;
		default:
			return state;
	}
};
