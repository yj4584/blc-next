import WgCrypto from 'modules/common/WgCrypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import requestIp from 'request-ip';
import { setCookie } from 'modules/back/AuthCheck';
import User from 'models/blcrasno/User';
import UserApiToken from 'models/blcrasno/UserApiToken';
import { ableUserGroupIds } from 'ts-data-file/access/user';
import { ApiLoginInterface } from 'data-interface/auth-interface';
import { Op } from 'sequelize';

const langIdToLangCode: any = {
	1: 'ko',
	2: 'en',
	3: 'ja',
};

async function passwordCheck(
	password: string,
	dbPassword: string,
): Promise<boolean> {
	dbPassword = dbPassword.replace(/^\$2y(.+)$/i, '$2a$1');
	return await bcrypt.compare(password, dbPassword);
}

function getHashKey(email: string, password: string): string {
	let nowTime: string = Math.round(new Date().getTime() * 0.001).toString();
	let hashToken: string =
		WgCrypto.md5(
			Math.random().toString().substring(0, 10) + nowTime + email + password,
		) +
		WgCrypto.md5(
			email + nowTime + password + Math.random().toString().substring(0, 10),
		) +
		WgCrypto.md5(
			password + nowTime + Math.random().toString().substring(0, 10) + email,
		);

	return hashToken;
}

export async function loginAction(
	email: string,
	password: string,
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<ApiLoginInterface> {
	let result: ApiLoginInterface = {
		isSuccess: false,
		msg: '아이디와 비밀번호를 확인해주세요.',
		authToken: '',
		userInfo: null,
	};
	let user: any = await User.findOne({
		where: { email: email},
		attributes: ['id', 'email', 'password'],
	});
	let isLoginFail = false;
	let cocodaUserId;
	

	if (user == null) {
		isLoginFail = true;
	} else {
		user = JSON.parse(JSON.stringify(user));
		cocodaUserId = user.id;
		let checkPassword = await passwordCheck(password, user.password);
		if (checkPassword == false) {
			isLoginFail = true;
		} 
	}

	if (isLoginFail) {
		// 로그인 실패 시 쿠키 안 줌
		return result;
	}

	let hashToken: string = getHashKey(email, password);
	while (true) {
		let authApiToken = await UserApiToken.findOne({
			where: {
				hash_token: hashToken,
			},
			attributes: ['user_id'],
		});
		if (authApiToken != null) {
			hashToken = getHashKey(email, password);
			continue;
		}
		let ip: any = req.headers['x-forwarded-for'] || requestIp.getClientIp(req);
		if (typeof ip != 'string') {
			ip = '';
		}
		
		let insertUsetToken = {
			user_id: user.id,
			user_email: user.email,
			hash_token: hashToken,
			user_agent:
				typeof req.headers['user-agent'] != 'string'
					? ''
					: req.headers['user-agent'],
			last_check_time: Math.floor(new Date().getTime() * 0.001),
			ip: ip,
		};
		console.log(insertUsetToken)
		await UserApiToken.create(insertUsetToken, {logging:true});
		break;
	}

	let loginTime = Math.floor(new Date().getTime() * 0.001).toString();
	result.isSuccess = true;
	result.msg = 'success';
	result.authToken = hashToken;
	result.userInfo = {
		userId: user.id,
		email: user.email,
		// userId: Number(process.env.TEST_USER_ID),
		// email: process.env.TEST_USER_EMAIL,
	};

	let apiKey: string =
		typeof process.env.MIX_API_MODULE_API_KEY == 'undefined'
			? ''
			: process.env.MIX_API_MODULE_API_KEY;

	let authKey = WgCrypto.processEncrypt(hashToken, loginTime + apiKey);

		
		setCookie({
			req: req,
			res: res,
			loginTime: loginTime,
			authKey: authKey,
			maxSessionTime: -1,
		});
	return result;
}

export async function logoutAction(req: NextApiRequest, res: NextApiResponse) {
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
	try {
		let akTokenCookie: any =
			typeof cookies['blcrasno-admin-ak-token'] == 'undefined'
				? null
				: cookies['blcrasno-admin-ak-token'];
		if (akTokenCookie == null) {
			return;
		}
		let lgTimeCookie: any =
			typeof cookies['blcrasno-admin-lg-time'] == 'undefined'
				? null
				: cookies['blcrasno-admin-lg-time'];
		if (lgTimeCookie == null) {
			return;
		}
		let apiKey: string =
			typeof process.env.MIX_API_MODULE_API_KEY == 'undefined'
				? ''
				: process.env.MIX_API_MODULE_API_KEY;

		let hashToken = WgCrypto.processDecrypt(
			akTokenCookie,
			lgTimeCookie + apiKey,
		);

		await UserApiToken.destroy({
			where: {
				hash_token: hashToken,
			},
		});
	} catch {}
	return;
}
