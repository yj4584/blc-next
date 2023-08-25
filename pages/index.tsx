import { GetServerSideProps } from 'next';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/dashboard`;
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
		...(!apiData.data.isAdmin && {
			redirect: {
				destination: '/customer',
			},
		}),
	};
};

export default function MainIndex() {
	return (
		<>
			<>Dashboard</>
		</>
	);
}
