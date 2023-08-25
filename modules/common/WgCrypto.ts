import CryptoJS from 'crypto-js';

export default class WgCrypto {
	static processEncrypt(data: string, secretKey: string): string {
		let iv = secretKey.substring(0, 16);
		secretKey = secretKey.substring(0, 32);

		let wordArraySecretKey: CryptoJS.lib.WordArray =
			CryptoJS.enc.Utf8.parse(secretKey);
		let wordArrayIv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(iv);
		return CryptoJS.AES.encrypt(data, wordArraySecretKey, {
			iv: wordArrayIv,
			mode: CryptoJS.mode.CBC,
		}).toString();
	}

	static processDecrypt(data: string, secretKey: string): string {
		let iv = secretKey.substring(0, 16);
		secretKey = secretKey.substring(0, 32);

		let wordArraySecretKey: CryptoJS.lib.WordArray =
			CryptoJS.enc.Utf8.parse(secretKey);
		let wordArrayIv: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(iv);
		return CryptoJS.AES.decrypt(data, wordArraySecretKey, {
			iv: wordArrayIv,
			mode: CryptoJS.mode.CBC,
		}).toString(CryptoJS.enc.Utf8);
	}

	static md5(string: string): string {
		return CryptoJS.MD5(string).toString();
	}
}
