import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import SpinnerCoverage from 'ts-components/common/SpinnerCoverage';

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
	};
};

export default function FacilityIndex(props: any) {
	const [images, setImages] = useState<any>(props.images);
	const [isUploading, setIsUploading] = useState<Boolean>(false);
	const [refreshFlag, setRefreshFlag] = useState<Boolean>(false);
	const handleFile = async (files: FileList | null, index: number) => {
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
					parentPath: `facility`,
					order: index + 1,
				}),
			}).then((res: any) => {
				const url =
					'https://blcrasno-bucket.s3.ap-northeast-2.amazonaws.com/' +
					res.result.path;
				images[index].url = url;
				setRefreshFlag(!refreshFlag);
				setIsUploading(false);
			});
		};
	};

	return (
		<section className="admin-section">
			{isUploading && <SpinnerCoverage />}
			<div className="card">
				<div className="card-body">
					<div className="section-title">공장 및 목재창고</div>
				</div>
			</div>
			<div className="card">
				<div className="card-body">
					<div className="section-sub-title">이미지 관리</div>
					{images.map((imageItem: any, imageIndex: number) => {
						return (
							<div className="banner-item" key={`image-item-${imageIndex}`}>
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
											handleFile(event.target.files, imageIndex);
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
		</section>
	);
}
