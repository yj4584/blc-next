import { MenuItemInterface } from 'data-interface/menu';

const userMenuDatas: MenuItemInterface[] = [
	{
		icon: 'fa-solid fa-user',
		title: '사용자 리스트',
		isOnlyAdmin: true,
		accessTypeIDs: [],
		beforeDivideBar: '사용자 관리',
		beforeDivideBarIcon: 'fa-solid fa-user',
		link: '/user',
		children: [],
	},
];

const customerMenuDatas: MenuItemInterface[] = [
	{
		icon: '',
		title: 'manage_clients',
		accessTypeIDs: [],
		beforeDivideBar: 'manage_clients_users',
		beforeDivideBarIcon: 'fa-solid fa-users',
		link: '/customer',
		children: [],
	},
	{
		icon: '',
		title: 'entire_clients',
		accessTypeIDs: [],
		beforeDivideBarIcon: 'fa-solid fa-users',
		link: '/all-customer',
		children: [],
	},
	{
		icon: '',
		title: '이용권 관리',
		isOnlyAdmin: true,
		accessTypeIDs: [],
		beforeDivideBarIcon: 'fa-solid fa-users',
		link: '/ticket',
		children: [],
	},
];

const resellerAgencyMenuDatas: MenuItemInterface[] = [
	{
		icon: 'fa-solid fa-user',
		title: '총판 리스트',
		isOnlyAdmin: true,
		accessTypeIDs: [],
		beforeDivideBar: '총판 관리(CONIST ONLY)',
		beforeDivideBarIcon: 'fa-solid fa-user',
		link: '/reseller-agency',
		children: [],
	},
];

export const MenuDatas = [
	...customerMenuDatas,
	...resellerAgencyMenuDatas,
	...userMenuDatas,
];
