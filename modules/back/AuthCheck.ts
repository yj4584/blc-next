import type { NextApiRequest, NextApiResponse } from 'next';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import WgCrypto from 'modules/common/WgCrypto';
import User from 'models/blcrasno/User';
import UserApiToken from 'models/blcrasno/UserApiToken';
import { ableUserGroupIds } from 'ts-data-file/access/user';
import { Op } from 'sequelize';

export function getNowCustomerId(props: {
	req: NextApiRequest;
	res: NextApiResponse;
	customerIds: number[];
}) {
	if (props.customerIds?.length == 0) {
		return null;
	}
	let myHeader: any = props.req.headers;
	let nowCustomerId = props.customerIds[0];

	try {
		if (myHeader.cookie.includes('blcrasno-admin-customer-id=')) {
			let strCookieSplit = myHeader.cookie.split(';');
			let cookies: any = {};
			strCookieSplit.forEach((cookie: string) => {
				cookie = cookie.trim();
				let cookieData = cookie.split('=');
				if (cookieData[1] == '') {
					return;
				}
				cookies[cookieData[0]] = cookieData[1];
			});
			let cookieCustomerId = cookies['blcrasno-admin-customer-id'];
			if (props.customerIds.includes(Number(cookieCustomerId))) {
				nowCustomerId = Number(cookieCustomerId);
			}
		}
	} catch {
		console.log('error');
	}

	return nowCustomerId;
}

export function setCookie(props: {
	req: NextApiRequest;
	res: NextApiResponse;
	loginTime: string;
	authKey: string;
	nowLangCode?: string;
	maxSessionTime?: number;
	customerIds?: number[];
}) {
	let now = new Date();
	let time = now.getTime();
	let maxSessionTime: number = -1;
	let expiresText = '-1';
	if (typeof props.maxSessionTime == 'undefined') {
		maxSessionTime =
			1000 *
			60 *
			(typeof process.env.AUTH_COOKIE_TIME == 'undefined'
				? 240
				: Number(process.env.AUTH_COOKIE_TIME));
		let expireTime = time + maxSessionTime;
		now.setTime(expireTime);
		expiresText = now.toUTCString();
	} else if (props.maxSessionTime == -1) {
		expiresText = '-1';
	} else {
		let expireTime = time + props.maxSessionTime;
		now.setTime(expireTime);
		expiresText = now.toUTCString();
	}
	let myHeader: any = props.req.headers;
	
	let insertCookies = [
		`blcrasno-admin-lg-time=${props.loginTime}; path=/; expires=${expiresText}`,
		`blcrasno-admin-ak-token=${props.authKey}; path=/; expires=${expiresText}`,
	];

	if (typeof props.customerIds != 'undefined' && props.customerIds.length > 0) {
		let nowCustomerId = getNowCustomerId({
			req: props.req,
			res: props.res,
			customerIds: props.customerIds,
		});
		if (nowCustomerId != null) {
			insertCookies.push(
				`blcrasno-admin-customer-id=${nowCustomerId}; path=/; expires=${expiresText}`,
			);
		}
	}

	props.res.setHeader('Set-Cookie', insertCookies);
}

export async function AuthCheck(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<LoginInfoInterface> {
	let maxSessionTime =
		1000 *
		60 *
		(typeof process.env.AUTH_COOKIE_TIME == 'undefined'
			? 240
			: Number(process.env.AUTH_COOKIE_TIME));
	let strCookies =
		typeof req.headers.cookie == 'undefined' ? '' : req.headers.cookie;
	let strCookieSplit = strCookies.split(';');
	let cookies: any = {};
	strCookieSplit.forEach((cookie: string) => {
		cookie = cookie.trim();
		let cookieData = cookie.split('=');
		if (cookieData[1] == '') {
			return;
		}
		cookies[cookieData[0]] = cookieData[1];
	});
	let loginInfo: LoginInfoInterface = {
		isLogin: false,
		userName: '',
		userId: null,
		userEmail: null,
		otherData: {
			isAdmin: false,
			customerIds: [],
		},
	};
	try {
		let akTokenCookie: any =
			typeof cookies['blcrasno-admin-ak-token'] == 'undefined'
				? null
				: cookies['blcrasno-admin-ak-token'];
		if (akTokenCookie == null) {
			return loginInfo;
		}
		let lgTimeCookie: any =
			typeof cookies['blcrasno-admin-lg-time'] == 'undefined'
				? null
				: cookies['blcrasno-admin-lg-time'];
		if (lgTimeCookie == null) {
			return loginInfo;
		}
		let nowTimeGap = new Date().getTime() - lgTimeCookie * 1000;
		if (nowTimeGap < -10000) {
			//10초 이상 시간이 빠르면 오류 계산
			setCookie({
				req: req,
				res: res,
				loginTime: '',
				authKey: '',
				maxSessionTime: maxSessionTime,
			});
			return loginInfo;
		}
		if (nowTimeGap > maxSessionTime) {
			//세션 시간 넘어간 로그인은 자동 로그아웃
			setCookie({
				req: req,
				res: res,
				loginTime: '',
				authKey: '',
				maxSessionTime: maxSessionTime,
			});
			return loginInfo;
		}
		let apiKey: string =
			typeof process.env.MIX_API_MODULE_API_KEY == 'undefined'
				? ''
				: process.env.MIX_API_MODULE_API_KEY;

		let hashToken = WgCrypto.processDecrypt(
			akTokenCookie,
			lgTimeCookie + apiKey,
		);
		let authApiToken: any = await UserApiToken.findOne({
			where: {
				hash_token: hashToken,
			},
			attributes: ['user_id', 'user_email', 'last_check_time'],
		});
		if (authApiToken == null) {
			return loginInfo;
		}
		authApiToken = JSON.parse(JSON.stringify(authApiToken));

		let user: any = await User.findOne({
			where: { id: authApiToken.user_id },
			attributes: ['id', 'name', 'email'],
		});
		if (user == null) {
			return loginInfo;
		}
		user = JSON.parse(JSON.stringify(user));
		//관리자 체크
		// let userUserGroup = await CocodaUserCocodaUserGroup.findOne({
		// 	where: {
		// 		cocoda_user_id: authApiToken.cocoda_user_id,
		// 		cocoda_user_group_id: { [Op.in]: ableUserGroupIds },
		// 	},
		// 	attributes: ['cocoda_user_group_id'],
		// }).then((res) => res?.get({ plain: true }));
		// if (userUserGroup == null) {
		// 	return loginInfo;
		// } else if (userUserGroup.cocoda_user_group_id === 1) {
		// 	loginInfo.otherData.isAdmin = true;
		// } else {
		// 	loginInfo.otherData.isAdmin = false;
		// }

		loginInfo.isLogin = true;
		loginInfo.userName = user.name;
		loginInfo.userId = authApiToken.user_id;
		loginInfo.userEmail = authApiToken.user_email;

		let loginTime = Math.floor(new Date().getTime() * 0.001).toString();

		let authKey = WgCrypto.processEncrypt(hashToken, loginTime + apiKey);

		let now = new Date();
		let time = now.getTime();
		let expireTime = time + maxSessionTime;
		now.setTime(expireTime);

		await UserApiToken.update(
			{
				last_check_time: Number(loginTime),
			},
			{
				where: {
					hash_token: hashToken,
				},
			},
		);
		setCookie({
			req: req,
			res: res,
			loginTime: loginTime,
			authKey: authKey,
			maxSessionTime: maxSessionTime,
		});
		return loginInfo;
	} catch (error) {
		setCookie({
			req: req,
			res: res,
			loginTime: '',
			authKey: '',
			maxSessionTime: maxSessionTime,
		});
		return loginInfo;
	}
}
