import { GetServerSideProps } from 'next';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import TicketList from 'ts-components/ticket/TicketList';
import MainSectionLayout from 'ts-components/Layouts/MainSectionLayout';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/ticket`;
	//아래는 전체적인 예시 api, 실제 그대로 해당 api를 사용할 필요는 없음
	const apiData = await fetchSSRModule(context, {
		url: apiUrl,
		method: 'GET',
	});

	if (apiData.isError == true) {
		return apiData.data;
	}
	let props: any = {};
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}

	props.tickets = apiData.data.tickets;
	return {
		props,
	};
};

export default function MainIndex(props: any) {
	return (
		<>
			<MainSectionLayout titleName="전체 이용권 리스트" isNewButton={true}>
				<TicketList tickets={props.tickets} />
			</MainSectionLayout>
		</>
	);
}
