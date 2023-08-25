import 'styles/global.scss';
import 'styles/fontawesome-free-6.1.2/css/all.min.css';
import type { AppContext, AppProps } from 'next/app';
import MasterLayout from 'ts-components/Layouts/MasterLayout';
import { useRouter } from 'next/router';
import reduxWrapper, { configureStore } from 'redux-components/store/store';
import { Provider } from 'react-redux';
import App from 'next/app';
import { fetchSSRModule } from 'modules/front/FetchModule';
import LangTrans from 'modules/front/TextModule';
import { setLangCode } from 'redux-components/reducers/langData';
import React, { useState, useEffect } from 'react';
import { ActionCreators } from 'redux-components/actions/user';

const store = configureStore();
interface MyAppProps extends AppProps {
	appInitData: any;
}

function MyApp({ Component, pageProps, appInitData }: MyAppProps) {
	const [userEmail, setUserEmail] = useState('');
	const router = useRouter();
	const { dispatch } = store;

	useEffect(() => {
		try {
			if (userEmail != appInitData.userData.userEmail) {
				setUserEmail(appInitData.userData.email);
				dispatch(ActionCreators.login(appInitData.userData));
			}
		} catch (error) {
			console.error('[No User]');
		}
	}, [appInitData.userData?.userEmail]);
	let metaInfo: any = {};
	if (typeof pageProps.metaInfo != 'undefined') {
		metaInfo = pageProps.metaInfo;
	}

	let pageType = 'default';
	if (router.pathname.indexOf('/auth/login') == 0) {
		pageType = 'login';
	}

	if (typeof appInitData.langCode != 'undefined') {
		LangTrans.getInstance().setChangeLang(appInitData.langCode);
	}
	if (
		['ko', 'en', 'ja'].includes(LangTrans.getInstance().getLangKey()) ==
			false &&
		typeof appInitData.langData != 'undefined'
	) {
		LangTrans.getInstance().setChangeLang(appInitData.langCode);
		dispatch(setLangCode(appInitData.langCode));
	}

	return (
		<Provider store={store}>
			<MasterLayout metaInfo={metaInfo} pageType={pageType}>
				<Component {...pageProps} />
			</MasterLayout>
		</Provider>
	);
}

MyApp.getInitialProps = async (context: AppContext) => {
	let appProps: any = {};
	appProps.appInitData = {};
	if (typeof context.ctx.req == 'undefined') {
		return { ...appProps };
	}
	appProps = await App.getInitialProps(context);
	appProps.appInitData = {};
	const apiData = await fetchSSRModule(context.ctx, {
		url: `${process.env.SERVER_HOST_URL}/api/language/language`,
		method: 'GET',
	});
	const userData = await fetchSSRModule(context.ctx, {
		url: `${process.env.SERVER_HOST_URL}/api/auth/login-check`,
		method: 'GET',
	});

	appProps.appInitData.langCode = apiData.data.langCode;
	appProps.appInitData.userData = userData.data;

	return { ...appProps };
};

export default reduxWrapper.withRedux(MyApp);
