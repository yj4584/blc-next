import Head from 'next/head';
import { useState } from 'react';
import loginStyle from 'styles/styled-components/auth/login';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/auth/login`;
	//아래는 전체적인 예시 api, 실제 그대로 해당 api를 사용할 필요는 없음
	const apiData = await fetchSSRModule(
		context,
		{
			url: apiUrl,
			method: 'GET',
		},
		false,
	);

	if (apiData.isError == true) {
		return apiData.data;
	}
	let props: any = {};
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}

	return {
		props,
	};
};

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<>
			<loginStyle.Section>
				<loginStyle.Form
					onSubmit={(event) => {
						event.preventDefault();
						if (router.isReady == false) {
							return;
						}
						let submitData = {
							email: email.trim(),

							password: password.trim(),
						};
						fetchModule(
							{
								url: '/api/auth/login',
								method: 'post',
								body: JSON.stringify(submitData),
								isBodyEncryption: true,
							},
							false,
						).then((data) => {
							if (data.isLogin == true) {
								if (typeof router.query.re != 'undefined') {
									router.push(router.query.re.toString());
								} else {
									router.push('/admin');
								}
								return;
							}
							alert(data.msg);
						});
					}}
				>
					<loginStyle.Body>
						<loginStyle.Title>LOGIN</loginStyle.Title>
						<loginStyle.Label>
							<i className="fa-regular fa-user"></i>
						</loginStyle.Label>
						<loginStyle.Input
							placeholder="ID"
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
						<loginStyle.Label>
							<i className="fa-sharp fa-solid fa-key"></i>
						</loginStyle.Label>
						<loginStyle.Input
							placeholder="PW"
							type={'password'}
							value={password}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
						<loginStyle.Button>LOGIN</loginStyle.Button>
						{/* <loginStyle.Footer>
							Copyright (c) COINST. All rights reserved.
						</loginStyle.Footer> */}
					</loginStyle.Body>
				</loginStyle.Form>
			</loginStyle.Section>
		</>
	);
}

/*

*/
