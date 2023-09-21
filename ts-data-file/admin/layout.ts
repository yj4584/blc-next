import { AdminMenuGroupInterface } from 'data-interface/layout/menu';

export const AdminMenuData: AdminMenuGroupInterface[] = [
	{
		menus: [
			{
				className: 'fa-solid fa-house',
				title: '메인페이지',
				link: '/admin/main',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-book',
				title: '소개페이지',
				link: '/admin/intro',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-paperclip',
				title: '데크&클립',
				link: '/admin/deck',
			},
			{
				className: 'fa-solid fa-xmarks-lines',
				title: '휀스&브라켓',
				link: '/admin/fence',
			},
			{
				className: 'fa-solid fa-link',
				title: '연결철물',
				link: '/admin/steelwork',
			},
			{
				className: 'fa-solid fa-gem',
				title: '주춧돌',
				link: '/admin/stone',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-warehouse',
				title: '공장 및 목재창고',
				link: '/admin/facility',
			},
		],
	},
];
