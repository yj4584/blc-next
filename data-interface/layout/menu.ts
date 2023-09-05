export interface AdminMenuItemInferface {
	className?: string;
	title: string;
	link: string;
}

export interface AdminMenuGroupInterface {
	menus: AdminMenuItemInferface[];
}
