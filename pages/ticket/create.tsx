import { GetServerSideProps } from 'next';
import { fetchSSRModule } from 'modules/front/FetchModule';
import { TicketForm } from 'ts-components/ticket/TicketForm';
import MainSectionLayout from 'ts-components/Layouts/MainSectionLayout';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/ticket/create`;
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
	props.accessTypeData = apiData.data.accessTypeData;
	return {
		props,
	};
};

export default function TicketCreate(props: any) {
	return (
		<>
			<MainSectionLayout titleName={`이용권 관리 > 이용권 추가`}>
				<TicketForm accessTypeData={props.accessTypeData} />
			</MainSectionLayout>
		</>
	);
}
