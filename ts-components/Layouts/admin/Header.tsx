import React, { useState } from 'react';
import {
	AdminHeaderElement,
	SideBarElement,
} from 'styles/styled-components/admin/layouts';
import { AdminMenuData } from 'ts-data-file/admin/layout';
import { useRouter } from 'next/router';
import { fetchModule, fetchSSRModule } from 'modules/front/FetchModule';
import Link from 'next/link';

const AdminSideMenu = () => {
	const router = useRouter();

	return (
		<SideBarElement.SideMenu.Box>
			<SideBarElement.SideMenu.MenuSection>
				관리자페이지
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
										// onClick={() => {
										// 	router.push(menu.link);
										// }}

									>
										<Link href={menu.link}>
										<SideBarElement.SideMenu.MenuIcon
											className={
												typeof menu.className == 'undefined'
													? ''
													: menu.className
											}
										/>
										{menu.title}
										</Link>
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
	);
};

const Header = () => {
	return (
		<React.Fragment>
			{/* <AdminHeaderElement.Box>
				<AdminHeaderElement.Logo />
			</AdminHeaderElement.Box> */}
			<AdminSideMenu />
		</React.Fragment>
	);
};

export default Header;
