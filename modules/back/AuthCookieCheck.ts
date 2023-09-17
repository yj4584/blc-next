import type { NextRequest } from 'next/server';

export async function AuthCookieCheck(request: NextRequest) {
	try {
		let akTokenCookie: any = request.cookies.get('blcrasno-admin-ak-token');
		if (akTokenCookie == null || akTokenCookie == '') {
			return false;
		}
		let lgTimeCookie: any = request.cookies.get('blcrasno-admin-lg-time');
		if (lgTimeCookie == null || lgTimeCookie == '') {
			return false;
		}

		return true;
	} catch (error) {
		console.log('error', error);
		return false;
	}
}
