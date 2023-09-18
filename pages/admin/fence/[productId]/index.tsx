import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { use, useState } from 'react';
import { TicketComponents } from 'styles/styled-components/ticket/TicketComponents';
import ProductDetailComponent from 'ts-components/admin/ProductDetailComponent';
import SpinnerCoverage from 'ts-components/common/SpinnerCoverage';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/admin/${queryData.pageType}/${queryData.productId}`;
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
	let props: any = apiData.data;
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}

	return {
		props,
	};
};

export default function ProductIndex(props: any) {
	const { query } = useRouter();
	const pageType = 'fence';
	return (
		<ProductDetailComponent
			productData={props.productData}
			pageType={pageType}
		/>
	);
}
