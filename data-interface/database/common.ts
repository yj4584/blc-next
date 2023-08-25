import { Transaction } from 'sequelize';

export interface InterfaceIncludeDataInterface {
	key: string; // Table/Model선택, 카멜
	required?: boolean;
	attributes?: any;
	whereAttributes?: any;
	includes?: InterfaceIncludeDataInterface[];
	separate?: boolean;
	through?: JoinIncludeAttributeInterface;
}

export interface JoinIncludeAttributeInterface {
	where?: any;
	attributes?: string[];
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
	include?: any;
}

export interface CreateInterface {
	transaction?: Transaction | null;
	logging?: boolean;
	benchmark?: boolean;
	raw?: boolean;
}
