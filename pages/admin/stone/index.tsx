import { fetchModule, fetchSSRModule } from "modules/front/FetchModule";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { TicketComponents } from "styles/styled-components/ticket/TicketComponents";
import SpinnerCoverage from "ts-components/common/SpinnerCoverage";

import dynamic from 'next/dynamic';

const ProductComponent = dynamic(() => import('ts-components/admin/ProductComponent'), {ssr: false});

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/admin/stone`;
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
	console.log(props)
	return {
		props
	};
};

const ProductIndex:NextPage = (props:any) => {
	return <>
		<ProductComponent pageData={props} pageType="stone"/>
	</>
}

export default ProductIndex;
