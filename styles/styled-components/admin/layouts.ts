import styled from 'styled-components';
import { logoImageVariableObj } from 'ts-data-file/common/imageVariable';

export const AdminHeaderElement = {
	Box: styled.header`
		position: relative;
		width: 100%;
		height: 60px;
		background-color: #1a233a;
		padding: 8px 0;
		text-align: center;
	`,
	Logo: styled.img.attrs({
		src: logoImageVariableObj.cimsLogo,
	})`
		height: 40px;
		margin-top: 2px;
	`,
};

export const SideBarElement = {
	SideMenu: {
		Box: styled.div`
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			z-index: 50;
			width: 300px;
			overflow-y: auto;
			background: #fff;
		`,
		SectionBar: styled.div`
			width: 100%;
			height: 8px;
			background: #eaeaea;
		`,
		MenuSection: styled.div`
			width: 100%;
			padding: 16px;
			background: #fff;
			position: relative;
		`,
		MenuGroupDivide: styled.hr`
			margin-left: -15px;
			margin-right: -15px;
			margin-top: 1rem;
			margin-bottom: 1rem;
			border: 0;
			border-top: 1px solid rgba(0, 0, 0, 0.1);
		`,
		MenuItem: styled.div`
			font-size: 16px;
			text-align: left;
			font-weight: 700;
			line-height: 40px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 100%;
			cursor: pointer;
		`,
		MenuIcon: styled.i`
			margin-right: 8px;
		`,
	},
};
