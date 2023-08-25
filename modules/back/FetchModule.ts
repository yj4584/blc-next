import WgCrypto from '../common/WgCrypto';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export async function getFetchData(req: NextApiRequest, res: NextApiResponse) {
	if (typeof req.headers.reqtime != 'string') {
		return null;
	}
	let reqTime = Number(req.headers.reqtime);
	let reqTimeGap = new Date().getTime() - reqTime * 1000;
	if (reqTimeGap > 1000 && reqTimeGap < -30 * 60 * 1000) {
		return null;
	}
	if (req.method == 'GET') {
		return req.query;
	}
	let apiKey: string =
		typeof process.env.MIX_API_MODULE_API_KEY == 'undefined'
			? ''
			: process.env.MIX_API_MODULE_API_KEY;
	if (typeof req.body.data == 'string') {
		return JSON.parse(req.body.data);
	}
	if (typeof req.body.encrypedData == 'string') {
		let encrypedData = WgCrypto.processDecrypt(
			req.body.encrypedData,
			req.headers.reqtime + apiKey,
		);
		return JSON.parse(encrypedData);
	}
	return null;
}

export async function apiServerFetchModule(
	apiUrl: string,
	req: NextApiRequest,
) {
	const bodyData = req.body;
	let response: any = null;

	let options: any = {};
	options.headers = {};
	options.headers.cookie = req.headers.cookie;
	options.headers.reqtime = req.headers.reqtime;
	options.headers['content-type'] = req.headers['content-type'];
	//options.headers = req.headers;

	if (req.method == 'GET') {
		response = await axios.get(apiUrl, options);
	} else if (req.method == 'POST') {
		response = await axios.post(apiUrl, bodyData, options);
	} else if (req.method == 'PUT') {
		response = await axios.put(apiUrl, bodyData, options);
	} else if (req.method == 'DELETE') {
		response = await axios.delete(apiUrl, options);
	}

	return response.data;
}
