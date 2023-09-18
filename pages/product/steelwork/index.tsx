import { fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/steelwork`;
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
export default function Steelwork(props: any) {
	return (
		<section className="steelwork-section">
			<div className="title-area">
				<p className="title">연결철물&주춧돌</p>
			</div>
			<div className="sub-title">연결철물</div>
			<div className="info-area">
				{props.products.map((item: any, index: number) => {
					return (
						<div className="item" key={index}>
							<p className="item-title">{item.name}</p>
							<div
								className="item-image"
								style={{
									backgroundImage: `url(${item.images.products[0].url})`,
								}}
							></div>
							<div
								className="item-image"
								style={{
									backgroundImage: `url(${item.images.models[0].url})`,
								}}
							></div>
							<div
								className="item-image"
								style={{
									backgroundImage: `url(${item.images.drafts[0].url})`,
								}}
							></div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
