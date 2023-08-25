import { fetchModule } from 'modules/front/FetchModule';
import { transText } from 'modules/front/TextModule';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Grid } from 'styles/styled-components/common/BaseComponents';
import {
	FormFileDragDrop,
	FormFileListSection,
	FormLabel,
} from 'styles/styled-components/customer/DetailComponents';

import { FileListItemType } from './CustomerForm';

const ContractComponets = (props: {
	setSubmitStateText: any;
	fileList: FileListItemType[];
	setFileList: React.Dispatch<React.SetStateAction<FileListItemType[]>>;
}) => {
	// const [submitStateText, setSubmitStateText] = useState('');
	const { fileList, setFileList } = props;
	// const [fileList, setFileList] = useState<any[]>([]);
	const [refreshFlag, setRefreshFlag] = useState(false);
	const [isDraggingIn, setIsDraggingIn] = useState(false);
	const {
		query: { id: customerId },
	} = useRouter();
	const handleDragEnter: React.DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingIn(true);
	};
	const handleDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingIn(true);
	};

	const handleDragLeave: React.DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingIn(false);
	};
	const handleDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDraggingIn(false);

		let draggedData = e.dataTransfer;
		let files = draggedData.files;
		handleFiles(files);
	};

	const handleFiles = async (files: FileList | null) => {
		if (typeof files == 'undefined' || files == null) {
			return;
		}
		if (files.length == 0) {
			return;
		}
		let fileInfos = [];

		let BYTES_PER_CHUNK =
			1048576 *
			(typeof process.env.UPLOAD_MAX_MB_SIZE == 'undefined'
				? 0.7
				: Number(process.env.UPLOAD_MAX_MB_SIZE));

		let chunkSize = BYTES_PER_CHUNK * 1;
		let insertTime = new Date().getTime();

		let isPdf = true;

		for (let i = 0; i < files.length; i++) {
			let newFile = files[i];
			if (!newFile.type.includes('pdf')) {
				isPdf = false;
				break;
			}
			let fileInfo = {
				fileData: newFile,
				size: newFile.size,
				name: newFile.name,
			};

			fileInfos.push(fileInfo);
		}
		if (!isPdf) {
			alert(transText('info_3', 'PDF 파일만 업로드 가능합니다.'));
			return;
		}
		const msgForfileUploading = transText('info_16', '파일 업로드 중');
		for (let i = 0; i < fileInfos.length; ++i) {
			let fileInfo = fileInfos[i];
			let chunkStart = 0;
			while (chunkStart < fileInfo.size) {
				let uploadFileChunk = fileInfo.fileData.slice(
					chunkStart,
					chunkStart + chunkSize,
				);
				props.setSubmitStateText(
					`${msgForfileUploading} ${(
						(i / fileInfos.length +
							((1 / fileInfos.length) * chunkStart) / fileInfo.size) *
						100
					).toFixed(1)}%`,
				);
				const formData = new FormData();
				let isEnd = chunkStart + chunkSize >= fileInfo.size ? '1' : '0';

				const formDataEntries = [
					['fileSize', fileInfo.size.toString()],
					['fileName', fileInfo.name.toString()],
					['insertTime', insertTime.toString()],
					['file', uploadFileChunk],
					['isEnd', isEnd],
					['customerId', String(customerId)],
				];
				formDataEntries.forEach(([key, val]: any) => {
					formData.append(key, val);
				});

				await fetchModule({
					url: `/api/customer/upload-file`,
					method: 'PUT',
					headers: {
						Accept:
							'application/json, application/xml, text/plain, text/html, *.*',
					},
					body: formData,
				}).then((data) => {
					if (data.result.success == false) {
						alert(data.result.msg);
						return;
					}
					if (isEnd == '1') {
						setFileList((fl: any) => [
							...fl,
							{
								name: fileInfo.name,
								fileId: data.result.fileId,
								path: data.result.filePath,
								new: true,
							},
						]);
						props.setSubmitStateText('');
					}
				});

				setRefreshFlag(!refreshFlag);
				chunkStart += chunkSize;
			}
		}
	};

	const handleDeleteFile = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		fileId: number,
		fileName: string,
	) => {
		// file_delete_confirm
		const msg = transText('file_delete_confirm', '파일을 삭제하시겠습니까?');
		if (!confirm(`'${fileName}' ${msg}`)) return;

		const result = await fetchModule({
			url: `/api/customer/delete-file?fileId=${fileId}`,
			method: 'DELETE',
		});
		if (!(result.code == 200)) {
			alert('file delete failed');
		}
		setFileList((fl) => fl.filter((file) => file.fileId != fileId));
	};

	return (
		<Grid.GridContainer>
			<Grid.GridByDevice
				defaultColumnCount={2}
				conditionalColumnCount={2}
				conditionalDeviceSize="deviceXLLess"
			>
				<FormLabel>{transText('upload_contract', '계약서 업로드')}</FormLabel>
				<FormFileDragDrop>
					<input
						type="file"
						id="contract-file-upload"
						multiple
						accept=".pdf"
						style={{ display: 'none' }}
						onChange={async (event) => {
							handleFiles(event.target.files);
						}}
					/>
					<label
						className={`dragging-${isDraggingIn}`}
						htmlFor="contract-file-upload"
						onDragEnter={handleDragEnter}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<div className={`dragging-${isDraggingIn}`}>
							<i className="fa-solid fa-file-arrow-up" />
						</div>
						{/* info_2 */}
						<p>{transText('info_2', '업로드 할 파일을 드래그 하세요.')}</p>
						<p>{transText('info_3', 'PDF 유형만 업로드가 가능합니다.')}</p>
					</label>
				</FormFileDragDrop>
			</Grid.GridByDevice>
			<Grid.GridByDevice
				defaultColumnCount={2}
				conditionalColumnCount={2}
				conditionalDeviceSize="deviceXLLess"
			>
				<FormLabel>{transText('uploaded_file', '업로드 된 파일')}</FormLabel>
				<FormFileListSection>
					<div
						className={`file-list-container${
							fileList.length < 1 ? ' center' : ''
						}`}
					>
						{fileList.length < 1 ? (
							<p className="no-uploaded-file-msg">
								{transText('info_17', '업로드 된 파일이 없습니다.')}
							</p>
						) : (
							fileList.map((fileItem, filePathIndex) => {
								return (
									<div
										key={`contract-file-${filePathIndex}`}
										className="uploaded-file-item"
									>
										<a href={`${fileItem.path}`} download={fileItem.name}>
											<i className="fa-regular fa-file-pdf" />
											<div>{fileItem.name}</div>
										</a>
										<button
											className="delete-btn"
											onClick={(e) => {
												handleDeleteFile(e, fileItem.fileId, fileItem.name);
											}}
										>
											<i className="fa-solid fa-x"></i>
										</button>
									</div>
								);
							})
						)}
					</div>
				</FormFileListSection>
			</Grid.GridByDevice>
		</Grid.GridContainer>
	);
};

export default ContractComponets;
