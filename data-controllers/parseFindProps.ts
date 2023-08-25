import {
	FindInterface,
	ParseFindPropsInterface,
} from 'data-interface/database/common';

const parseFindProps = (props: FindInterface) => {
	let result: ParseFindPropsInterface = {};
	if (props) {
		if (props.where) {
			result.where = props.where;
		}
		if (props.attributes) {
			result.attributes = props.attributes;
		}
		if (props.limit) {
			result.limit = props.limit;
		}
		if (props.offset) {
			result.offset = props.offset;
		}
		if (props.order) {
			result.order = props.order;
		}
		if (props.group) {
			result.group = props.group;
		}
		if (typeof props.subQuery != 'undefined') {
			result.subQuery = props.subQuery;
		}
		if (typeof props.logging != 'undefined') {
			result.logging = props.logging;
		}
		if (props.benchmark) {
			result.benchmark = props.benchmark;
		}
		if (props.raw) {
			result.raw = props.raw;
		}
	}
	return result;
};

export default parseFindProps;
