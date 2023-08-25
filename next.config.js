/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		AUTH_COOKIE_TIME: process.env.AUTH_COOKIE_TIME
			? process.env.AUTH_COOKIE_TIME
			: 240,
		SERVER_HOST_URL: process.env.SERVER_HOST_URL
			? process.env.SERVER_HOST_URL
			: 'http://localhost:28005/',

		MIX_API_MODULE_API_KEY: process.env.MIX_API_MODULE_API_KEY
			? process.env.MIX_API_MODULE_API_KEY
			: '',

		UPLOAD_MAX_MB_SIZE: process.env.UPLOAD_MAX_MB_SIZE
			? Number(process.env.UPLOAD_MAX_MB_SIZE)
			: 5,
		MODEL_STORAGE_PATH: process.env.MODEL_STORAGE_PATH
			? process.env.MODEL_STORAGE_PATH
			: 'storage/',
	},
};

module.exports = nextConfig;
