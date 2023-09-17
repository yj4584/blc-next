import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';
import { AuthCookieCheck } from 'modules/back/AuthCookieCheck';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
	if (
		request.nextUrl.pathname.startsWith('/_next') ||
		request.nextUrl.pathname.startsWith('/fonts') ||
		request.nextUrl.pathname.startsWith('/images') ||
		request.nextUrl.pathname.startsWith('/auth') ||
		request.nextUrl.pathname.startsWith('/api/auth')
		// request.nextUrl.pathname.startsWith('/api/language')
	) {
		return NextResponse.next();
	}

	if (request.nextUrl.pathname.startsWith('/admin')){
		let userInfo = await AuthCookieCheck(request);
		const urlData = request.nextUrl.clone();

		if (userInfo == false) {
			urlData.pathname = `/auth/login`;
			urlData.search = `?re=${encodeURIComponent(
				request.nextUrl.pathname + request.nextUrl.search,
			)}`;
			return NextResponse.redirect(`${urlData}`);
		}
	}
	
	return NextResponse.next();
}
