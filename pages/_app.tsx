import 'styles/global.scss';
import 'styles/fontawesome-free-6.1.2/css/all.min.css';
import type { AppContext, AppProps } from 'next/app';
import MasterLayout from 'ts-components/Layouts/MasterLayout';
import { useRouter } from 'next/router';
import reduxWrapper, { configureStore } from 'redux-components/store/store';
import { Provider } from 'react-redux';
import App from 'next/app';
import { fetchSSRModule } from 'modules/front/FetchModule';
import React, { useState, useEffect } from 'react';
import { ActionCreators } from 'redux-components/actions/user';
import AdminLayout from 'ts-components/Layouts/admin/AdminLayout';

const store = configureStore();
interface MyAppProps extends AppProps {
	appInitData: any;
}

function MyApp({ Component, pageProps, appInitData }: MyAppProps) {
	const [userEmail, setUserEmail] = useState('');
	const router = useRouter();
	const { dispatch } = store;

	// useEffect(() => {
	// 	try {
	// 		if (userEmail != appInitData.userData.userEmail) {
	// 			setUserEmail(appInitData.userData.email);
	// 			dispatch(ActionCreators.login(appInitData.userData));
	// 		}
	// 	} catch (error) {
	// 		console.error('[No User]');
	// 	}
	// }, [appInitData.userData?.userEmail]);
	let metaInfo: any = {};
	if (typeof pageProps.metaInfo != 'undefined') {
		metaInfo = pageProps.metaInfo;
	}

	let pageType = 'default';
	if (router.pathname.indexOf('/auth/login') == 0) {
		pageType = 'login';
	} else if (
		router.pathname === '/admin' ||
		router.pathname.indexOf('/admin/') >= 0
	) {
		pageType = 'admin';
	}

	return (
		<Provider store={store}>
			{pageType == 'admin' ? (
				<AdminLayout>
					<Component {...pageProps} />
				</AdminLayout>
			) : (
				<MasterLayout metaInfo={metaInfo} pageType={pageType}>
					<Component {...pageProps} />
				</MasterLayout>
			)}
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
	// const userData = await fetchSSRModule(context.ctx, {
	// 	url: `${process.env.SERVER_HOST_URL}/api/auth/login-check`,
	// 	method: 'GET',
	// });

	return { ...appProps };
};

export default reduxWrapper.withRedux(MyApp);
