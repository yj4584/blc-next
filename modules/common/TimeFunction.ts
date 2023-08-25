export function getMondayUnixTimestamp(
	unixTimestamp: number | null = null,
): number {
	if (unixTimestamp == null) {
		unixTimestamp = new Date().getTime();
	}

	let paramDate = new Date(unixTimestamp); // new Date('2021-06-08'): 화요일

	let day = paramDate.getDay();
	let diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
	let monday = new Date(paramDate.setDate(diff));

	let year = monday.getFullYear();
	let month = monday.getMonth() + 1;
	let date = monday.getDate();

	monday = new Date(year + '-' + month + '-' + date + ' 00:00:00');

	return monday.getTime();
}

export function getTodayStartUnixTimestamp(
	unixTimestamp: number | null = null,
): number {
	if (unixTimestamp == null) {
		unixTimestamp = new Date().getTime();
	}

	let paramDate = new Date(unixTimestamp); // new Date('2021-06-08'): 화요일

	let year = paramDate.getFullYear();
	let month = paramDate.getMonth() + 1;
	let date = paramDate.getDate();

	paramDate = new Date(year + '-' + month + '-' + date + ' 00:00:00');

	return paramDate.getTime();
}

export function convertUnixTo23_59_59(unixSecTime: number) {
	const timestamp = unixSecTime * 1000;
	const date = new Date(timestamp);

	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);

	const updatedUnixTime = Math.floor(date.getTime() / 1000);

	return updatedUnixTime;
}

export function convertUnixTo00_00_00(unixTime: number) {
	const timestamp = unixTime * 1000;
	const date = new Date(timestamp);

	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);

	const updatedUnixTime = Math.floor(date.getTime() / 1000);

	return updatedUnixTime;
}

export function adjustDay(date: Date, daysToaddOrSubtract: number) {
	const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
	const adjustedDay = new Date(date.getTime() + oneDay * daysToaddOrSubtract);
	return adjustedDay;
}
//https://momentjs.com/ 확인해보기
export class TimeConverter {
	timestamp: number;
	date: Date;
	weekName: string[];
	weekShortName: string[];
	// constructor:any

	constructor(props: any) {
		this.timestamp = new Date().getTime();
		this.date = new Date(this.timestamp);
		this.weekName = [
			'일요일',
			'월요일',
			'화요일',
			'수요일',
			'목요일',
			'금요일',
			'토요일',
		];
		this.weekShortName = ['일', '월', '화', '수', '목', '금', '토'];
	}

	static now() {
		let timeConverter = new TimeConverter(null);

		timeConverter.timestamp = new Date().getTime();
		timeConverter.date = new Date(timeConverter.timestamp);
		return timeConverter;
	}
	static parse(timestamp: any) {
		let timeConverter = new TimeConverter(null);

		timeConverter.timestamp = timestamp;
		timeConverter.date = new Date(timeConverter.timestamp);
		return timeConverter;
	}
	static timestampToFormat(timestamp: any, format: any) {
		let timeConverter = new TimeConverter(null);

		timeConverter.timestamp = timestamp;
		timeConverter.date = new Date(timeConverter.timestamp);
		return timeConverter.format(format);
	}
	static transformMonthWeekCount(timestamp: any) {
		let timeConverter = new TimeConverter(null);
		timeConverter.timestamp = timestamp;
		timeConverter.date = new Date(timeConverter.timestamp);
		let nowMonth = timeConverter.format('MM');
		let nowDay = timeConverter.format('dd');
		let weekCount = Math.ceil(parseInt(nowDay) / 7);
		return nowMonth + '월 ' + weekCount + '주';
	}

	firstZeroNumber(inputData: any, len: any): any {
		if (typeof inputData == 'string') {
			let zeroNumber = '';
			for (let i = 0; i < len - inputData.length; ++i) {
				zeroNumber += '0';
			}
			return zeroNumber + inputData;
		} else if (typeof inputData == 'number') {
			return this.firstZeroNumber(inputData.toString(), len);
		}
		return '';
	}

	format(format: any) {
		if (!this.valueOf()) return ' ';

		let myObj = this;

		return format.replace(
			/(yyyy|YY|yy|MM|ii|dd|E|hh|mm|ss|shortDay|a\/p)/gi,
			function ($1: any) {
				switch ($1) {
					case 'YY':
						return myObj.date.getFullYear();
					case 'yyyy':
						return myObj.date.getFullYear();
					case 'yy':
						return myObj.firstZeroNumber(myObj.date.getFullYear() % 1000, 2);
					case 'MM':
						return myObj.firstZeroNumber(myObj.date.getMonth() + 1, 2);
					case 'dd':
						return myObj.firstZeroNumber(myObj.date.getDate(), 2);
					case 'E':
						return myObj.weekName[myObj.date.getDay()];
					case 'shortDay':
						return myObj.weekShortName[myObj.date.getDay()];
					case 'HH':
						return myObj.firstZeroNumber(myObj.date.getHours(), 2);
					case 'hh':
						let h;
						return myObj.firstZeroNumber(
							(h = myObj.date.getHours() % 12) ? h : 12,
							2,
						);
					case 'ii':
						return myObj.firstZeroNumber(myObj.date.getMinutes(), 2);
					case 'mm':
						return myObj.firstZeroNumber(myObj.date.getMinutes(), 2);
					case 'ss':
						return myObj.firstZeroNumber(myObj.date.getSeconds(), 2);
					case 'a/p':
						return myObj.date.getHours() < 12 ? '오전' : '오후';
					default:
						return $1;
				}
			},
		);
	}
}

// 출력 예시 2023-07-06
export function timeConverterUnixToDashString(UNIX_timestamp: number) {
	const a = new Date(UNIX_timestamp * 1000);
	const year = a.getFullYear();
	let month = String(a.getMonth() + 1);
	let date = String(a.getDate());
	if (month.length === 1) month = '0' + month;
	if (date.length === 1) date = '0' + date;
	const time = year + '-' + month + '-' + date;
	return time;
}
