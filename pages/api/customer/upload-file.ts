// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthCheck } from 'modules/back/AuthCheck';
import { getFetchData } from 'modules/back/FetchModule';
import { loginAction } from 'modules/back/AuthModule';
import { ApiDataInterface } from 'data-interface/common';
import { LoginInfoInterface } from 'data-interface/auth-interface';
import formidable from 'formidable';
import FormData from 'form-data';
import fs from 'fs';
import ResellerAgencyContractFile from 'models/webtoonguide/ContentWeeklyReportUserGroupContractFile';
import ResellerAgencyContractFileController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupContractFileController';
// import ResellerAgencyContractFileController from 'data-controllers/webtoonguide/ResellerAgencyCustomerContractFile';
import ContentWeeklyReportUserGroupContractFileController from 'data-controllers/webtoonguide/ContentWeeklyReportUserGroupContractFileController';
import ResellerAgencyUserController from 'data-controllers/webtoonguide/ResellerAgencyUserController';
import ResellerAgencyCustomerContractFileController from 'data-controllers/webtoonguide/ResellerAgencyCustomerContractFileController';

export const config = {
	api: {
		bodyParser: false,
	},
};
function mkdir(dirPath: string) {
	const isExists = fs.existsSync(dirPath);
	if (!isExists) {
		fs.mkdirSync(dirPath);
	}
}

const PutMethod = async (
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
	loginInfo: LoginInfoInterface,
	defaultMetaInfo: any,
) => {
	let fileInfo: any = {};
	const fileData: any = await new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm({
			maxFileSize: 5 * 1024 * 1024 * 1024 * 1024,
			keepExtensions: true,
		});

		form.parse(req, (err, fields, files) => {
			fileInfo.fileName = fields.fileName;
			fileInfo.fileSize = fields.fileSize;
			fileInfo.insertTime = fields.insertTime;
			fileInfo.isEnd = fields.isEnd;
			fileInfo.customerId =
				fields.customerId == 'undefined' ? null : fields.customerId;

			if (err) return reject(err);
			return resolve(files);
		});
	});

	let fileTempPath = fileData.file.filepath;
	const fs = require('fs');
	const filePath = `contract/${fileInfo.insertTime}/${fileInfo.fileName}`;
	const newPath = `${process.env.MODEL_STORAGE_PATH}${filePath}`;
	const customerId = fileInfo.customerId;
	mkdir(`${process.env.MODEL_STORAGE_PATH}contract`);
	mkdir(`${process.env.MODEL_STORAGE_PATH}contract/${fileInfo.insertTime}`);
	let newData = fs.readFileSync(fileTempPath, { flag: 'r' });

	fs.writeFileSync(newPath, newData, {
		flag: 'a+',
	});
	fs.writeFileSync(fileTempPath, '', {
		flag: 'w',
	});
	const { exec, execSync } = require('child_process');

	try {
		//리눅스만 작동
		execSync(`rm ${fileTempPath}`).toString('utf-8');
	} catch {}

	// const newPathWithUrl = 'https://sale.cocoda.info/' + newPath;
	let fileId: number | null = null;
	if (fileInfo.isEnd == '1') {
		//파일 리스트 table 저장

		try {
			const fileContract =
				await ContentWeeklyReportUserGroupContractFileController.create({
					customer_id: customerId,
					name: fileInfo.fileName,
					path: '/' + newPath,
					size: fileInfo.fileSize,
					insert_time: Math.floor(new Date().getTime() / 1000),
				});
			if (!loginInfo.userId) {
				return;
			}
			if (!fileContract?.id) {
				return;
			}
			fileId = fileContract.id;
			const sellerUser = await ResellerAgencyUserController.findOneByUserId(
				loginInfo.userId,
			);

			await ResellerAgencyCustomerContractFileController.createOne(
				loginInfo.userId,
				fileContract.id,
				sellerUser?.reseller_agency_id,
			);
		} catch (err) {
			console.log(err);

			return res.status(400).json({
				isLogin: loginInfo.isLogin,
				msg: '',
				code: 400,
				result: {
					success: false,
					msg: '생성 실패',
				},
				metaInfo: defaultMetaInfo,
			});
		}
	}
	//무조건 그냥 보내기
	return res.status(200).json({
		isLogin: loginInfo.isLogin,
		msg: '',
		code: 200,
		result: {
			success: true,
			msg: '생성 성공',
			filePath: '/' + newPath,
			fileId: fileId,
		},
		metaInfo: defaultMetaInfo,
	});
};

const ApiMethods: any = {
	PUT: PutMethod,
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ApiDataInterface>,
) {
	let isLogin = await AuthCheck(req, res);
	if (isLogin.isLogin == false) {
		return res.status(200).json({
			isLogin: isLogin.isLogin,
			msg: 'not login',
			code: 400,
			result: null,
		});
	}

	const pageTitle = '기타 모델 관리';
	let defaultMetaInfo = {};
	if (typeof req.method != 'string') {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 메소드',
			code: 404,
			result: null,
		});
	}
	if (Object.keys(ApiMethods).includes(req.method) == false) {
		return res.status(200).json({
			isLogin: true,
			msg: '알 수 없는 메소드',
			code: 404,
			result: null,
		});
	}
	return ApiMethods[req.method](req, res, isLogin, defaultMetaInfo);
}
