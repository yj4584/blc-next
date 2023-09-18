import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import { useRouter } from 'next/router';
import { use, useState } from 'react';
import { TicketComponents } from 'styles/styled-components/ticket/TicketComponents';
import SpinnerCoverage from 'ts-components/common/SpinnerCoverage';

const ProductDetailComponent = (props: {
	productData: any;
	pageType: string;
}) => {
	const {
		query: { productId: productId },
	} = useRouter();
	console.log(props.productData);
	const pageType = props.pageType;
	const [productData, setProductData] = useState<any>(props.productData);
	const [isUploading, setIsUploading] = useState<Boolean>(false);
	const [refreshFlag, setRefreshFlag] = useState<Boolean>(false);
	const newImageItem: any = {
		id: null,
		page: 'deck',
		category: '',
		order: 0,
		order2: 0,
		product_id: productId,
		url: '',
	};
	const handleFile = async (
		files: FileList | null,
		index: number,
		category: string,
	) => {
		setIsUploading(true);
		if (typeof files == 'undefined' || files == null) {
			return;
		}
		if (files.length == 0) {
			return;
		}
		const file = files[0];
		const fileName = file.name;
		const fileType = file.type;
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			const base64Data: any = reader.result;

			const testData = base64Data.replace(
				base64Data.split('base64,')[0] + 'base64,',
				'',
			);
			fetchModule({
				url: `/api/admin/file-upload`,
				method: 'post',
				body: JSON.stringify({
					fileName,
					fileType,
					base64Data: testData,
					parentPath: `${pageType}/${category}`,
					productId: productId,
					order2: index + 1,
				}),
			}).then((res: any) => {
				const url =
					'https://blcrasno-bucket.s3.ap-northeast-2.amazonaws.com/' +
					res.result.path;
				if (category == 'product') {
					productData.images.products[index].url = url;
					setRefreshFlag(!refreshFlag);
				} else if (category == 'draft') {
					productData.images.drafts[index].url = url;
					setRefreshFlag(!refreshFlag);
				} else if (category == 'model') {
					productData.images.models[index].url = url;
					setRefreshFlag(!refreshFlag);
				}
				setIsUploading(false);
				alert('저장 완료');
			});
		};
	};

	if (!productData) {
		return null;
	}
	return (
		<section className="admin-section">
			{isUploading && <SpinnerCoverage />}
			<div className="card">
				<div className="card-body">
					<div className="section-title">상품 수정</div>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<div className="section-sub-title">상품 관리</div>
					<div className="product-title mb-4">
						<label>상품명</label>
						<TicketComponents.Input
							value={productData.name}
							onChange={(e) => {
								productData.name = e.target.value;
								setRefreshFlag(!refreshFlag);
							}}
						></TicketComponents.Input>
					</div>
					<button
						className="edit-btn"
						onClick={() => {
							setIsUploading(true);
							fetchModule({
								url: `/api/admin/name-edit`,
								method: 'post',
								body: JSON.stringify({
									id: productId,
									name: productData.name,
								}),
							}).then((res: any) => {
								setIsUploading(false);
								alert('저장 완료');
							});
						}}
					>
						저장
					</button>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<div className="section-sub-title">상품 이미지 관리</div>
					<div className="product-title mb-4">
						상품 이미지
						{/* <i
            className="fa-solid fa-circle-plus ml-1 cursor-pointer"
            onClick={() => {
              // setPriceData([
              // 	...priceData,
              // 	{ month: 1, price: 0, real_price: 0 },
              // ]);
            }}
          ></i> */}
					</div>
					{productData.images.products.map(
						(imageItem: any, imageIndex: number) => {
							return (
								<div
									className="banner-item"
									key={`image-item-${imageIndex}-${imageIndex}`}
								>
									<div className="">이미지 {imageIndex + 1}</div>
									<div
										className="thumbnail"
										style={{
											backgroundImage: `url(${imageItem.url})`,
										}}
									></div>
									<div className="upload-area">
										<input
											className="upload-input"
											type="file"
											id="thumbnail-upload"
											onChange={async (event) => {
												handleFile(event.target.files, imageIndex, 'product');
											}}
										/>
										<label className="upload-btn">
											<i className="fa-solid fa-upload"></i>업로드
										</label>
									</div>
								</div>
							);
						},
					)}
					<hr />
					{(pageType == 'steelwork' || pageType == 'stone') && (
						<>
							<div className="product-title mb-4">
								3D 이미지
								{/* <i
            className="fa-solid fa-circle-plus ml-1 cursor-pointer"
            onClick={() => {
                              let newItem = {...pro}
              productData.images.products.push({id:null, page:})
            }}
          ></i> */}
							</div>
							{productData.images.models.map(
								(imageItem: any, imageIndex: number) => {
									return (
										<div
											className="banner-item"
											key={`image-item-${imageIndex}-${imageIndex}`}
										>
											<div className="">이미지 {imageIndex + 1}</div>
											<div
												className="thumbnail"
												style={{
													backgroundImage: `url(${imageItem.url})`,
												}}
											></div>
											<div className="upload-area">
												<input
													className="upload-input"
													type="file"
													id="thumbnail-upload"
													onChange={async (event) => {
														handleFile(event.target.files, imageIndex, 'model');
													}}
												/>
												<label className="upload-btn">
													<i className="fa-solid fa-upload"></i>업로드
												</label>
											</div>
										</div>
									);
								},
							)}
							<hr />
						</>
					)}

					<div className="product-title mb-4">
						도안 이미지
						{/* <i
            className="fa-solid fa-circle-plus ml-1 cursor-pointer"
            onClick={() => {
                              let newItem = {...pro}
              productData.images.products.push({id:null, page:})
            }}
          ></i> */}
					</div>
					{productData.images.drafts.map(
						(imageItem: any, imageIndex: number) => {
							return (
								<div
									className="banner-item"
									key={`image-item-${imageIndex}-${imageIndex}`}
								>
									<div className="">이미지 {imageIndex + 1}</div>
									<div
										className="thumbnail"
										style={{
											backgroundImage: `url(${imageItem.url})`,
										}}
									></div>
									<div className="upload-area">
										<input
											className="upload-input"
											type="file"
											id="thumbnail-upload"
											onChange={async (event) => {
												handleFile(event.target.files, imageIndex, 'draft');
											}}
										/>
										<label className="upload-btn">
											<i className="fa-solid fa-upload"></i>업로드
										</label>
									</div>
								</div>
							);
						},
					)}
				</div>
			</div>
			{pageType == 'deck' && (
				<div className="card">
					<div className="card-body">
						<div className="section-sub-title">
							상품 정보 관리
							{/* <i
            className="fa-solid fa-circle-plus ml-1 cursor-pointer"
            onClick={() => {
              // setPriceData([
              // 	...priceData,
              // 	{ month: 1, price: 0, real_price: 0 },
              // ]);
            }}
          ></i> */}
						</div>
						{productData.productInfos.map(
							(infoItem: any, infoIndex: number) => {
								return (
									<TicketComponents.PriceRow key={infoIndex}>
										<div className="col-4">
											<label>
												이름
												{/* <i
                    className="fa-solid fa-trash title-icon"
                    onClick={() => {
                      productData.productInfos.splice(infoIndex, 1);
                      setRefreshFlag(!refreshFlag);
                    }}
                  ></i> */}
											</label>
											<TicketComponents.Input
												value={infoItem.name}
												onChange={(e) => {
													infoItem.name = e.target.value;
													setRefreshFlag(!refreshFlag);
												}}
											></TicketComponents.Input>
										</div>
										<div className="col-2">
											<label>사용높이</label>
											<TicketComponents.Input
												value={infoItem.height}
												onChange={(e) => {
													infoItem.height = e.target.value;
													setRefreshFlag(!refreshFlag);
												}}
											></TicketComponents.Input>
										</div>
										<div className="col-2">
											<label>재료두께</label>
											<TicketComponents.Input
												value={infoItem.thickness}
												onChange={(e) => {
													infoItem.thickness = e.target.value;
													setRefreshFlag(!refreshFlag);
												}}
											></TicketComponents.Input>
										</div>
										<div className="col-4">
											<label>재료명</label>
											<TicketComponents.Input
												value={infoItem.material}
												onChange={(e) => {
													infoItem.material = e.target.value;
													setRefreshFlag(!refreshFlag);
												}}
											></TicketComponents.Input>
										</div>
									</TicketComponents.PriceRow>
								);
							},
						)}
						<button
							className="edit-btn"
							onClick={() => {
								setIsUploading(true);
								fetchModule({
									url: `/api/admin/info-edit`,
									method: 'post',
									body: JSON.stringify({
										id: productId,
										productInfos: productData.productInfos,
									}),
								}).then((res: any) => {
									setIsUploading(false);
									alert('저장 완료');
								});
							}}
						>
							저장
						</button>
					</div>
				</div>
			)}
		</section>
	);
};

export default ProductDetailComponent;
