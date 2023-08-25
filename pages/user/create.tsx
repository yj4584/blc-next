import { GetServerSideProps } from 'next';
import UserForm from 'ts-components/user/UserForm';
import MainSectionLayout from 'ts-components/Layouts/MainSectionLayout';
import { fetchSSRModule } from 'modules/front/FetchModule';
import { CocodaUserGroupControllerAttribute } from 'data-controllers/webtoonguide/CocodaUserGroupController';
import { MetaInfoInterface } from 'data-interface/common';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const queryData = context.query;
	const apiUrl = `${process.env.SERVER_HOST_URL}/api/user-group`;
	const apiData = await fetchSSRModule(context, {
		url: apiUrl,
		method: 'GET',
	});
	if (apiData.isError == true) {
		return apiData.data;
	}

	const props: {
		metaInfo?: MetaInfoInterface;
		userGroups?: CocodaUserGroupControllerAttribute[];
	} = {};
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}
	props.userGroups = apiData.data.userGroups;

	return {
		props,
	};
};

export default function MainIndex(props: any) {
	const titleName = props.metaInfo.title;
	return (
		<MainSectionLayout titleName={titleName}>
			<UserForm userGroups={props.userGroups} />
		</MainSectionLayout>
	);
}
