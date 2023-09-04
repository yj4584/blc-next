import { NoParamReturnNullFunctionInterface } from 'data-interface/function/noParam';

export interface SideMenuPropsInterface {
	closeSideMenu: NoParamReturnNullFunctionInterface;
}

export interface AdminMenuItemInferface {
	className?: string;
	title: string;
	link: string;
}

export interface AdminMenuGroupInterface {
	menus: AdminMenuItemInferface[];
}