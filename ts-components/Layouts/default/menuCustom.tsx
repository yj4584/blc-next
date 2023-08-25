import React from 'react';
import { MenuItemInterface, OpenPathNameInterface } from 'data-interface/menu';
import { MenuDatas } from 'ts-data-file/menu/MenuDatas';
import { ReactNode } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setLangCode } from 'redux-components/reducers/langData';
import { SideBarElement } from 'styles/styled-components/layouts/default-layout';
import { transText } from 'modules/front/TextModule';
import useTypedSelector from 'redux-components/useTypedSelector';

export function LeftMenuTopSection() {
	const dispatch = useDispatch();

	const langTypes = [
		{ code: 'ko', text: '한국어' },
		{ code: 'en', text: 'English' },
		{ code: 'ja', text: '日本語' },
	];

	const userInfo = useTypedSelector((state) => state.user);
	return (
		<>
			<>
				<SideBarElement.SideMenu.MenuItem>
					<SideBarElement.SideMenu.LangSelect
						value={transText('lang_check', 'ko')}
						onChange={(event) => {
							let myLangCode = event.target.value;
							if (['ko', 'en', 'ja'].includes(myLangCode) == false) {
								return;
							}
							document.cookie = `cocoda-sale-admin-lang-code=${myLangCode}; path=/`;
							dispatch(
								setLangCode({
									langCode: myLangCode,
								}),
							);
							Router.reload();
						}}
					>
						{langTypes.map((langType, index) => {
							return (
								<option key={index} value={langType.code}>
									{langType.text}
								</option>
							);
						})}
					</SideBarElement.SideMenu.LangSelect>
				</SideBarElement.SideMenu.MenuItem>
			</>
		</>
	);
}

export const customMenuKeys = {
	userInfoAccessCheck: 'accessTypes', //userInfo에서 access check하는 변수명
};

export function MenuLinkFunction(props: {
	href: string;
	children: ReactNode;
	router?: any;
	closeMenuFunction?: Function;
}) {
	//버전 별로 링크 사용법이 상이해서 이용
	if (
		typeof props.router != 'undefined' &&
		typeof props.closeMenuFunction != 'undefined'
	) {
		return (
			<Link
				href={props.href}
				onClick={(event) => {
					props.router.push(props.href);
					if (typeof props.closeMenuFunction != 'undefined') {
						props.closeMenuFunction();
					}
					event.stopPropagation();
					event.preventDefault();
				}}
			>
				{props.children}
			</Link>
		);
	}
	return <Link href={props.href}>{props.children}</Link>;
}

function recursioncheckMenuData(
	myMenuData: MenuItemInterface,
	router: any,
	otherDatas: any,
) {
	myMenuData.isOpen = false;
	myMenuData.myChildCount = myMenuData.children.length;
	myMenuData.openChildCount = myMenuData.children.length;

	for (let i = 0; i < myMenuData.children.length; ++i) {
		let result = recursioncheckMenuData(
			myMenuData.children[i],
			router,
			otherDatas,
		);
		if (result.isOpen == true) {
			myMenuData.isOpen = true;
			myMenuData.openChildCount += result.openChildCount;
		}
	}
	if (typeof myMenuData.openPathNames != 'undefined') {
		for (let i = 0; i < myMenuData.openPathNames.length; ++i) {
			if (
				myMenuData.openPathNames[i].pathName == router.pathname ||
				myMenuData.openPathNames[i].pathName == router.asPath
			) {
				myMenuData.isOpen = true;
			}
		}
	}
	return {
		isOpen: myMenuData.isOpen,
		openChildCount: myMenuData.openChildCount,
	};
}

export function setMenuDatas(props: {
	setNowMenuDatas: Function;
	router: any;
	otherDatas?: any;
}) {
	let tempMenuDatas2: any = [...MenuDatas];

	let tempMenuDatas = JSON.parse(JSON.stringify(tempMenuDatas2));
	for (let i = 0; i < tempMenuDatas.length; ++i) {
		recursioncheckMenuData(tempMenuDatas[i], props.router, props.otherDatas);
	}
	props.setNowMenuDatas(tempMenuDatas);
}

export function makeRealLink(link: string) {
	let myLink = link;
	return myLink;
}
