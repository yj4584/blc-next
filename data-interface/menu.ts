export interface OpenPathNameInterface {
	pathName: string;
	langKeys: string[];
}
export interface MenuItemInterface {
	title: string;
	accessTypeIDs: number[];
	children: MenuItemInterface[];
	link: string;
	icon?: string;
	isOpen?: boolean;
	myChildCount?: number;
	openChildCount?: number;

	isBeta?: boolean; //beta 아이콘이 추가됨
	isOnlyAdmin?: boolean; //admin 아이콘이 추가 되고, 관리자만 메뉴가 보임
	ispen?: boolean;
	isSiblingVisable?: boolean;
	isVisable?: boolean;
	beforeDivideBar?: string;
	beforeDivideBarIcon?: string;
	openPathNames?: OpenPathNameInterface[];
	defaultTitleText?: {
		ko?: string;
		en?: string;
		ja?: string;
	};
}
