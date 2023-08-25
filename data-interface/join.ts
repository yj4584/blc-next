export interface interfaceIncludeData {
	key: string; // Table/Model선택, 카멜
	required?: boolean;
	attributes?: any;
	whereAttributes?: any;
	includes?: interfaceIncludeData[];
	separate?: boolean;
}

export interface FindInterface {
	where?: any;
	attributes?: any;
	order?: any;
	limit?: number;
	offset?: number;
	group?: any;
	subQuery?: boolean;
	logging?: any;
	benchmark?: boolean;
	raw?: boolean;
}

export interface ParseFindPropsInterface extends FindInterface {
	include?: interfaceIncludeData[];
}
