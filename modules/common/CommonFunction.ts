export const arrayGroupBy = (
	oriList: any[],
	key: string,
	isNotArr: boolean = false,
) => {
	if (isNotArr) {
		return arrayJsonToJsonArray(oriList, key);
	}
	const newKeys: any[] = [];
	const newDatas: any = {};
	for (let i = 0; i < oriList.length; ++i) {
		if (!newKeys.includes(oriList[i][key])) {
			newKeys.push(oriList[i][key]);
			newDatas[oriList[i][key]] = [oriList[i]];
		} else {
			newDatas[oriList[i][key]].push(oriList[i]);
		}
	}

	return newDatas;
};

export const arrayJsonToJsonArray = (oriList: any[], key: string) => {
	const newKeys: any[] = [];
	const newDatas: any = {};
	for (let i = 0; i < oriList.length; ++i) {
		if (!newKeys.includes(oriList[i][key])) {
			newKeys.push(oriList[i][key]);
			newDatas[oriList[i][key]] = oriList[i];
		}
	}

	return newDatas;
};

export const encodeHTMLentities = (targetString: string) => {
	return targetString.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
		return '&#' + i.charCodeAt(0) + ';';
	});
};

export const jsonToArray = (object: any) => {
	const resultList: any[] = [];
	Object.keys(object).map((key) => {
		const data = object[key];
		if (Array.isArray(data)) {
			resultList.push(...data);
			return;
		}
		resultList.push(data);
	});
	return resultList;
};

export const typeOfCheck = (data: any) => {
	return Object.prototype.toString.call(data).slice(8, -1);
};

export const checkSnakeCase = (text: string) => {
	return text.indexOf('_') != -1;
};

export const convertSnakeCaseToCamelCase = (text: string) => {
	const isSnakeCase = text.includes('_');
	return isSnakeCase
		? text.replace(/[^[a-zA-Z0-9]+(.)/g, (m, char) => char.toUpperCase())
		: text;
};

export const convertCamelCaseToSnakeCase = (text: string) => {
	return text.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
};

export const convertFirstCharToUpperCase = (text: string) => {
	return text.replace(/^[a-z]/, (char) => char.toUpperCase());
};

export const convertObjectSnakeCaseToCamelCase = (data: any) => {
	return Object.keys(data).reduce((prev: any, key: string) => {
		const dataKey = checkSnakeCase(key)
			? convertSnakeCaseToCamelCase(key)
			: key;
		return { ...prev, [dataKey]: data[key] };
	}, {});
};

export const formatWithMonetaryId = (
	amount: number,
	monetaryUnitId?: number,
) => {
	const commaFormatted = amount.toLocaleString();
	switch (monetaryUnitId) {
		case 1: {
			return '₩ ' + commaFormatted;
		}
		case 2: {
			return '¥ ' + commaFormatted;
		}
		case 3: {
			return '$ ' + commaFormatted;
		}
		case 4: {
			return '€ ' + commaFormatted;
		}
		default: {
			commaFormatted;
		}
	}
};
