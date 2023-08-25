import { fetchModule } from 'modules/front/FetchModule';
import { TicketComponents } from 'styles/styled-components/ticket/TicketComponents';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export const TicketForm = (props: {
	ticketData?: any;
	accessTypeData: any;
}) => {
	const router = useRouter();
	let currentPageInfo = router.asPath.includes('/create') ? 'create' : 'ticket';
	const [nameText, setNameText] = useState<string>(
		props.ticketData ? props.ticketData.name : '',
	);
	const [accessTypes, setAccessTypes] = useState<any[]>(
		props.ticketData ? props.ticketData.contentWeeklyReportAccessTypes : [],
	);
	const [isExpand, setIsExpand] = useState<boolean>(false);
	const selectRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [selectTypes, setSelectTypes] = useState<any[]>([]);

	const [priceData, setPriceData] = useState<any[]>(
		props.ticketData ? props.ticketData.contentWeeklyReportVoucherPrices : [],
	);
	useEffect(() => {
		const handleOutsideClose = (e: { target: any }) => {
			if (!selectRef.current?.contains(e.target)) {
				setIsExpand(false);
			}
		};
		document.addEventListener('click', handleOutsideClose);
		return () => document.removeEventListener('click', handleOutsideClose);
	}, []);

	useEffect(() => {
		let curSelectTypes = props.accessTypeData.filter((item: { id: any }) => {
			return !accessTypes.some((other) => other.id === item.id);
		});
		setSelectTypes([...curSelectTypes]);
	}, [accessTypes]);

	const handleClickDeleteAccessType = (index: number, item: any) => {
		let curData = accessTypes;
		curData.splice(index, 1);
		setAccessTypes([...curData]);
	};

	const handleChangeSearch = (inputText: string) => {
		let curSelectTypes = props.accessTypeData.filter((item: { id: any }) => {
			return !accessTypes.some((other) => other.id === item.id);
		});
		curSelectTypes = curSelectTypes.filter((item: { name: string }) =>
			item.name.includes(inputText),
		);
		setSelectTypes([...curSelectTypes]);
		setSearchText(inputText);
	};

	const handleClickSelectItem = (index: number) => {
		let curData = accessTypes;
		curData.push(selectTypes[index]);
		setAccessTypes([...curData]);
	};

	const handleRateChange = (priceIndex: number, rate: string) => {
		let rateNum = Number(rate);
		let curData = priceData;
		curData[priceIndex].real_price =
			(priceData[priceIndex].price * (100 - rateNum)) / 100;
		setPriceData([...curData]);
	};
	let isDisabled = false;
	const handleClickSubmit = async () => {
		if (isDisabled) return;
		isDisabled = true;
		let apiUrl = `/api/ticket/${currentPageInfo}`;
		let submitData = {
			voucherId: props.ticketData ? props.ticketData.id : null,
			name: nameText,
			accessTypes: accessTypes,
			priceData: priceData,
		};
		if (!submitData.name) {
			alert('이용권 이름 미입력');
			return;
		}
		if (!submitData.accessTypes.length) {
			alert('권한 타입 미입력');
			return;
		}
		const apiData = await fetchModule({
			url: apiUrl,
			method: 'POST',
			body: JSON.stringify(submitData),
		}).then(() => router.replace(`/ticket`));
		setTimeout(() => (isDisabled = false), 1000);
	};
	return (
		<>
			<TicketComponents.InfoSection>
				<TicketComponents.InfoArea>
					<TicketComponents.AreaTitle>이용권 이름</TicketComponents.AreaTitle>
					<TicketComponents.Input
						value={nameText}
						onChange={(e) => {
							setNameText(e.target.value);
						}}
					></TicketComponents.Input>
				</TicketComponents.InfoArea>
				<TicketComponents.InfoArea>
					<TicketComponents.AreaTitle>권한</TicketComponents.AreaTitle>
					<TicketComponents.Select
						onClick={() => {
							searchInputRef.current?.focus();
							setIsExpand(!isExpand);
						}}
						ref={selectRef}
					>
						<div className="display-area">
							<div className="items">
								{accessTypes.map((accessType: any, accessTypeIndex: number) => {
									return (
										<div className="item" key={accessTypeIndex}>
											<div className="item-content">{accessType.name}</div>
											<div className="item-button">
												<i
													className="fa-solid fa-xmark"
													onClick={() => {
														handleClickDeleteAccessType(
															accessTypeIndex,
															accessType,
														);
													}}
												></i>
											</div>
										</div>
									);
								})}
							</div>
							<div className="search-wrap">
								<input
									className="search"
									placeholder="권한을 선택하세요."
									ref={searchInputRef}
									value={searchText}
									onChange={(e) => {
										handleChangeSearch(e.target.value);
									}}
								></input>
							</div>
							<div className="buttons">
								<div className="button">
									<i
										className="fa-solid fa-xmark"
										onClick={() => {
											setAccessTypes([]);
										}}
									></i>
								</div>
								<span className="seperator"></span>
								<div className="button">
									<i className="fa-solid fa-chevron-down"></i>
								</div>
							</div>
						</div>
						{isExpand && (
							<div className="select-area">
								{selectTypes.map((accessType: any, accessTypeIndex: number) => {
									return (
										<div
											className="select-item"
											key={accessTypeIndex}
											onClick={() => {
												handleClickSelectItem(accessTypeIndex);
											}}
										>
											{accessType.name}
										</div>
									);
								})}
							</div>
						)}
					</TicketComponents.Select>
				</TicketComponents.InfoArea>
			</TicketComponents.InfoSection>
			<TicketComponents.InfoSection>
				<TicketComponents.InfoArea>
					<TicketComponents.AreaTitle>
						가격
						<i
							className="fa-solid fa-circle-plus title-icon"
							onClick={() => {
								setPriceData([
									...priceData,
									{ month: 1, price: 0, real_price: 0 },
								]);
							}}
						></i>
					</TicketComponents.AreaTitle>
					{priceData.map((price: any, priceIndex: number) => {
						return (
							<TicketComponents.PriceRow key={priceIndex}>
								<div className="col-2">
									<label>
										개월
										<i
											className="fa-solid fa-trash title-icon"
											onClick={() => {
												let curData = priceData;
												curData.splice(priceIndex, 1);
												setPriceData([...curData]);
											}}
										></i>
									</label>
									<TicketComponents.Input
										type="number"
										min={1}
										value={price.month}
										onChange={(e) => {
											let curData = priceData;
											curData[priceIndex].month = e.target.value;
											setPriceData([...curData]);
										}}
									></TicketComponents.Input>
								</div>
								<div className="col-4">
									<label>부가세 제외 가격 (할인전)</label>
									<TicketComponents.Input
										value={price.price.toLocaleString()}
										onChange={(e) => {
											let curData = priceData;
											curData[priceIndex].price = e.target.value;
											setPriceData([...curData]);
										}}
									></TicketComponents.Input>
								</div>
								<div className="col-4">
									<label>실제 부가세 제외 가격</label>
									<TicketComponents.Input
										value={price.real_price.toLocaleString()}
										onChange={(e) => {
											let curData = priceData;
											curData[priceIndex].real_price = e.target.value;
											setPriceData([...curData]);
										}}
									></TicketComponents.Input>
								</div>
								<div className="col-2">
									<label>할인율</label>
									<input
										className="rate-input"
										value={
											price.price == 0
												? 0
												: ((price.price - price.real_price) / price.price) * 100
										}
										onChange={(e) => {
											handleRateChange(priceIndex, e.target.value);
										}}
									></input>
									%
								</div>
							</TicketComponents.PriceRow>
						);
					})}
				</TicketComponents.InfoArea>
			</TicketComponents.InfoSection>
			<TicketComponents.SubmitButton
				onClick={() => {
					handleClickSubmit();
				}}
			>
				전송
			</TicketComponents.SubmitButton>
		</>
	);
};
