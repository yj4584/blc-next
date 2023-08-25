import { useSelector, useDispatch } from 'react-redux';

interface LangPackInterface {
	[key: string]: { [key: string]: {} };
}
import langPack from 'storage/langPack.json';

// export function viewTransText(
// 	key: string,
// 	langCode: string,
// 	defaultText: string,
// ) {
// 	langCode = ['ko', 'en', 'ja'].includes(langCode.toLowerCase())
// 		? langCode.toLowerCase()
// 		: 'ko';

// 	let curLangPack: LangPackInterface = langPack;
// 	defaultText = typeof defaultText == 'string' ? defaultText : '';
// 	console.log(curLangPack[langCode]);
// 	if (curLangPack[langCode][key]) {
// 		return curLangPack[langCode][key];
// 	}

// 	return defaultText;
// }

let LangTrans = (function () {
	let instantiead: any;
	let langPackLookUp: any = null;
	let myLangCode = '';
	let langData: any = null;

	function init() {
		function lookUpText(key: string, defaultText: string) {
			if (langData == null) {
				langData = langPack;
			}
			try {
				let transTxt = '';
				!langData ||
				typeof key == 'undefined' ||
				typeof langData[myLangCode][key] == 'undefined'
					? (transTxt = defaultText)
					: (transTxt = langData[myLangCode][key]);
				return transTxt;
			} catch {
				return defaultText;
			}
		}
		function setChangeLang(langCode: string) {
			if (['ko', 'en', 'ja'].includes(langCode) == false) {
				return;
			}
			myLangCode = langCode;
			return;
		}

		function isHaveLangPack() {
			if (!langPackLookUp) {
				return false;
			}
			return true;
		}

		function getLangKey() {
			try {
				let cookies = document.cookie.split(';');
				cookies.forEach((cookie) => {
					let cookieItem = cookie.trim().split('=');
					if (
						cookieItem[0] == 'cocoda-sale-admin-lang-code' &&
						['ko', 'en', 'ja'].includes(cookieItem[1])
					) {
						myLangCode = cookieItem[1];
					}
				});
			} catch (error) {
				// console.log(error);
			}
			return myLangCode;
		}
		return {
			getText: lookUpText,
			isHaveLangPack,
			getLangKey,
			setChangeLang,
		};
	}

	return {
		getInstance: function () {
			if (typeof instantiead == 'undefined' || !instantiead) {
				instantiead = init();
			}
			return instantiead;
		},
	};
})();

let transTextFunction = null;
if (
	typeof process.env.MIX_VIEW_LANG_TEXT_KEY == 'undefined' ||
	process.env.MIX_VIEW_LANG_TEXT_KEY != '1'
) {
	transTextFunction = (key: string, defaultText: string) => {
		try {
			const instance = LangTrans.getInstance();

			return instance.getText(key, defaultText);
		} catch {
			return defaultText;
		}
	};
} else {
	transTextFunction = (key: string, defaultText: string) => {
		const instance = LangTrans.getInstance();

		return '[' + key + ']' + instance.getText(key, defaultText);
	};
}

export const transText = transTextFunction;

export const getCurrentLangKey = () => {
	return LangTrans.getInstance().getLangKey();
};

export default LangTrans;
