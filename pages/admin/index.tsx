import { fetchModule, fetchSSRModule } from "modules/front/FetchModule";
import { GetServerSideProps } from "next";
import { useState } from "react";
import SpinnerCoverage from "ts-components/common/SpinnerCoverage";

export const getServerSideProps: GetServerSideProps = async (context) => {
	// let apiUrl = `${process.env.SERVER_HOST_URL}/api/admin/main`;
	// //아래는 전체적인 예시 api, 실제 그대로 해당 api를 사용할 필요는 없음
	// const apiData = await fetchSSRModule(
	// 	context,
	// 	{
	// 		url: apiUrl,
	// 		method: 'GET',
	// 	},
	// 	false,
	// );

	// if (apiData.isError == true) {
	// 	return apiData.data;
	// }
	let props: any = {};
	// if (typeof apiData.metaInfo != 'undefined') {
	// 	props.metaInfo = apiData.metaInfo;
	// }

	return {
		props,
		redirect: {
					destination: '/admin/main',
				},
	};
};

export default function Index() {
}
