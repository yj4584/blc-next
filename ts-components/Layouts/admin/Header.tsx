import React, { useState } from 'react';
import { SideMenuPropsInterface } from 'data-interface/layout/menu';
import {
	AdminHeaderElement,
	SideBarElement,
} from 'styles/styled-components/admin/layouts';
import { AdminMenuData } from 'ts-data-file/admin/layout';
import { useRouter } from 'next/router';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';

const AdminSideMenu = (props: SideMenuPropsInterface) => {
	const router = useRouter();

	return (
		<SideBarElement.Wrapper
			onClick={() => {
				props.closeSideMenu();
			}}
		>
			<SideBarElement.SideMenu.Box
				onClick={(event) => {
					event?.stopPropagation();
				}}
			>
				<SideBarElement.SideMenu.MenuSection>
					UserInfo
				</SideBarElement.SideMenu.MenuSection>
				<SideBarElement.SideMenu.SectionBar />
				<SideBarElement.SideMenu.MenuSection>
					{AdminMenuData.map((AdminMenus, AdminMenuIndex) => {
						return (
							<React.Fragment key={AdminMenuIndex}>
								{AdminMenuIndex == 0 ? null : (
									<SideBarElement.SideMenu.MenuGroupDivide />
								)}
								{AdminMenus.menus.map((menu, menuIndex) => {
									return (
										<SideBarElement.SideMenu.MenuItem
											key={menuIndex}
											onClick={() => {
												props.closeSideMenu();
												router.push(menu.link);
											}}
										>
											<SideBarElement.SideMenu.MenuIcon
												className={
													typeof menu.className == 'undefined'
														? ''
														: menu.className
												}
											/>
											{menu.title}
										</SideBarElement.SideMenu.MenuItem>
									);
								})}
							</React.Fragment>
						);
					})}
				</SideBarElement.SideMenu.MenuSection>
				<SideBarElement.SideMenu.SectionBar />
				<SideBarElement.SideMenu.MenuSection>
					<SideBarElement.SideMenu.MenuItem
						onClick={() => {
							props.closeSideMenu();
							fetchModule(
								{ url: '/api/auth/logout', method: 'get' },
								false,
								false,
							);
							router.push('/auth/login');
						}}
					>
						로그아웃
					</SideBarElement.SideMenu.MenuItem>
				</SideBarElement.SideMenu.MenuSection>
			</SideBarElement.SideMenu.Box>
		</SideBarElement.Wrapper>
	);
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<React.Fragment>
			<AdminHeaderElement.Box>
				<AdminHeaderElement.Logo />
				<AdminHeaderElement.HamburgerMenu
					onClick={() => {
						setIsMenuOpen(true);
					}}
				/>
			</AdminHeaderElement.Box>
			{isMenuOpen == false ? null : (
				<AdminSideMenu
					closeSideMenu={() => {
						setIsMenuOpen(false);
						return null;
					}}
				/>
			)}
		</React.Fragment>
	);
};

export default Header;
