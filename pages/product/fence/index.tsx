import { deckClip } from 'data/deckClip';
import { fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
	let queryData = context.query;
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/fence`;
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

export default function Fence(props: any) {
	return (
		<section className="fence-section">
			<div className="title-area">
				<p className="title">합성목재</p>
			</div>
			<div className="sub-title">휀스&브라켓</div>
			<div
				className="image"
				style={{
					backgroundImage: `url(${props.intro[0].url})`,
				}}
			></div>
			<p className="text-center">비엘텍크라스노의 휀스 제품을 소개합니다.</p>
			<div className="sub-title">휀스 소재</div>
			{props.materials.map((materialItem: any, materialIndex: number) => {
				return (
					<div
						className="image-area"
						key={`material-image-${materialIndex}`}
						style={{
							backgroundImage: `url(${materialItem.url})`,
						}}
					></div>
				);
			})}
			<div className="sub-title">연결 클립</div>
			<div className="info-area">
				{props.products.map((item: any, index: number) => {
					return (
						<div className="item" key={`product-${index}`}>
							<p className="item-title">{item.name}</p>
							<div className="item-image-area">
								<div className="item-image-col">
									{item.images.products.map(
										(productImage: any, imageIndex: number) => {
											return (
												<div
													className="item-image"
													style={{
														backgroundImage: `url(${productImage.url})`,
													}}
													key={`deck-item-product-image-${imageIndex}`}
												></div>
											);
										},
									)}
								</div>
								<div className="item-image-col">
									{item.images.drafts.map(
										(productImage: any, imageIndex: number) => {
											return (
												<div
													className="item-image"
													style={{
														backgroundImage: `url(${productImage.url})`,
													}}
													key={`deck-item-draft-image-${imageIndex}`}
												></div>
											);
										},
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
