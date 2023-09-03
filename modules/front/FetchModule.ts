import WgCrypto from 'modules/common/WgCrypto';
import { ServerSideInterface } from 'data-interface/common';

export function fetchModule(
	props: {
		url: string;
		method: string;
		headers?: any;
		body?: string | any;
		isBodyEncryption?: boolean;
		cookies?: string;
		isPureBody?: boolean;
	},
	isOnlyLogin = true,
	isSSR = false,
) {
	let apiKey: string =
		typeof process.env.MIX_API_MODULE_API_KEY == 'undefined'
			? ''
			: process.env.MIX_API_MODULE_API_KEY;
	let submitTime = Math.floor(new Date().getTime() * 0.001);
	let options: any = {
		method: props.method.toUpperCase(),
	};
	if (typeof props.headers != 'undefined') {
		options.headers = props.headers;
	} else {
		options.headers = {
			'Content-Type': 'application/json',
		};
	}
	if (typeof props.cookies != 'undefined') {
		options.headers.cookie = props.cookies;
	}
	options.headers.reqtime = submitTime;
	let isBodyEncryption =
		typeof props.isBodyEncryption == 'undefined'
			? false
			: props.isBodyEncryption;
	if (typeof props.body != 'undefined') {
		if (typeof props.body != 'string') {
			options.body = props.body;
		} else if (
			typeof props.isPureBody == 'boolean' &&
			props.isPureBody == true
		) {
			options.body = props.body;
		} else if (isBodyEncryption == false) {
			options.body = JSON.stringify({
				data: props.body,
			});
		} else {
			options.body = JSON.stringify({
				encrypedData: WgCrypto.processEncrypt(props.body, submitTime + apiKey),
			});
		}
	}

	return fetch(props.url, options)
		.then((response) => {
			let jsonData = response.json();
			return jsonData;
		})
		.then((apiData) => {
			if (isSSR == false) {
				let pathName = window.location.href.replace(
					`${window.location.protocol}//${window.location.host}`,
					'',
				);
				if (apiData.code == 404) {
					document.location = '/error/404';
				}
				// if (isOnlyLogin == true && apiData.isLogin == false) {
				// 	document.location = `/auth/login?re=${encodeURIComponent(pathName)}`;
				// }
			}
			return apiData;
		});
}

export async function fetchSSRModule(
	ssrContext: any,
	props: {
		url: string;
		method: string;
		headers?: any;
		body?: string;
		isBodyEncryption?: boolean;
	},
	isOnlyLogin = true,
): Promise<ServerSideInterface> {
	let cookies = '';
	try {
		cookies = ssrContext.req.headers.cookie;
	} catch {}

	let myHeader = props.headers;
	if (typeof myHeader == 'undefined') {
		myHeader = {};
	}
	let copyHeaderAttrs = [
		'sec-ch-ua',
		'user-agent',
		'sec-ch-ua-platform',
		'accept-language',
	];
	copyHeaderAttrs.forEach((copyHeaderAttr) => {
		if (
			typeof myHeader[copyHeaderAttr] == 'undefined' &&
			typeof ssrContext.req.headers[copyHeaderAttr] != 'undefined'
		) {
			try {
				myHeader[copyHeaderAttr] = ssrContext.req.headers[copyHeaderAttr];
			} catch {}
		}
	});
	// Fetch data from external API
	const apiData = await fetchModule(
		{
			url: props.url,
			method: props.method,
			headers: myHeader,
			body: props.body,
			isBodyEncryption: props.isBodyEncryption,
			cookies: cookies,
		},
		isOnlyLogin,
		true,
	);
	let result: ServerSideInterface = {
		isError: false,
		data: apiData.result,
		msg: apiData.msg,
		code: apiData.code,
	};
	if (typeof apiData.metaInfo != 'undefined') {
		result.metaInfo = apiData.metaInfo;
	}

	// if (isOnlyLogin == true && apiData.isLogin == false) {
	// 	result.isError = true;
	// 	result.data = {
	// 		redirect: {
	// 			permanent: false,
	// 			destination: `/auth/login?re=${encodeURIComponent(
	// 				ssrContext.resolvedUrl,
	// 			)}`,
	// 		},
	// 		props: {},
	// 	};
	// }
	if (apiData.code == 404) {
		result.isError = true;
		result.data = {
			redirect: {
				permanent: false,
				destination: `/error/404`,
			},
			props: {},
		};
	}
	return result;
}
