import { AdminMenuGroupInterface } from 'data-interface/layout/menu';

export const AdminMenuData: AdminMenuGroupInterface[] = [
	{
		menus: [
			{
				className: 'fa-solid fa-chart-line',
				title: '대쉬보드',
				link: '/admin',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-book',
				title: '모니터링 콘텐츠',
				link: '/admin/content',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-brands fa-google',
				title: '구글 신고',
				link: '/admin/report/google',
			},
			{
				className: 'fa-brands fa-youtube',
				title: '유튜브 신고',
				link: '/admin/report/youtube',
			},
			{
				className: 'fa-brands fa-twitter',
				title: '트위터 신고',
				link: '/admin/report/twitter',
			},
			{
				className: 'fa-brands fa-facebook',
				title: '페이스북 신고',
				link: '/admin/report/facebook',
			},
			{
				className: 'fa-brands fa-instagram',
				title: '인스타그램 신고',
				link: '/admin/report/instagram',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-sitemap',
				title: '도메인 검색',
				link: '/admin/domain/search',
			},
		],
	},
	{
		menus: [
			{
				className: 'fa-solid fa-folder-closed',
				title: '블랙/화이트리스트 검사',
				link: '/admin/bw-list/check',
			},
			{
				className: 'fa-solid fa-folder-closed',
				title: '블랙리스트',
				link: '/admin/bw-list/black',
			},
			{
				className: 'fa-solid fa-address-book',
				title: '블랙리스트 연락처 추가',
				link: '/admin/bw-list/black/contact',
			},
			{
				className: 'fa-solid fa-folder-closed ft-color-muted',
				title: '그레이리스트',
				link: '/admin/bw-list/gray',
			},
			{
				className: 'fa-regular fa-folder-closed',
				title: '화이트리스트',
				link: '/admin/bw-list/white',
			},
		],
	},
];
