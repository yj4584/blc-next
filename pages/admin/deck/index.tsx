import { fetchModule, fetchSSRModule } from "modules/front/FetchModule";
import { GetServerSideProps } from "next";
import { use, useState } from "react";
import SpinnerCoverage from "ts-components/common/SpinnerCoverage";

export const getServerSideProps: GetServerSideProps = async (context) => {
	let apiUrl = `${process.env.SERVER_HOST_URL}/api/admin/deck`;
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
		props
	};
};

export default function DeckIndex(props:any) {
	const [pageData, setPageData] = useState<any>(props);
	const [isUploading, setIsUploading] = useState<Boolean>(false);
	const handleFile = async (files: FileList | null, index: number, category:string) => {
		setIsUploading(true);
		if (typeof files == "undefined" || files == null) {
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
			base64Data.split("base64,")[0] + "base64,",
			""
		  );
		  fetchModule({
			url: `/api/file-upload`,
			method: "post",
			body: JSON.stringify({
			  fileName,
			  fileType,
			  base64Data: testData,
			  parentPath: `deck/${category}`,
			  order: index+1,
			}),
		  }).then((res: any) => {
			const url = "https://blcrasno-bucket.s3.ap-northeast-2.amazonaws.com/" + res.result.path;
			if (category == "intro"){
				let newPageData = {...pageData}
				newPageData.intro[index].url = url;
				setPageData(pageData);
			} else if (category == "materials") {
				let newPageData = {...pageData}
				newPageData.materials[index].url = url;
				setPageData(pageData);
			} else if (category == "products") {
				let newPageData = {...pageData}
				newPageData.products[index].url = url;
				setPageData(pageData);
			} 
			setIsUploading(false);
		  });
		};
	  };

	return <section className="admin-section">
		{isUploading && <SpinnerCoverage />}
		<div className="card">
			<div className="card-body">
				<div className="section-title">데크&클립</div>
			</div>
		</div>
		<div className="card">
			<div className="card-body">
				<div className="section-sub-title">대표 이미지 관리</div>
				{pageData.intro.map((bannerItem:any, bannerIndex:number)=>{
					return <div className="banner-item" key={`intro-item-${bannerIndex}`}>
					<div className="">이미지 {bannerIndex+1}</div>
					<div
						className="thumbnail"
                  		style={{
                    		backgroundImage: `url(${bannerItem.url})`,
                  			}}>
                	</div>
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
				})}
			</div>
		</div>
			<div className="card">
				<div className="card-body">
				<div className="section-sub-title">소재 이미지 관리</div>
				{pageData.materials.map((certificateItem:any, certificateIndex:number)=>{
					return <div className="banner-item" key={`material-item-${certificateIndex}`}>
					<div className="">소재 이미지 {certificateIndex+1}</div>
					<div
						className="thumbnail"
                  		style={{
                    		backgroundImage: `url(${certificateItem.url})`,
                  			}}>
                	</div>
					<div className="upload-area">
					<input
						className="upload-input"
						type="file"
						id="thumbnail-upload"
						onChange={async (event) => {
						handleFile(event.target.files, certificateIndex, 'material');
						}}
					/>
					<label className="upload-btn">
						<i className="fa-solid fa-upload"></i>업로드
					</label>
					</div>
				</div>
				})}
			</div>
			</div>
			<div className="card">
				<div className="card-body">
				<div className="section-sub-title">상품 관리</div>
				{pageData.products.map((productItem:any, productIndex:number)=>{
					return <div className="product-item" key={`product-item-${productIndex}`}>
						<div className="product-title">상품 {productIndex+1}</div>
						{productItem.products.map((imageItem:string, imageIndex:number)=>{
							return <div className="banner-item" key={`image-item-${productIndex}-${imageIndex}`}>
								<div className="">이미지 {imageIndex+1}</div>
								<div
									className="thumbnail"
									style={{
										backgroundImage: `url(${imageItem})`,
										}}>
								</div>
								<div className="upload-area">
									<input
										className="upload-input"
										type="file"
										id="thumbnail-upload"
										onChange={async (event) => {
										handleFile(event.target.files, productIndex, 'product');
										}}
									/>
									<label className="upload-btn">
										<i className="fa-solid fa-upload"></i>업로드
									</label>
									</div>
								</div>
						})}
					
				
				</div>
				})}
			</div>
		</div>
	</section>;
}
