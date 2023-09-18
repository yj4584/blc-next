import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import { TicketComponents } from 'styles/styled-components/ticket/TicketComponents';
import SpinnerCoverage from 'ts-components/common/SpinnerCoverage';

const ProductComponent = (props: { pageData: any; pageType: string }) => {
	const pageNames: { [key: string]: string } = {
		deck: '데크&클립',
		fence: '휀스&브라켓',
		steelwork: '연결철물',
		stone: '주춧돌',
	};
	const router = useRouter();
	const pageType = props.pageType;
	const [pageData, setPageData] = useState<any>(props.pageData);
	const [isUploading, setIsUploading] = useState<Boolean>(false);
	const [refreshFlag, setRefreshFlag] = useState<Boolean>(false);
	const [mounted, setMounted] = useState<Boolean>(false);
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
				url: `/api/file-upload`,
				method: 'post',
				body: JSON.stringify({
					fileName,
					fileType,
					base64Data: testData,
					parentPath: `deck/${category}`,
					order: index + 1,
				}),
			}).then((res: any) => {
				const url =
					'https://blcrasno-bucket.s3.ap-northeast-2.amazonaws.com/' +
					res.result.path;
				if (category == 'intro') {
					let newPageData = { ...pageData };
					newPageData.intro[index].url = url;
					setPageData(pageData);
				} else if (category == 'material') {
					let newPageData = { ...pageData };
					newPageData.materials[index].url = url;
					setPageData(pageData);
				} else if (category == 'product') {
					let newPageData = { ...pageData };
					newPageData.products[index].url = url;
					setPageData(pageData);
				}
				setIsUploading(false);
				alert('저장 완료');
			});
		};
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		setRefreshFlag(!refreshFlag);
	}, [pageData]);

	if (!props || !mounted) return null;

	return (
		<section className="admin-section">
			{isUploading && <SpinnerCoverage />}
			<div className="card">
				<div className="card-body">
					<div className="section-title">{pageNames[pageType]}</div>
				</div>
			</div>
			{(pageType == 'deck' || pageType == 'fence') && (
				<>
					<div className="card">
						<div className="card-body">
							<div className="section-sub-title">대표 이미지 관리</div>
							{pageData.intro.map((bannerItem: any, bannerIndex: number) => {
								return (
									<div
										className="banner-item"
										key={`intro-item-${bannerIndex}`}
									>
										<div className="">이미지 {bannerIndex + 1}</div>
										<div
											className="thumbnail"
											style={{
												backgroundImage: `url(${bannerItem.url})`,
											}}
										></div>
										<div className="upload-area">
											<input
												className="upload-input"
												type="file"
												id="thumbnail-upload"
												onChange={async (event) => {
													handleFile(event.target.files, bannerIndex, 'intro');
												}}
											/>
											<label className="upload-btn">
												<i className="fa-solid fa-upload"></i>업로드
											</label>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="card">
						<div className="card-body">
							<div className="section-sub-title">소재 이미지 관리</div>
							{pageData.materials.map(
								(certificateItem: any, certificateIndex: number) => {
									return (
										<div
											className="banner-item"
											key={`material-item-${certificateIndex}`}
										>
											<div className="">소재 이미지 {certificateIndex + 1}</div>
											<div
												className="thumbnail"
												style={{
													backgroundImage: `url(${certificateItem.url})`,
												}}
											></div>
											<div className="upload-area">
												<input
													className="upload-input"
													type="file"
													id="thumbnail-upload"
													onChange={async (event) => {
														handleFile(
															event.target.files,
															certificateIndex,
															'material',
														);
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
				</>
			)}
			<div className="card">
				<div className="card-body">
					<div className="section-sub-title">상품 관리</div>
					<table className="base-table text-center">
						<tr>
							<th>번호</th>
							<th>상품명</th>
							<th>수정</th>
						</tr>
						{pageData.products.map((productItem: any, productIndex: number) => {
							return (
								<tr
									className="product-item"
									key={`${pageType}-product-item-${productItem.id}`}
								>
									<td>{productIndex + 1}</td>
									<td>{productItem.name}</td>
									<td className="text-center">
										<button
											className="edit-btn d-inline-block"
											onClick={() => {
												router.push(`/admin/${pageType}/${productItem.id}`);
											}}
										>
											수정
										</button>
									</td>
								</tr>
							);
						})}
					</table>
					{/* {pageData.products.map((productItem:any, productIndex:number)=>{
					return <div className="product-item" key={`product-item-${productIndex}`}>
						<div className="product-title">상품 {productIndex+1}</div>
						<div className="product-title">상품명: {productItem.name}</div>
						<button className="edit-btn d-inline-block">수정</button>
				</div>
				})} */}
				</div>
			</div>
		</section>
	);
};

export default ProductComponent;
