import React, { useState } from 'react';
import { MenuItemInterface, OpenPathNameInterface } from 'data-interface/menu';
import {
	MenuLinkFunction,
	makeRealLink,
} from 'ts-components/Layouts/default/menuCustom';
import { transText } from 'modules/front/TextModule';

const IconLeftMenu = {
	Admin: () => {
		return (
			<div className="menu-text-div">
				<div className="text-box">
					<div className="text-area">ADMIN</div>
				</div>
			</div>
		);
	},
	Beta: () => {
		return (
			<div className="menu-text-div">
				<div className="text-box">
					<div className="text-area">BETA</div>
				</div>
			</div>
		);
	},
};

const MenuItem = (props: {
	router: any;
	menuItem: MenuItemInterface;
	openMenu: any;
	// userInfo?: any;
	level: number;
	closeMenuFunction: Function;
}) => {
	const [isChildView, setIsChildView] = useState<boolean>(false);
	const menuItemHeight = 45;
	// let isAccessable = false;

	let isOnlyAdminPage = false;
	if (props.menuItem.isOnlyAdmin === true) {
		isOnlyAdminPage = true;
		// 	if (props.userInfo.isAdmin === false) {
		// 		isAccessable = false;
		// 	} else {
		// 		isAccessable = true;
		// 	}
	}
	let isBeta = false;
	if (
		typeof props.menuItem.isBeta == 'boolean' &&
		props.menuItem.isBeta == true
	) {
		isBeta = true;
	}
	function renderMyLine() {
		return (
			<li className={props.level == 1 ? 'top' : ''}>
				{props.menuItem.icon == null || props.menuItem.icon == '' ? (
					<>
						{transText(props.menuItem.title, props.menuItem.title)}
						{isOnlyAdminPage == false ? null : <IconLeftMenu.Admin />}
						{isBeta == false ? null : <IconLeftMenu.Beta />}
					</>
				) : (
					<>
						<i className={'icon ' + props.menuItem.icon}></i>

						<span className="ml-1">
							{transText(props.menuItem.title, props.menuItem.title)}
							{isOnlyAdminPage == false ? null : <IconLeftMenu.Admin />}
							{isBeta == false ? null : <IconLeftMenu.Beta />}
						</span>
					</>
				)}
			</li>
		);
	}

	// if (isAccessable == false) {
	// 	if (isOnlyAdminPage == true) {
	// 		return null;
	// 	}
	// 	return (
	// 		<li className={props.level == 1 ? 'top' : ''}>
	// 			{props.menuItem.icon == null || props.menuItem.icon == '' ? (
	// 				<>
	// 					{/* {viewTransText({ key: props.menuItem.title, defaultText: '' })}{' '} */}
	// 					{props.menuItem.title}{' '}
	// 					<span>
	// 						&nbsp;
	// 						<i className="fas fa-lock" />
	// 					</span>
	// 				</>
	// 			) : (
	// 				<>
	// 					<i className={'icon ' + props.menuItem.icon}></i>
	// 					<span className="ml-1">
	// 						{/* {viewTransText({ key: props.menuItem.title, defaultText: '' })}{' '} */}
	// 						{props.menuItem.title}{' '}
	// 						<span>
	// 							&nbsp;
	// 							<i className="fas fa-lock" />
	// 						</span>
	// 					</span>
	// 				</>
	// 			)}
	// 		</li>
	// 	);
	// }

	let myLink = makeRealLink(props.menuItem.link);
	return (
		<>
			{props.menuItem.children.length == 0 ? (
				myLink == '/' ? (
					renderMyLine()
				) : myLink.indexOf('http://') == 0 ||
				  myLink.indexOf('https://') == 0 ? (
					<a href={myLink} target={'_blank'} rel="noreferrer">
						{renderMyLine()}
					</a>
				) : (
					<>
						<MenuLinkFunction
							href={myLink}
							router={props.router}
							closeMenuFunction={props.closeMenuFunction}
						>
							{renderMyLine()}
						</MenuLinkFunction>
					</>
				)
			) : (
				<>
					<div
						className={
							'sub-menu-div ' + (props.menuItem.isOpen ? 'active' : '')
						}
						onClick={(event) => {
							if (props.menuItem.isOpen == true) {
								props.menuItem.isOpen = false;
							} else {
								props.menuItem.isOpen = true;
							}
							props.openMenu(
								props.menuItem.isOpen,
								props.menuItem.openChildCount,
							);
						}}
					>
						{renderMyLine()}
						<div className="arrow">
							<i className="fas fa-angle-right arrow-item" />
						</div>
					</div>
					<ul
						className={
							'sub-menu-list ' +
							(props.menuItem.isOpen ? 'active' : 'non-active')
						}
						style={{
							maxHeight:
								props.menuItem.isOpen == false
									? 0
									: (props.menuItem.openChildCount
											? props.menuItem.openChildCount
											: 1) *
											menuItemHeight +
									  'px',
						}}
					>
						{props.menuItem.children.map((childMenuItem, index) => {
							return (
								<MenuItem
									key={index}
									router={props.router}
									menuItem={childMenuItem}
									// userInfo={props.userInfo}
									level={props.level + 1}
									closeMenuFunction={props.closeMenuFunction}
									openMenu={(isOpen: boolean, childCount: number) => {
										props.menuItem.openChildCount =
											props.menuItem.children.length + childCount;
										for (let i = 0; i < props.menuItem.children.length; ++i) {
											if (i != index) {
												props.menuItem.children[i].isOpen = false;
												props.menuItem.children[i].openChildCount =
													props.menuItem.children[i].children.length;
												for (
													let j = 0;
													j < props.menuItem.children[i].children.length;
													++j
												) {
													props.menuItem.children[i].children[j].isOpen = false;
												}
											}
										}
										props.openMenu(
											props.menuItem.isOpen,
											props.menuItem.openChildCount,
										);
									}}
								/>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
};

export default MenuItem;
