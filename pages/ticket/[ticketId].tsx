import { GetServerSideProps } from 'next';
import { fetchSSRModule } from 'modules/front/FetchModule';
import { TicketForm } from 'ts-components/ticket/TicketForm';
import MainSectionLayout from 'ts-components/Layouts/MainSectionLayout';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/ticket/ticket?ticketId=${queryData.ticketId}`;
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
	props.ticketData = apiData.data.ticketData;
	props.accessTypeData = apiData.data.accessTypeData;
	return {
		props,
	};
};

export default function TicketDetail(props: any) {
	return (
		<>
			<MainSectionLayout titleName={`이용권 관리 > 이용권 수정`}>
				<TicketForm
					ticketData={props.ticketData}
					accessTypeData={props.accessTypeData}
				/>
			</MainSectionLayout>
		</>
	);
}
