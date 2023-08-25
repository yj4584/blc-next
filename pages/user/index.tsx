import { GetServerSideProps } from 'next';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import UserList from 'ts-components/user/UserList';
import MainSectionLayout from 'ts-components/Layouts/MainSectionLayout';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	const apiUrl = `${process.env.SERVER_HOST_URL}/api/user`;
	//아래는 전체적인 예시 api, 실제 그대로 해당 api를 사용할 필요는 없음
	const apiData = await fetchSSRModule(context, {
		url: apiUrl,
		method: 'GET',
	});

	if (apiData.isError == true) {
		return apiData.data;
	}
	const props: any = {};
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}

	props.users = apiData.data.users;
	return {
		props,
	};
};

export default function MainIndex(props: any) {
	const titleName = props.metaInfo.title;
	return (
		<>
			<MainSectionLayout titleName="전체 사용자 리스트" isNewButton={true}>
				<UserList users={props.users} />
			</MainSectionLayout>
		</>
	);
}
