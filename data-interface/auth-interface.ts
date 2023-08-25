export interface ApiTokenAttribute {
	user_id?: number;
	user_email?: string;
	hash_token?: string;
	browser_id?: number;
	os_id?: number;
	uuid?: string;
	last_check_time?: number;
	ip?: string;
	is_remember?: boolean;
	is_remember_same_ip?: boolean;
	created_at?: Date | null;
	updated_at?: Date | null;
}

export interface ApiUserInterface {
	userId?: number | null;
	email?: string | null;
}

export interface ApiLoginInterface {
	isSuccess: boolean;
	msg: string;
	authToken: string;
	userInfo: ApiUserInterface | null;
}

export interface LoginInfoInterface {
	isLogin: boolean;
	userName: string;
	userId: number | null;
	userEmail: string | null;
	langCode?: string;
	otherData?: any;
}
