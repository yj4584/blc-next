import { fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/admin/facility`;
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
		// ...(!apiData.data.isAdmin && {
		// 	redirect: {
		// 		destination: '/customer',
		// 	},
		// }),
	};
};

export default function Facility(props: any) {
	const [currentBanner, setCurrentBanner] = useState<number>(1);
	const [isFadeIn, setIsFadeIn] = useState(true);
	return (
		<section className="facility-section">
			<div className="left-title">공장 및 목재창고</div>
			<div
				className={`main-banner banner${currentBanner} ${
					isFadeIn ? 'opacity-1' : 'opacity-0'
				}`}
				style={{
					backgroundImage: `url(${props.images[currentBanner - 1].url})`,
				}}
			>
				<div
					className="prev-btn"
					onClick={() => {
						setIsFadeIn(false);
						setIsFadeIn(true);
						if (currentBanner == 1) {
							setCurrentBanner(3);
						} else {
							setCurrentBanner(currentBanner - 1);
						}
					}}
				>
					<i className="fa-solid fa-chevron-left" />
				</div>
				<div
					className="next-btn"
					onClick={() => {
						setIsFadeIn(false);
						setIsFadeIn(true);
						if (currentBanner == 3) {
							setCurrentBanner(1);
						} else {
							setCurrentBanner(currentBanner + 1);
						}
					}}
				>
					<i className="fa-solid fa-chevron-right" />
				</div>
				<div className="banner-nav">
					<div className="nav-btn active">
						{currentBanner == 1 ? (
							<i className="fa-solid fa-circle" />
						) : (
							<i className="fa-regular fa-circle" />
						)}
					</div>
					<div className="nav-btn inactive">
						{currentBanner == 2 ? (
							<i className="fa-solid fa-circle" />
						) : (
							<i className="fa-regular fa-circle" />
						)}
					</div>
					<div className="nav-btn inactive">
						{currentBanner == 3 ? (
							<i className="fa-solid fa-circle" />
						) : (
							<i className="fa-regular fa-circle" />
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
