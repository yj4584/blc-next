import { GetServerSideProps } from 'next';
import { fetchSSRModule } from 'modules/front/FetchModule';
import { MetaInfoInterface } from 'data-interface/common';
import { CocodaUserGroupControllerAttribute } from 'data-controllers/webtoonguide/CocodaUserGroupController';
import MainSectionLayout from 'ts-components/Layouts/MainSectionLayout';
import UserForm from 'ts-components/user/UserForm';
import { CocodaUserControllerAttribute } from 'data-controllers/webtoonguide/CocodaUserController';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const queryData = context.query;
	const { userId } = queryData;
	const apiUserUrl = `${process.env.SERVER_HOST_URL}/api/user/${userId}`;
	const apiUserData = await fetchSSRModule(context, {
		url: apiUserUrl,
		method: 'GET',
	});

	const apiUserGroupUrl = `${process.env.SERVER_HOST_URL}/api/user-group`;
	const apiUserGroupData = await fetchSSRModule(context, {
		url: apiUserGroupUrl,
		method: 'GET',
	});

	if (apiUserData.isError == true) {
		return apiUserData.data;
	}

	const props: {
		metaInfo?: MetaInfoInterface;
		user?: CocodaUserControllerAttribute;
		userGroups?: CocodaUserGroupControllerAttribute[];
	} = {};
	if (typeof apiUserData.metaInfo != 'undefined') {
		props.metaInfo = apiUserData.metaInfo;
	}
	props.user = apiUserData.data.user;
	props.userGroups = apiUserGroupData?.data?.userGroups;
	return {
		props,
	};
};

export default function MainIndex(props: any) {
	const { user, userGroups } = props;
	return (
		<MainSectionLayout titleName={`[${user.name}] 상세페이지`} isEdit={true}>
			<UserForm userGroups={userGroups} user={user} />
		</MainSectionLayout>
	);
}
