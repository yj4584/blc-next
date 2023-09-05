import { AdminMenuGroupInterface } from 'data-interface/layout/menu';

export const AdminMenuData: AdminMenuGroupInterface[] = [
	{
		menus: [
			{
				className: 'fa-solid fa-book',
				title: '메인페이지',
				link: '/admin/main',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-brands fa-google',
				title: '데크&클립',
				link: '/admin/product/deck',
			},
			{
				className: 'fa-brands fa-youtube',
				title: '휀스&브라켓',
				link: '/admin/product/fence',
			},
			{
				className: 'fa-brands fa-twitter',
				title: '연결철물',
				link: '/admin/product/steelwork',
			},
			{
				className: 'fa-brands fa-facebook',
				title: '주춧돌',
				link: '/admin/product/stone',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-sitemap',
				title: '공장 및 목재창고',
				link: '/admin/facility',
			},
		],
	},
];
