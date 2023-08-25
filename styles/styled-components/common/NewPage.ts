import styled from 'styled-components';

export const NewPageForm = styled.form`
	width: 100%;
	text-align: left;

	.button-row {
		margin-top: 10px;
		text-align: center;
	}
`;

export const NewPageFormRow = styled.div`
	width: 100%;
	margin-bottom: 10px;
`;

export const NewPageLabel = styled.label`
	display: block;
	margin-bottom: 0.5rem;
	font-weight: bold;

	span {
		float: right;
		text-transform: none;
		font-weight: 200;
		line-height: 1em;
		font-style: italic;
		opacity: 0.8;
	}
`;

export const NewPageInput = styled.input`
	width: 99%;
	margin-bottom: 5px;
	padding: 0.375rem 0.5rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #999;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const NewPageFormButton = styled.button`
	width: 100%;
	height: 40px;
	font-size: 20px;
	padding: 4px 8px;
	line-height: 20px;
	border: 1px solid #999;
	border-radius: 1rem;
	background-color: #0d6efd;
	border-color: #0a58ca;
	cursor: pointer;
	color: #fff;

	&:hover {
		background-color: #0a58ca;
		trasition: transform 1s;
	}
`;

export const NewPageSearchSection = styled.div`
	input {
		border: 1px solid #999;
		border-radius: 0.5rem;
		width: 200px;
		padding: 7px;
		margin-bottom: 5px;
	}

	button {
		padding: 7px;
		border-radius: 0.5rem;
		margin-left: 5px;
		border: 1px solid #999;
		background-color: #0d6efd;
		border-color: #0a58ca;
		cursor: pointer;
		color: #fff;

		&:hover {
			background-color: #0a58ca;
			trasition: transform 1s;
		}
	}
`;

export const NewPageSelectBoxSection = styled.div`
	select {
		border: 1px solid #999;
		border-radius: 1rem;
		height: 30px;
		width: 100px;
		text-align: center;
	}

	input {
		margin-left: 5px;
		border: 1px solid #999;
		border-radius: 0.5rem;
		padding: 5px;
	}
`;

export const NewPageTextAreaSection = styled.div`
	max-width: 99%;

	textarea {
		border: 1px solid #999;
		border-radius: 1rem;
		padding: 0.375rem 0.5rem;
		width: 100%;
		height: 100px;
	}
`;
