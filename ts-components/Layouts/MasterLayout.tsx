import Head from 'next/head';
import DefaultLayout from 'ts-components/Layouts/default/layout';

function MasterLayout(props: {
	metaInfo: any;
	children: any;
	pageType: string;
}) {
	let htmlTitle =
		typeof props.metaInfo == 'undefined' ||
		typeof props.metaInfo.title != 'string'
			? '비엘텍크라스노'
			: `${props.metaInfo.title} - 비엘텍크라스노`;
	let htmlDescription =
		typeof props.metaInfo == 'undefined' ||
		typeof props.metaInfo.description != 'string'
			? '비엘텍크라스노'
			: `${props.metaInfo.description}`;
	let htmlKeyword =
		typeof props.metaInfo == 'undefined' ||
		typeof props.metaInfo.keyword != 'string'
			? ''
			: `${props.metaInfo.keyword}`;
	let htmlAuthor =
		typeof props.metaInfo == 'undefined' ||
		typeof props.metaInfo.author != 'string'
			? ''
			: `${props.metaInfo.author}`;

	function renderDefaultMode() {
		return (
			<DefaultLayout metaInfo={props.metaInfo}>{props.children}</DefaultLayout>
		);
	}

	function renderLoginMode() {
		return <>{props.children}</>;
	}

	function renderChildren() {
		if (props.pageType == 'default') {
			return renderDefaultMode();
		} else if (props.pageType == 'login') {
			return renderLoginMode();
		}
		return renderDefaultMode();
	}

	return (
		<>
			<Head>
				<title>{htmlTitle}</title>

				<meta name="title" content={htmlTitle} />
				<meta name="twitter:title" content={htmlTitle} />
				<meta property="og:title" content={htmlTitle} />
				<meta name="description" content={htmlDescription} />
				<meta name="twitter:description" content={htmlDescription} />
				<meta property="og:description" content={htmlDescription} />
				{htmlKeyword == '' ? null : (
					<>
						<meta name="keywords" content={htmlKeyword} />
						<meta name="twitter:keywords" content={htmlKeyword} />
						<meta property="og:keywords" content={htmlKeyword} />
					</>
				)}
				{htmlAuthor == '' ? null : (
					<>
						<meta name="author" content={htmlAuthor} />
						<meta name="twitter:author" content={htmlAuthor} />
						<meta property="og:author" content={htmlAuthor} />
					</>
				)}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{renderChildren()}
		</>
	);
}

export default MasterLayout;
