export interface StringKeyObj {
	[key: string]: string | any;
}

export interface StringKeyFunction {
	[key: string]: Function;
}

export interface StringKeyObjectValueInterface {
	[key: string]: any;
}

export interface StringKeyNumberValueInterface {
	[key: string]: number;
}

export interface StringKeyStringValueInterface {
	[key: string]: string;
}

export interface NumbeKeyStringValueInterface {
	[key: number]: string;
}

export interface ReduxActionInterface {
	type: string;
	payload: any;
}

export interface UserInterface {
	isAdmin: boolean;
	email: string;
	customerIds: any[];
	customers: { id: number; name: string }[];
	nowCustomerId: number;
}

export interface ServerSideInterface {
	isError: boolean;
	data: any;
	msg: string;
	code: number;
	metaInfo?: MetaInfoInterface;
}

//SSR로 불러와야하는 곳에서 사용
export interface MetaInfoInterface {
	title: string;
	description: string;
	author?: string;
	keywords?: string;
	headerDatas?: {
		title: string;
		link: string;
	}[];
}

export interface ApiDataInterface {
	isLogin?: boolean;
	msg: string;
	code: number;
	result: any;
	metaInfo?: MetaInfoInterface;
}

export interface OtherData {
	customerIds: number[];
	isAdmin: boolean;
}
export interface UserDataInterface {
	userId: number;
	userName?: string;
	userEmail: string;
	otherData: OtherData;
	isLogin: boolean;
	langCode: string;
}
