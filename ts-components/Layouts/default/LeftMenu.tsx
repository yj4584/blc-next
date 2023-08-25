import { CustomerLayoutElement } from 'styles/styled-components/layouts/default-layout';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuItemInterface, OpenPathNameInterface } from 'data-interface/menu';
import MenuItem from 'ts-components/Layouts/default/MenuItem';
import { LeftMenuTopSection } from './menuCustom';
import { transText } from 'modules/front/TextModule';
import useTypedSelector from 'redux-components/useTypedSelector';

function LeftMenu(props: {
	isMobileSideMenuOpen: boolean;
	layoutGradation: { start: string; end: string };
	hideMobileMenu: Function;
	nowMenuDatas: MenuItemInterface[] | null;
}) {
	const router = useRouter();
	const [isRefresh, setIsRefresh] = useState<boolean>(false);
	let level = 0;
	const userInfo = useTypedSelector((state) => state.user);
	function renderInner() {
		if (props.nowMenuDatas == null) {
			return null;
		}
		return (
			<CustomerLayoutElement.LeftMenu.MenuUl>
				<LeftMenuTopSection />
				{props.nowMenuDatas
					// admin 이 아닌경우 사용하지 않는 menu의 대분리도 안보이도록 필터 처리
					.filter((nowMenuData: MenuItemInterface) => {
						if (
							userInfo.isAdmin === false &&
							nowMenuData.isOnlyAdmin === true
						) {
							return false;
						}
						return true;
					})
					.map((nowMenuData: MenuItemInterface, index: number) => {
						return (
							<React.Fragment key={index}>
								{typeof nowMenuData.beforeDivideBar == 'undefined' ||
								nowMenuData.beforeDivideBar == null ? null : (
									<CustomerLayoutElement.LeftMenu.MenuDevide>
										{nowMenuData.beforeDivideBar == '' ? null : (
											<div className="content">
												{typeof nowMenuData.beforeDivideBarIcon == 'string' &&
												nowMenuData.beforeDivideBarIcon != '' ? (
													<i
														className={`${nowMenuData.beforeDivideBarIcon} mr-1`}
													/>
												) : null}
												{transText(
													nowMenuData.beforeDivideBar,
													nowMenuData.beforeDivideBar,
												)}
											</div>
										)}
									</CustomerLayoutElement.LeftMenu.MenuDevide>
								)}
								<MenuItem
									router={router}
									closeMenuFunction={props.hideMobileMenu}
									menuItem={nowMenuData}
									// userInfo={userInfo}
									level={level + 1}
									openMenu={(openIndex: number, childCount: number) => {
										if (props.nowMenuDatas == null) {
											return;
										}
										for (let i = 0; i < props.nowMenuDatas.length; ++i) {
											if (i != index) {
												props.nowMenuDatas[i].isOpen = false;
												props.nowMenuDatas[i].openChildCount =
													props.nowMenuDatas[i].children.length;
												for (
													let j = 0;
													j < props.nowMenuDatas[i].children.length;
													++j
												) {
													props.nowMenuDatas[i].children[j].isOpen = false;
												}
											}
										}
										setIsRefresh(!isRefresh);
									}}
								/>
							</React.Fragment>
						);
					})}
			</CustomerLayoutElement.LeftMenu.MenuUl>
		);
	}
	return (
		<CustomerLayoutElement.LeftMenu.Section
			className={props.isMobileSideMenuOpen == false ? '' : 'mobile-view'}
			style={{
				background: `radial-gradient(at 20% -20%, ${props.layoutGradation.start}, ${props.layoutGradation.end}) fixed`,
			}}
		>
			{renderInner()}
		</CustomerLayoutElement.LeftMenu.Section>
	);
}
export default LeftMenu;
