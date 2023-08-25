import { useDebouncedEffect } from 'hooks';
import { fetchModule } from 'modules/front/FetchModule';
import { getCurrentLangKey, transText } from 'modules/front/TextModule';
import React, { useEffect, useState } from 'react';
import {
	FormButtonDanger,
	FormLabel,
} from 'styles/styled-components/customer/DetailComponents';
import { Form } from 'styles/styled-components/common/FormComponent';
import { useSelector, useDispatch } from 'react-redux';
import useTypedSelector from 'redux-components/useTypedSelector';

const EmailControl = (props: any) => {
	const {
		customer,
		userIndex,
		userOrigin,
		setRefreshFlag,
		forModification,
		handlePwReset,
		user,
		// setEmailsDupCheckArr,
		setApiLoadingObj,
		setEmailsFormatCheckArr,
	} = props;
	const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(false);
	const [isNotEmail, setIsNotEmail] = useState(false);
	const isNewAddedUser = !Boolean(user.id);
	useEffect(() => {
		setEmailsFormatCheckArr((arr: boolean[]) => {
			const newArr = JSON.parse(JSON.stringify(arr));
			newArr[userIndex] = isNotEmail;
			return newArr;
		});
	}, [isNotEmail, userIndex]);

	// useDebouncedEffect(async () => {
	// 	if (!user.email) {
	// 		setIsDuplicatedEmail(false);
	// 		return;
	// 	}
	// 	if (forModification) {
	// 		setApiLoadingObj((obj: any) => ({ ...obj, emailCheck: true }));
	// 		const { result } = await fetchModule({
	// 			url: `/api/user?email=${user.email}`,
	// 			method: 'GET',
	// 		});
	// 		setApiLoadingObj((obj: any) => ({ ...obj, emailCheck: false }));

	// 		const oriEmail = userOrigin?.email ?? '!@#!@#!@#^^'; //TODO 수정필요
	// 		const apiResultEmail = result?.user?.email;
	// 		const needTostop = apiResultEmail && apiResultEmail != oriEmail;
	// 		if (needTostop) {
	// 			setIsDuplicatedEmail(true);
	// 		} else {
	// 			setIsDuplicatedEmail(false);
	// 		}
	// 		return;
	// 	}

	// 	const { result } = await fetchModule({
	// 		url: `/api/user?email=${user.email}`,
	// 		method: 'GET',
	// 	});
	// 	setApiLoadingObj((obj: any) => ({ ...obj, emailCheck: false }));
	// 	if (result.user) {
	// 		setIsDuplicatedEmail(true);
	// 		return;
	// 	}
	// 	setIsDuplicatedEmail(false);
	// }, [user.email]);

	//1. dup check. email 비어있을경우 dup false(ok)
	//2. 전송날리기전 빈 이메일 제거 후 보내기

	return (
		<>
			<FormLabel className="w-100">
				<div className="user-item-top">
					<div className="name-label-area" onClick={() => {}}>
						{transText('user_id', '사용자 아이디')}{' '}
						<i
							className="fa-solid fa-trash"
							onClick={() => {
								let tempUsers: any = [];
								customer.users.map((otherUser: any, otherUserIndex: number) => {
									if (otherUserIndex == userIndex) {
										return;
									}
									tempUsers.push(otherUser);
								});
								customer.users = tempUsers;
								setRefreshFlag((b: boolean) => !b);
								setEmailsFormatCheckArr((arr: boolean[]) => {
									const newArr = JSON.parse(JSON.stringify(arr));
									newArr.splice(userIndex, 1);
									return newArr;
								});
							}}
						/>
						{isDuplicatedEmail && (
							<div className="name-dup-check">
								{transText('info_9', '이미 사용중인 아이디입니다.')}
							</div>
						)}
						{isNotEmail && (
							<div className="name-dup-check">
								{transText('info_14', '이메일 형식으로 입력해주세요.')}
							</div>
						)}
					</div>
					{forModification && !isNewAddedUser && (
						<div
							className="text-right"
							style={{ display: 'flex', alignItems: 'center' }}
						>
							<div>
								<Form.InfoIcon
									className="fa-solid fa-circle-info"
									content={transText(
										'info_4',
										"비밀번호를 초기화 할 경우, 비밀번호가 '123456789a'로 설정되며, cocoda 메인 페이지 → 개인 정보 보기'에서 변경 가능합니다.",
									)}
								></Form.InfoIcon>
								{/* <i className="fa-solid fa-circle-info pw-reset-info-icon" /> */}
							</div>
							<FormButtonDanger className="ml-1 py-0" onClick={handlePwReset}>
								{transText('reset_pw', '비밀번호 초기화')}
							</FormButtonDanger>
						</div>
					)}
				</div>
			</FormLabel>
			<input
				className={`form-control`}
				value={user.email}
				onBlur={() => {
					const emailRegex = /.*?@.*?/;
					if (!emailRegex.test(user.email)) {
						setIsNotEmail(true);
					} else {
						setIsNotEmail(false);
					}
				}}
				onChange={(event) => {
					// if (event.target.value !== '') {
					// 	setApiLoadingObj((obj: any) => ({ ...obj, emailCheck: true }));
					// }
					user.email = event.target.value;
					setRefreshFlag((b: boolean) => !b);
				}}
			/>
		</>
	);
};

export default EmailControl;
