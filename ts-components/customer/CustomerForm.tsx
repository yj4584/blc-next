import { useDebouncedEffect } from 'hooks';
import { adjustDay, TimeConverter } from 'modules/common/TimeFunction';
import { fetchModule } from 'modules/front/FetchModule';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useMemo, useRef, Fragment } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import {
	FormButtonDanger,
	FormButtonPrimary,
	FormButtonSecondary,
	FormDivider,
	FormFileDragDrop,
	FormFileListSection,
	FormLabel,
	FormRow,
	FormSubDescription,
	FormSubTitle,
	FormTable,
} from 'styles/styled-components/customer/DetailComponents';
import EmailControl from './EmailControl';
import { getCurrentLangKey, transText } from 'modules/front/TextModule';
import { formatWithMonetaryId } from 'modules/common/CommonFunction';
import { Grid } from 'styles/styled-components/common/BaseComponents';
import ContractComponets from './ContractComponents';

const SubmitModalStyle = {
	Section: styled.section`
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 100000;
	`,
	Text: styled.div`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 600px;
		width: 100%;
		color: #fff;
		font-size: 26px;
	`,
};
function SumbMitModal(props: { viewText: string }) {
	return (
		<SubmitModalStyle.Section>
			<SubmitModalStyle.Text>{props.viewText}</SubmitModalStyle.Text>
		</SubmitModalStyle.Section>
	);
}
interface NewVoucherTemplateInterface {
	nowSelectVoucher?: any;
	count: number;
	month: number;
	price: number;
	real_price: number;
	tax: number;
}
interface PriceItemInterface {
	month: number;
	price: number;
	real_price: number;
}
export type FileListItemType = {
	fileId: number;
	name: string;
	path: string;
	new?: boolean;
};
const CustomerForm = ({ ...props }) => {
	const lang = getCurrentLangKey();
	const { vouchers, forModification, customerApiData, monetaryUnits } = props;
	const router = useRouter();
	const [isViewUsers, setIsViewUsers] = useState(true);
	const [fileList, setFileList] = useState<FileListItemType[]>(() => {
		if (!customerApiData) return []; // 생성폼일때
		return customerApiData.contractFiles.map((f: any) => {
			return {
				fileId: f.id,
				name: f.name,
				path: f.path,
				new: false,
			};
		});
	});
	const defaultUser = JSON.stringify({
		id: null,
		email: '',
	});
	const defaultCustomer = JSON.stringify({
		id: null,
		name: '',
		users: [],
		vouchers: [],
		daily_service_users: [],
	});
	// const [customer, setCustomer] = useState(
	// 	JSON.parse(
	// 		typeof props?.customer?.id == 'undefined' ||
	// 			props?.customer?.id == null ||
	// 			props?.customer?.id == ''
	// 			? defaultCustomer
	// 			: props?.customer?.id ?? '',
	// 	),
	// );
	const [customer, setCustomer] = useState(() => {
		return forModification
			? props.customerApiData
			: JSON.parse(defaultCustomer);
	});

	const [apiLoadingObj, setApiLoadingObj] = useState({
		submit: false,
		nameCheck: false,
		// emailCheck: false,
	});
	const [refreshFlag, setRefreshFlag] = useState(false);
	const [isViewVoucher, setIsViewVoucher] = useState(true);

	const [isViewDailyServiceUsers, setIsViewDailyServiceUsers] = useState(true);
	const defaultDailyServiceUser = JSON.stringify({
		id: null,
		name: '',
		job_title: '',
		email: '',
		phone_number: '',
		company_id: null,
	});
	const oneMonthAfterString: string = (() => {
		const today = new Date();
		today.setMonth(today.getMonth() + 1);

		return adjustDay(new Date(today), -1).toISOString().split('T')[0];
	})();
	const defaultWaitVoucherTemplate = JSON.stringify({
		nowSelectVoucher: null,
		count: 1,
		month: 1,
		price: 0,
		real_price: 0,
		tax: 0,
		memo: '',
		startDate: TimeConverter.timestampToFormat(
			new Date().getTime(),
			'yyyy-MM-dd',
		),
		endDate: oneMonthAfterString,
		currency: 'ko',
	});

	const [submitStateText, setSubmitStateText] = useState('');
	const [newVoucherTemplate, setNewVoucherTemplate] = useState(
		JSON.parse(defaultWaitVoucherTemplate),
	);
	const [waitVouchers, setWaitVouchers] = useState<any[]>([]);
	const [isExpiredVoucherDeleted, setIsExpiredVoucherDeleted] = useState(false);
	const [isIncludeExpiredVouchers, setIsIncludeExpiredVouchers] =
		useState(false);
	const [isViewBuyVouchers, setIsViewBuyVouchers] = useState(true);
	const [sortBy, setSortBy] = useState('latestStart');
	const [isViewCheckCustomerName, setIsViewCheckCustomerName] = useState(false);
	const handlePwReset = async (e: React.MouseEvent, userOrigin?: any) => {
		e.preventDefault();
		const msg = `${transText(
			'info_10',
			'COCODA 계정 "{{value}}" 의 비밀번호 초기화를 진행하시겠습니까?',
		).replace('{{value}}', userOrigin.email)} \n (${transText(
			'reset_pw_2',
			'초기화 비밀번호',
		)}: 123456789a)`;
		if (confirm(msg)) {
			try {
				const res = await fetchModule({
					url: `/api/auth/password?init=1&id=${userOrigin.id}`,
					method: 'PUT',
				});
				alert(res.msg);
			} catch (err) {
				alert(transText('server_error', '서버 에러'));
				console.log(err);
			}
		} else {
			return;
		}
	};

	const fileDragRef = useRef<HTMLLabelElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const voucherSelectRef = useRef<any>(null);
	const renderVoucher = () => {
		const handleVoucherTempAdd: React.MouseEventHandler<HTMLButtonElement> = (
			e,
		) => {
			e.preventDefault();
			if (
				newVoucherTemplate.nowSelectVoucher == null ||
				newVoucherTemplate.nowSelectVoucher.value == 0
			) {
				alert(transText('info_11', '이용권을 선택하세요'));
				return;
			}
			setSelectedVoucherOption(defaultSelectOption);
			setWaitVouchers([
				...waitVouchers,
				JSON.parse(JSON.stringify(newVoucherTemplate)),
			]);

			setTimeout(() => {
				newVoucherTemplate.count = 1;
				newVoucherTemplate.month = 1;
				newVoucherTemplate.startDate;
				newVoucherTemplate.endDate = TimeConverter.timestampToFormat(
					new Date(newVoucherTemplate.startDate).setMonth(
						new Date().getMonth() + newVoucherTemplate.month,
					),
					'yyyy-MM-dd',
				);
				newVoucherTemplate.startDate = JSON.parse(
					defaultWaitVoucherTemplate,
				).startDate;
				newVoucherTemplate.real_price = 0;
				newVoucherTemplate.tax = 0;
				newVoucherTemplate.memo = '';
			}, 0);
		};
		const defaultSelectOption = {
			value: 0,
			label: transText('info_11', '이용권을 선택하세요'),
		};
		const langKeyToMonetaryUnitId = (langkey: 'ko' | 'ja') => {
			const obj = {
				ko: 1,
				ja: 2,
				en: 3,
			};
			return obj[langkey] ?? 1;
		};
		const [selectedVoucherOption, setSelectedVoucherOption] =
			useState(defaultSelectOption);

		const adjustedMonetaryUnits = monetaryUnits.map(({ value, label }: any) => {
			return { label: label === '원' ? '₩' : label, value };
		});
		const [selectedCurrencyOption, setSelectedCurrencyOption] = useState(
			adjustedMonetaryUnits.find(
				({ value }: any) => value == langKeyToMonetaryUnitId(lang),
			),
		);
		useEffect(() => {
			setNewVoucherTemplate((newVoucherTemplate: any) => {
				return {
					...newVoucherTemplate,
					nowSelectVoucher: selectedVoucherOption,
					currency: selectedCurrencyOption.value,
				};
			});
		}, [selectedVoucherOption, selectedCurrencyOption]);
		const [testVal, setTestVal] = useState(0);
		if (!isViewVoucher) {
			return null;
		}

		return (
			<React.Fragment>
				<FormRow>
					<div className="col-4">
						<FormLabel>{transText('select_license', '이용권 선택')}</FormLabel>
						<Select
							instanceId={'select-license'}
							options={[defaultSelectOption, ...vouchers]}
							// defaultValue={selectedVoucherOption}
							value={selectedVoucherOption}
							onChange={(selectedVoucher) => {
								setSelectedVoucherOption(selectedVoucher as any);
								setNewVoucherTemplate((newVoucherTemplate: any) => {
									return {
										...newVoucherTemplate,
										nowSelectVoucher: selectedVoucher,
									};
								});
							}}
						/>
					</div>
					<div className="col-1 form-control-width-fix-sm">
						<FormLabel>{transText('amount', '수량')}</FormLabel>
						<input
							className="form-control text-center"
							type={'number'}
							min={1}
							// defaultValue={newVoucherTemplate.count}
							value={newVoucherTemplate.count}
							onChange={(event) => {
								newVoucherTemplate.count = parseInt(event.target.value);
								setRefreshFlag(!refreshFlag);
							}}
						/>
					</div>
					<div className="col-1 form-control-width-fix-sm">
						<FormLabel>{transText('month', '개월')}</FormLabel>
						<input
							className="form-control text-center"
							type={'number'}
							min={1}
							// defaultValue={newVoucherTemplate.month}
							value={newVoucherTemplate.month}
							onChange={(event) => {
								newVoucherTemplate.month = parseInt(event.target.value);
								newVoucherTemplate.endDate = TimeConverter.timestampToFormat(
									adjustDay(
										new Date(
											new Date(newVoucherTemplate.startDate).setMonth(
												new Date(newVoucherTemplate.startDate).getMonth() +
													newVoucherTemplate.month,
											),
										),
										-1,
									),
									'yyyy-MM-dd',
								);

								setRefreshFlag(!refreshFlag);
							}}
						/>
					</div>
					<div className="col-3">
						<FormLabel>{transText('beginning_date', '시작일')}</FormLabel>
						<input
							className="form-control text-center"
							type={'date'}
							// defaultValue={newVoucherTemplate.startDate}
							value={newVoucherTemplate.startDate}
							onChange={(event) => {
								newVoucherTemplate.startDate = TimeConverter.timestampToFormat(
									event.target.value,
									'yyyy-MM-dd',
								);
								newVoucherTemplate.endDate = TimeConverter.timestampToFormat(
									adjustDay(
										new Date(
											new Date(newVoucherTemplate.startDate).setMonth(
												new Date(event.target.value).getMonth() +
													newVoucherTemplate.month,
											),
										),
										-1,
									),
									'yyyy-MM-dd',
								);
								if (newVoucherTemplate.endDate < newVoucherTemplate.startDate) {
									newVoucherTemplate.endDate = newVoucherTemplate.startDate;
								}
								setRefreshFlag(!refreshFlag);
							}}
						/>
					</div>
					<div className="col-3">
						<FormLabel>{transText('end_date', '종료일')}</FormLabel>
						<input
							className="form-control text-center"
							type={'date'}
							value={newVoucherTemplate.endDate}
							onChange={(event) => {
								newVoucherTemplate.endDate = event.target.value;

								newVoucherTemplate.startDate = TimeConverter.timestampToFormat(
									adjustDay(
										new Date(
											new Date(event.target.value).setMonth(
												new Date(event.target.value).getMonth() -
													newVoucherTemplate.month,
											),
										),
										1,
									),
									'yyyy-MM-dd',
								);

								setRefreshFlag(!refreshFlag);
							}}
						/>
					</div>
					<div className="col-3">
						<FormLabel>{transText('currency_type', '화폐 단위')}</FormLabel>
						<Select
							instanceId={'select-currency-type'}
							options={adjustedMonetaryUnits}
							value={selectedCurrencyOption}
							onChange={(selectOption: any) => {
								setSelectedCurrencyOption(selectOption);
							}}
						/>
					</div>
					<div className="col-3">
						<FormLabel>{transText('original_price', '공급가액')}</FormLabel>
						<input
							value={Number(newVoucherTemplate.real_price).toLocaleString()}
							className="form-control text-right"
							onChange={(e) => {
								const val = e.target.value;
								setNewVoucherTemplate((vt: any) => {
									const newVt = JSON.parse(JSON.stringify(vt));
									newVt.real_price = Number(val.replaceAll(',', ''));
									return newVt;
								});
							}}
						/>
					</div>
					<div className="col-3">
						<FormLabel>{transText('vat', '부가세')}</FormLabel>
						<input
							value={Number(newVoucherTemplate.tax).toLocaleString()}
							className="form-control text-right"
							onChange={(e) => {
								const val = e.target.value;
								setNewVoucherTemplate((vt: any) => {
									const newVt = JSON.parse(JSON.stringify(vt));
									newVt.tax = Number(val.replaceAll(',', ''));
									return newVt;
								});
							}}
						/>
					</div>
					<div className="col-3">
						<FormLabel>{transText('total_price', '합계 금액')}</FormLabel>
						<input
							defaultValue={(
								newVoucherTemplate.real_price + newVoucherTemplate.tax
							)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							className="form-control text-right"
							readOnly
						/>
					</div>
					<div className="col-12">
						<FormLabel>{transText('memo', '메모')}</FormLabel>
						<input
							value={newVoucherTemplate.memo}
							className="form-control"
							onChange={(event) => {
								newVoucherTemplate.memo = event.target.value;
								setRefreshFlag(!refreshFlag);
							}}
						/>
					</div>
				</FormRow>
				<FormButtonSecondary onClick={handleVoucherTempAdd}>
					{transText('add_license', '이용권 추가')}
				</FormButtonSecondary>
				{waitVouchers.length == 0 ? null : (
					<div className="p-1">
						<br />
						<FormSubTitle>
							{transText('added_license', '추가한 이용권')}
						</FormSubTitle>
						{waitVouchers.map((waitVoucher, waitVoucherIndex) => {
							return (
								<Fragment
									key={`${waitVoucher.nowSelectVoucher.label}-${waitVoucherIndex}`}
								>
									<FormRow key={`waitVoucher-${waitVoucherIndex}`}>
										<div className="col-4">
											<FormLabel>
												{transText('license_type', '이용권 유형')}
											</FormLabel>
											<input
												className="form-control text-center"
												type={'text'}
												defaultValue={waitVoucher.nowSelectVoucher.label}
												readOnly
											/>
										</div>
										<div className="col-1 form-control-width-fix-sm">
											<FormLabel>{transText('amount', '수량')}</FormLabel>
											<input
												className="form-control text-center"
												type={'number'}
												defaultValue={waitVoucher.count}
												readOnly
											/>
										</div>
										<div className="col-1 form-control-width-fix-sm">
											<FormLabel>{transText('month', '개월')}</FormLabel>
											<input
												className="form-control text-center"
												type={'number'}
												defaultValue={waitVoucher.month}
												readOnly
											/>
										</div>
										<div className="col-3">
											<FormLabel>
												{transText('beginning_date', '시작일')}
											</FormLabel>
											<input
												className="form-control text-center"
												type={'date'}
												defaultValue={waitVoucher.startDate}
												readOnly
											/>
										</div>
										<div className="col-3">
											<FormLabel>{transText('end_date', '종료일')}</FormLabel>
											<input
												className="form-control text-center"
												type={'date'}
												defaultValue={waitVoucher.endDate}
												readOnly
											/>
										</div>
										<div className="col-3">
											<FormLabel>
												{transText('currency_type', '화폐 단위')}
											</FormLabel>
											<input
												className="form-control text-right"
												value={
													adjustedMonetaryUnits.find(
														({ value }: any) => value == waitVoucher.currency,
													)?.label
												}
												// defaultValue={waitVoucher.price
												// 	.toString()
												// 	.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
												readOnly
											/>
										</div>
										<div className="col-3">
											<FormLabel>
												{transText('original_price', '공급가액')}
												{waitVoucher.price == 0
													? null
													: '(할인:' +
													  Math.round(
															((waitVoucher.price - waitVoucher.real_price) /
																waitVoucher.price) *
																100,
													  ) +
													  '%)'}
											</FormLabel>
											<input
												className="form-control text-right"
												defaultValue={formatWithMonetaryId(
													waitVoucher.real_price,
													selectedCurrencyOption.value,
												)}
												readOnly
											/>
										</div>
										<div className="col-3">
											<FormLabel>{transText('vat', '부가세')}</FormLabel>
											<input
												defaultValue={formatWithMonetaryId(
													waitVoucher.tax,
													selectedCurrencyOption.value,
												)}
												className="form-control text-right"
												readOnly
											/>
										</div>
										<div className="col-3">
											<FormLabel>
												{transText('total_price', '합계 금액')}
											</FormLabel>
											<input
												defaultValue={formatWithMonetaryId(
													waitVoucher.real_price + waitVoucher.tax,
													selectedCurrencyOption.value,
												)}
												className="form-control text-right"
												readOnly
											/>
										</div>
										<div className="col-12">
											<FormLabel>{transText('memo', '메모')}</FormLabel>
											<input
												defaultValue={waitVoucher.memo}
												className="form-control"
												readOnly
											/>
										</div>
										<div
											className="col-12"
											style={{ textAlign: 'right', marginTop: '15px' }}
										>
											<FormButtonDanger
												onClick={() => {
													setWaitVouchers(
														waitVouchers.filter((voucher, voucherIndex) => {
															return voucherIndex !== waitVoucherIndex;
														}),
													);
												}}
											>
												{transText('delete', '삭제')}
											</FormButtonDanger>
										</div>
									</FormRow>
									<br />
								</Fragment>
							);
						})}
					</div>
				)}
			</React.Fragment>
		);
	};

	let expiredVouchers = useMemo(() => {
		return customer.vouchers.filter((voucher: any) => {
			if (voucher.end_at * 1000 < Date.now()) {
				return true;
			}
			return false;
		});
	}, [isExpiredVoucherDeleted]);

	useEffect(() => {
		if (!isIncludeExpiredVouchers) {
			// default: 종료된 이용권은 숨긴다. (체크박스 체크 x)
			let temp = JSON.parse(JSON.stringify(customer));
			temp.vouchers = customer.vouchers.filter((voucher: any) => {
				if (
					expiredVouchers.some(
						(expiredVoucher: any) => expiredVoucher.id == voucher.id,
					)
				) {
					return false;
				}
				return true;
			});
			setCustomer(temp);
		} else {
			// 종료된 이용권 포함해서 볼 때 (체크박스 체크 o)
			let temp = JSON.parse(JSON.stringify(customer));
			temp.vouchers = customer.vouchers.concat(expiredVouchers);
			setCustomer(temp);
		}
	}, [isIncludeExpiredVouchers]);

	useMemo(() => {
		let temp = JSON.parse(JSON.stringify(customer));
		switch (sortBy) {
			case 'latestStart':
				temp.vouchers = customer.vouchers.sort(
					(voucher1: any, voucher2: any) =>
						voucher2.start_at - voucher1.start_at,
				);
				setCustomer(temp);
				break;
			case 'latestEnd':
				temp.vouchers = customer.vouchers.sort(
					(voucher1: any, voucher2: any) => voucher2.end_at - voucher1.end_at,
				);
				setCustomer(temp);
				break;
			case 'oldStart':
				temp.vouchers = customer.vouchers.sort(
					(voucher1: any, voucher2: any) =>
						voucher1.start_at - voucher2.start_at,
				);
				setCustomer(temp);
				break;
			case 'oldEnd':
				temp.vouchers = customer.vouchers.sort(
					(voucher1: any, voucher2: any) => voucher1.end_at - voucher2.end_at,
				);
				setCustomer(temp);
				break;
		}
	}, [sortBy]);
	const [isDuplicatedName, setIsDuplicatedName] = useState(false);
	const [emailsDupCheckArr, setEmailsDupCheckArr] = useState<boolean[]>([]);
	const [emailsFormatCheckArr, setEmailsFormatCheckArr] = useState<boolean[]>(
		[],
	);
	useEffect(() => {
		if (!customer.name) {
			return;
		}
		setApiLoadingObj((obj) => ({ ...obj, nameCheck: true }));
	}, [customer.name]);

	useDebouncedEffect(async () => {
		if (forModification) {
			const apiResult = await fetchModule({
				url: `/api/customer?name=${customer.name}`,
				method: 'GET',
			});
			setApiLoadingObj((obj) => ({ ...obj, nameCheck: false }));
			const apiResultName = apiResult?.result?.user?.name;
			const originalName = customerApiData.name;
			if (!apiResultName || apiResultName == originalName) {
				setIsDuplicatedName(false);
				return;
			}
			setIsDuplicatedName(true);
			return;
		}
		if (customer.name == '') {
			setIsDuplicatedName(false);
			return;
		}
		const apiResult = await fetchModule({
			url: `/api/customer?name=${customer.name}`,
			method: 'GET',
		});
		setApiLoadingObj((obj) => ({ ...obj, nameCheck: false }));
		if (!apiResult.result.user) {
			setIsDuplicatedName(false);
			return;
		}
		setIsDuplicatedName(true);
	}, [customer.name]);

	const emailsDupCheck = (() => {
		if (emailsDupCheckArr.length) {
			return emailsDupCheckArr.reduce((curr, acc) => curr || acc);
		}
		return false;
	})();

	// TODO 고객사 이름 체크 중 스피너
	return (
		<Container>
			<input
				type="hidden"
				name="id"
				defaultValue={customer.id == null ? '' : ''}
			/>
			<div className="name-label-area">
				<FormLabel>{transText('client_name_2', '고객사 이름')}</FormLabel>
				<div className="name-dup-check">
					{isDuplicatedName ? '이미 사용중인 이름입니다.' : ''}
				</div>
			</div>
			<input
				type="text"
				className="form-control"
				onChange={(event: any) => {
					let tempCustomer = JSON.parse(JSON.stringify(customer));
					tempCustomer.name = event.target.value;
					setCustomer(tempCustomer);
				}}
				defaultValue={customer.name}
			/>
			<FormDivider />

			<ContractComponets
				setSubmitStateText={setSubmitStateText}
				fileList={fileList}
				setFileList={setFileList}
			/>
			<FormDivider />

			{isViewCheckCustomerName && (
				<FormSubDescription>
					{transText('info_1', '이미 등록 되어 있는 고객사입니다.')}
				</FormSubDescription>
			)}
			{/* <FormDivider />
			<ContractComponets setSubmitStateText={setSubmitStateText} />
			<FormDivider /> */}
			<FormLabel>
				{isViewUsers == true ? (
					<i
						className="fa-solid fa-chevron-down icon-btn"
						onClick={() => {
							setIsViewUsers(false);
						}}
					/>
				) : (
					<i
						className="fa-solid fa-chevron-right icon-btn"
						onClick={() => {
							setIsViewUsers(true);
						}}
					/>
				)}{' '}
				{`${transText('add_user', '사용자 추가')} (${
					customer.users.length
				}${transText('people_count', '명')}) `}
				<i
					className="fa-solid fa-circle-plus icon-btn"
					onClick={() => {
						if (customer.users.length > 2) {
							alert(
								transText('amount_check_3', '최대 3개까지 등록 가능합니다.'),
							);
							return;
						}
						customer.users.push(JSON.parse(defaultUser));
						setRefreshFlag(!refreshFlag);
					}}
				/>
			</FormLabel>
			{isViewUsers == false ? null : (
				<React.Fragment>
					{customer.users.map((user: any, userIndex: number) => {
						const userOrigin = forModification
							? customerApiData?.users?.find(
									(oriUser: any) => oriUser.id == user.id,
							  )
							: null;
						return (
							<div key={userIndex}>
								<EmailControl
									customer={customer}
									user={user}
									userOrigin={userOrigin}
									// setApiLoadingObj={setApiLoadingObj}
									userIndex={userIndex}
									setRefreshFlag={setRefreshFlag}
									forModification={forModification}
									handlePwReset={(e: any) => handlePwReset(e, userOrigin)}
									// setEmailsDupCheckArr={setEmailsDupCheckArr}
									setEmailsFormatCheckArr={setEmailsFormatCheckArr}
								/>
							</div>
						);
					})}
				</React.Fragment>
			)}
			<FormDivider />
			<FormLabel>
				{isViewVoucher == true ? (
					<i
						className="fa-solid fa-chevron-down icon-btn"
						onClick={() => {
							setIsViewVoucher(false);
						}}
					/>
				) : (
					<i
						className="fa-solid fa-chevron-right icon-btn"
						onClick={() => {
							setIsViewVoucher(true);
						}}
					/>
				)}
				&nbsp;{transText('add_license', '이용권 추가')}
			</FormLabel>
			{renderVoucher()}
			<FormDivider />
			<FormLabel>
				{isViewBuyVouchers == true ? (
					<i
						className="fa-solid fa-chevron-down icon-btn"
						onClick={() => {
							setIsViewBuyVouchers(false);
						}}
					/>
				) : (
					<i
						className="fa-solid fa-chevron-right icon-btn"
						onClick={() => {
							setIsViewBuyVouchers(true);
						}}
					/>
				)}{' '}
				{transText('purchased_license', '구매한 이용권')}
			</FormLabel>
			<div>
				{isViewBuyVouchers == false ? null : (
					<>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div>
								<input
									type="checkbox"
									onChange={(event) => {
										if (event.target.checked) {
											setIsIncludeExpiredVouchers(true);
											return;
										}
										setIsIncludeExpiredVouchers(false);
									}}
								/>{' '}
								{transText('include_invalid_license', '종료 이용권 포함')}
							</div>
							<select
								name="sortBy"
								onChange={(event) => {
									setSortBy(event.target.value);
								}}
							>
								<option value="latestStart">
									{transText(
										'listing_by_faster_beginning_date',
										'시작일 빠른 순',
									)}
								</option>
								<option value="latestEnd">
									{transText('listing_by_faster_end_date', '종료일 빠른 순')}
								</option>
								<option value="oldStart">
									{transText(
										'listing_by_older_beginning_date',
										'시작일 오래된 순',
									)}
								</option>
								<option value="oldEnd">
									{transText('listing_by_older_end_date', '종료일 오래된 순')}
								</option>
							</select>
						</div>

						<FormTable>
							<thead>
								<tr>
									<th>{transText('license', '이용권')}</th>
									<th>{transText('beginning_date', '시작일')}</th>
									<th>{transText('end_date', '종료일')} </th>
									<th>{transText('original_price', '공급가액')}</th>
									<th>{transText('vat', '부가세')}</th>
									<th>{transText('total_price', '합계금액')}</th>
									<th>{transText('memo', '메모')}</th>
									<th>{transText('delete', '삭제')}</th>
								</tr>
							</thead>
							<tbody>
								{customer.vouchers.map((voucher: any, voucherIndex: number) => {
									return voucher.is_delete != 1 ? (
										<tr
											key={`voucher-${voucherIndex}`}
											style={{
												color: expiredVouchers.some(
													(expiredVoucher: any) =>
														expiredVoucher.id == voucher.id,
												)
													? 'rgba(0,0,0,0.3)'
													: 'rgba(0,0,0)',
											}}
										>
											<td>{voucher.voucher_name}</td>
											<td>
												{TimeConverter.timestampToFormat(
													voucher.start_at * 1000,
													'yy.MM.dd',
												)}
											</td>
											<td>
												{TimeConverter.timestampToFormat(
													voucher.end_at * 1000,
													'yy.MM.dd',
												)}
											</td>
											<td>
												{formatWithMonetaryId(
													voucher.price,
													voucher.monetary_unit_id,
												)}
												{/* {voucher.price
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
											</td>
											<td>
												{formatWithMonetaryId(
													voucher.tax,
													voucher.monetary_unit_id,
												)}
											</td>
											<td>
												{formatWithMonetaryId(
													voucher.sum_price,
													voucher.monetary_unit_id,
												)}
											</td>
											<td>
												<span title={voucher.memo}>
													{`${
														voucher.memo != null && voucher.memo != ''
															? voucher.memo.substring(0, 25) + '...'
															: ''
													}`}
												</span>
											</td>
											<td>
												<button
													className="btn btn-sm btn-danger"
													onClick={() => {
														let temp = JSON.parse(JSON.stringify(customer));
														for (let i = 0; i < temp.vouchers.length; i++) {
															if (
																JSON.stringify(temp.vouchers[i]) ==
																JSON.stringify(voucher)
															) {
																temp.vouchers[i].is_delete = 1;
															}
														}
														setIsExpiredVoucherDeleted(
															!isExpiredVoucherDeleted,
														);
														setCustomer(temp);
													}}
												>
													{transText('delete', '삭제')}
												</button>
											</td>
										</tr>
									) : null;
								})}
							</tbody>
						</FormTable>
					</>
				)}
			</div>
			<FormDivider />
			<FormLabel>
				{isViewDailyServiceUsers == true ? (
					<i
						className="fa-solid fa-chevron-down icon-btn"
						onClick={() => {
							setIsViewDailyServiceUsers(false);
						}}
					/>
				) : (
					<i
						className="fa-solid fa-chevron-right icon-btn"
						onClick={() => {
							setIsViewDailyServiceUsers(true);
						}}
					/>
				)}
				{` ${transText(
					'add_daily_service_email',
					'데일리 서비스 수신자 추가',
				)} (${customer.daily_service_users.length}${transText(
					'people_count',
					'명',
				)}) `}
				<i
					className="fa-solid fa-circle-plus icon-btn"
					onClick={() => {
						if (customer.daily_service_users.length > 2) {
							alert(
								transText('amount_check_3', '최대 3개까지 등록 가능합니다.'),
							);
							return;
						}
						customer.daily_service_users.push(
							JSON.parse(defaultDailyServiceUser),
						);
						setRefreshFlag(!refreshFlag);
					}}
				/>
			</FormLabel>
			{isViewDailyServiceUsers == false ? null : (
				<React.Fragment>
					{customer.daily_service_users.map((user: any, userIndex: number) => {
						return (
							<FormRow key={`user-${userIndex}`}>
								<div className="col-12">
									<FormLabel>
										{transText('e-mail', '이메일')}&nbsp;
										<i
											className="fa-solid fa-trash icon-btn"
											onClick={() => {
												let tempUsers: any = [];
												customer.daily_service_users.map(
													(otherUser: any, otherUserIndex: number) => {
														if (otherUserIndex == userIndex) {
															return;
														}
														tempUsers.push(otherUser);
													},
												);
												customer.daily_service_users = tempUsers;
												setRefreshFlag(!refreshFlag);
											}}
										/>
									</FormLabel>
									<input
										className="form-control"
										type="email"
										defaultValue={user.email}
										onChange={(event) => {
											user.email = event.target.value;
											setRefreshFlag(!refreshFlag);
										}}
									/>
								</div>
							</FormRow>
						);
					})}
				</React.Fragment>
			)}
			<FormDivider />
			<form
				className="mt-3"
				onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
					e.preventDefault();
					const adjustedCustomer = JSON.parse(JSON.stringify(customer));
					const copiedUsers = JSON.parse(JSON.stringify(customer.users));
					const adjustedUsers = copiedUsers.filter(({ email }: any) =>
						Boolean(email?.trim()),
					);
					adjustedCustomer.users = adjustedUsers;

					const requestData = JSON.stringify({
						customer: adjustedCustomer,
						waitVouchers,
						fileListInfo: fileList,
					});
					// 수정 일떄
					if (!customer.name?.trim()) {
						alert(transText('info_6', '고객사명을 입력하세요.'));
						return;
					}
					if (isDuplicatedName) {
						alert(transText('info_7', '이미 사용중인 고객사명입니다.'));
						return;
					}
					if (emailsFormatCheckArr.some((b: boolean) => b === true)) {
						alert(transText('info_15', '사용자 아이디를 확인해주세요.'));
						return;
					}
					let confirmResult = true;
					if (waitVouchers.length == 0) {
						if (forModification) {
							confirmResult = confirm(
								`${transText(
									'info_12',
									'추가 된 이용권이 없습니다.',
								)} ${transText('info_13', '정말 수정하시겠습니까?')}`,
							);
							if (!confirmResult) return;
						} else {
							alert(transText('info_12', '추가 된 이용권이 없습니다.'));
							return;
						}
					}
					setApiLoadingObj((obj) => ({ ...obj, submit: true }));
					if (forModification) {
						fetchModule({
							url: `/api/customer/${customer.id}`,
							method: 'PUT',
							body: requestData,
						})
							.then(() => {
								router.push('/customer');
							})
							.catch(() => {
								alert(transText('modification_failed', '수정 실패'));
								alert('수정 실패');
							})
							.finally(() => {
								setApiLoadingObj((obj) => ({ ...obj, submit: false }));
							});
						return;
					}
					// 생성 일떄
					// if (emailsDupCheckArr.some((b: boolean) => b === true)) {
					// 	alert(transText('info_8', '이미 사용중인 사용자 이메일입니다.'));
					// 	return;
					// }
					fetchModule({
						url: `/api/customer`,
						// method: customer.id == null ? 'POST' : 'PUT',
						method: 'POST',
						body: requestData,
					})
						.then(() => {
							router.push('/customer');
						})
						.catch(() => alert('Fail'))
						.finally(() => {
							setApiLoadingObj((obj) => ({ ...obj, submit: false }));
						});
				}}
			>
				{/* {customer.id == null ? null : (
					<input name="_method" type="hidden" value="PUT" readOnly></input>
				)} */}
				{/* <textarea
					name="json-data"
					value={JSON.stringify({ customer, waitVouchers })}
					readOnly
					hidden
				/> */}

				<FormButtonPrimary
					disabled={
						Object.values(apiLoadingObj).reduce((curr, acc) => curr || acc) ||
						isDuplicatedName
							? // || emailsDupCheck
							  true
							: false
					}
					type="submit"
					onClick={() => {
						let temp = JSON.parse(JSON.stringify(customer));
						expiredVouchers.map((expiredVoucher: any) => {
							if (
								temp.vouchers.some(
									(voucher: any) =>
										voucher.id != expiredVoucher.id &&
										expiredVoucher.is_delete == 1,
								)
							) {
								temp.vouchers.push(expiredVoucher);
							}
						});
						setCustomer(temp);
					}}
				>
					{transText('send', '전송')}
				</FormButtonPrimary>
			</form>
			{submitStateText == '' ? null : (
				<SumbMitModal viewText={submitStateText} />
			)}
		</Container>
	);
};

export default CustomerForm;

const Container = styled.div`
	i {
		cursor: pointer;
		&.icon-btn:hover {
			color: #4b4b4b;
		}
	}
	.name-label-area {
		display: flex;
		gap: 10px;
		align-items: center;
		/* background-color: coral; */
		.name-dup-check {
			font-size: 14px;
			font-weight: bold;
			/* background-color: blue; */
			color: red;
		}
	}
`;
