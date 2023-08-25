import styled, { css } from 'styled-components';
import { deviceFunction } from 'styles/styled-components/media-query';

export const Form = {
	InfoIcon: styled.i<{ content: string }>`
		cursor: pointer;
		color: #aeaeae;
		position: relative;
		&:hover::after {
			// content안에 작은 따옴표 포함되어 있어서 작은 따옴표 사용시 오류 발생
			// prettier-ignore
			content: "${(props) => props.content}";
			font-family: 'sans-serif';
			text-transform: lowercase !important;
			position: absolute;
			right: 25px;
			color: black;
			border: solid 1px black;
			font-size: 12px;
			line-height: 20px;
			width: 200px;
			padding: 10px;
			border: none;
			border-radius: 10px;
			background-color: #fff;
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
			/* height: 50px; */
		}
	`,
};
