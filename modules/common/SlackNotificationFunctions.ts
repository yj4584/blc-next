import { LoginInfoInterface } from 'data-interface/auth-interface';

export const sendSlackAddVoucherInfo = (
	customer: any,
	vouchers: string[],
	users: string[],
	dailyServiceUsers: string[],
	loginInfo: LoginInfoInterface,
) => {
	sendSlackVoucherBase(
		customer,
		vouchers,
		users,
		dailyServiceUsers,
		'추가',
		loginInfo,
	);
};
export const sendSlackDeleteVoucherInfo = (
	customer: any,
	vouchers: string[],
	users: string[],
	dailyServiceUsers: string[],
	loginInfo: LoginInfoInterface,
) => {
	sendSlackVoucherBase(
		customer,
		vouchers,
		users,
		dailyServiceUsers,
		'삭제',
		loginInfo,
	);
};
export const sendSlackEditVoucherInfo = (
	customer: any,
	vouchers: string[],
	users: string[],
	dailyServiceUsers: string[],
	loginInfo: LoginInfoInterface,
) => {
	sendSlackVoucherBase(
		customer,
		vouchers,
		users,
		dailyServiceUsers,
		'수정',
		loginInfo,
	);
};

const sendSlackVoucherBase = (
	customer: any,
	vouchers: string[],
	users: string[],
	dailyServiceUsers: string[],
	typeMessage: string,
	loginInfo: LoginInfoInterface,
) => {
	if (vouchers.length > 0 || users.length > 0 || dailyServiceUsers.length > 0) {
		let vouchersMessage = vouchers.join('\n');
		let usersMessage = users.join('\n');
		let dailyServiceUsersMessage = dailyServiceUsers.join('\n');

		if (vouchersMessage == '') {
			vouchersMessage = '없음';
		}
		if (usersMessage == '') {
			usersMessage = '없음';
		}
		if (dailyServiceUsersMessage == '') {
			dailyServiceUsersMessage = '없음';
		}

		const dispatcher = `${loginInfo.userName ?? '이름없음'}(${
			loginInfo.userEmail
		})`;

		let subText = `${
			'`' + customer.name + '`'
		} 이용권이 ${typeMessage}되었습니다`;

		let submitBody = {
			channel: '#cocoda-이용권알림',
			// channel: '#cocoda-test',
			attachments: [
				{
					username: 'cocoda 알림',
					fallback: subText,
					pretext: `*${subText} - ${dispatcher}*`,
					color: '#007bff',
					fields: [
						{
							title: '[사용자]',
							value: usersMessage,
							short: false,
						},
						{
							title: '[이용권]',
							value: vouchersMessage,
							short: false,
						},
						{
							title: '[데일리 서비스]',
							value: dailyServiceUsersMessage,
							short: false,
						},
					],
				},
			],
		};
		sendVoucherSlack(submitBody);
	}
};

const sendVoucherSlack = (submitBody: any) => {
	fetch(
		'https://hooks.slack.com/services/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',
		{
			body: JSON.stringify(submitBody),
			method: 'POST',
		},
	);
};
