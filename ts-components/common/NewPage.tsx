import React from 'react';
import { useRouter } from 'next/router';
import {
	StringKeyNumberValueInterface,
	StringKeyStringValueInterface,
} from 'data-interface/common';
import { fetchModule } from 'modules/front/FetchModule';
import {
	NewPageForm as NewPageFormBox,
	NewPageFormButton,
} from 'styles/styled-components/common/NewPage';

export const NewPageForm = ({ ...props }) => {
	const { menuKey, isEdit, children } = props;
	const router = useRouter();
	let isDisabled = false;
	const handleClickSubmitButton = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isDisabled) return;
		isDisabled = true;
		const form = event.currentTarget;
		if (typeof form == 'undefined' || form == null) {
			return;
		}

		const submitDatas:
			| StringKeyNumberValueInterface
			| StringKeyStringValueInterface = {};
		const inputElList = form.querySelectorAll('input, select');

		for (let i = 0; i < inputElList.length; i++) {
			const inputEl: any = inputElList[i];
			const { name, value } = inputEl;

			if (typeof name == 'undefined' || name == '') {
				continue;
			}
			submitDatas[name] = value;
		}

		fetchModule({
			url: `/api/${menuKey}${isEdit == true ? `/${submitDatas.id}` : ''}`,
			method: isEdit == true ? 'PUT' : 'POST',
			body: JSON.stringify(submitDatas),
		})
			.then(() => router.replace(`/${menuKey}`))
			.catch(() => alert('Fail'));
		setTimeout(() => (isDisabled = false), 1000);
	};

	return (
		<NewPageFormBox onSubmit={handleClickSubmitButton}>
			{children}
			<div className="button-row">
				<NewPageFormButton type="submit">전송</NewPageFormButton>
			</div>
		</NewPageFormBox>
	);
};
