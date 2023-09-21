import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import SpinnerCoverage from 'ts-components/common/SpinnerCoverage';

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

export default function IntroIndex(props: any) {
	const [isUploading, setIsUploading] = useState<Boolean>(false);
	const [refreshFlag, setRefreshFlag] = useState<Boolean>(false);
	const [introText, setIntroText] = useState<string>(
		props.introData.text.replaceAll('<br />', '\n'),
	);
	return (
		<section className="admin-section">
			{isUploading && <SpinnerCoverage />}
			<div className="card">
				<div className="card-body">
					<div className="section-title">소개 페이지</div>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<div className="section-sub-title">인사말 관리</div>
					<textarea
						className="intro-text"
						value={introText}
						onChange={(e) => {
							setIntroText(e.target.value);
						}}
					/>
					<button
						className="edit-btn"
						onClick={() => {
							setIsUploading(true);
							fetchModule({
								url: `/api/intro`,
								method: 'put',
								body: JSON.stringify({
									text: introText.replaceAll('\n', '<br />'),
								}),
							}).then((res: any) => {
								alert('저장 성공');
								setIsUploading(false);
							});
						}}
					>
						저장
					</button>
				</div>
			</div>
		</section>
	);
}
