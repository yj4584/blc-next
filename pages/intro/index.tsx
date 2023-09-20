import { fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/intro`;
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
	let props: any = apiData.data;
	if (typeof apiData.metaInfo != 'undefined') {
		props.metaInfo = apiData.metaInfo;
	}

	return {
		props,
	};
};

export default function Intro(props: any) {
	return (
		<section className="intro-section">
			<div className="title-area">
				<p className="title">회사 소개</p>
			</div>
			<div className="sub-title">인사말</div>
			<div
				className="intro-text"
				dangerouslySetInnerHTML={{ __html: props.introData.text }}
			></div>
		</section>
	);
}
