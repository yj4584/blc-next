import styled, { css } from 'styled-components';

export const FormLabel = styled.div`
	display: inline-block;
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
	font-weight: 700;

	.user-item-top {
		display: flex;
		justify-content: space-between;
	}
`;

export const FormDivider = styled.hr`
	overflow: visible;
	height: 0;
	box-sizing: content-box;
	border: 0;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

export const FormButtonPrimary = styled.button`
	display: block;
	width: 100%;
	color: #fff;
	background-color: #007bff;
	border-color: #007bff;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	font-weight: 400;
	text-align: center;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	line-height: 1.5;
	cursor: pointer;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	-webkit-appearance: button;

	&:hover {
		background-color: #0069d9;
		border-color: #0062cc;
	}
	${(props) => {
		if (props.disabled) {
			return css`
				background-color: gray;
				color: #4c4c4c;
				pointer-events: none;
			`;
		}
	}}
`;

export const FormButtonSecondary = styled.button`
	display: block;
	width: 100%;
	margin-top: 0.5rem !important;
	color: #fff;
	background-color: #000;
	border-color: #000;
	border: 1px solid transparent;
	border-radius: 0.25rem;
	font-weight: 400;
	text-align: center;
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	line-height: 1.5;
	cursor: pointer;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	-webkit-appearance: button;

	&:hover {
		background-color: #5a6268;
		border-color: #545b62;
	}
`;

export const FormButtonDanger = styled.button`
	color: #fff;
	background-color: #dc3545;
	border-color: #dc3545;
	text-decoration: none;
	cursor: pointer;
	padding: 0.25rem 0.5rem;
	font-size: 0.875rem;
	line-height: 1.5;
	border-radius: 0.2rem;
	display: inline-block;
	font-weight: 400;
	text-align: center;
	vertical-align: middle;
	user-select: none;
	border: 1px solid transparent;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	-webkit-appearance: button;

	&:hover {
		color: #fff;
		background-color: #c82333;
		border-color: #bd2130;
	}
`;

export const FormRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-right: -15px;
	margin-left: -15px;
	.form-control-width-fix-sm {
		min-width: 80px !important;
	}
	.col-1 {
		flex: 0 0 8.333333%;
		max-width: 8.333333%;
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}
	.col-2 {
		flex: 0 0 16.666667%;
		max-width: 16.666667%;
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}
	.col-3 {
		flex: 0 0 25%;
		max-width: 25%;
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}
	.col-4 {
		flex: 0 0 33.333333%;
		max-width: 33.333333%;
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}
	.col-12 {
		flex: 0 0 100%;
		max-width: 100%;
		position: relative;
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
	}

	.form-control[readonly] {
		background-color: #e9ecef;
		opacity: 1;
	}
`;

export const FormTable = styled.table`
	width: 100%;
	margin-bottom: 1rem;
	color: #212529;
	border-collapse: collapse;
	display: table;
	border-spacing: 2px;
	border-color: gray;

	th {
		vertical-align: bottom;
		border-bottom: 2px solid #dee2e6;
		padding: 1rem;
		border-top: 1px solid #dee2e6;
		text-align: inherit;
		font-weight: bold;
	}
	td {
		padding: 0.75rem;
		vertical-align: middle;
		border-top: 1px solid #dee2e6;
	}

	button {
		color: #fff;
		background-color: #dc3545;
		border-color: #dc3545;
		text-decoration: none;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		line-height: 1.5;
		border-radius: 0.2rem;
		display: inline-block;
		font-weight: 400;
		text-align: center;
		vertical-align: middle;
		user-select: none;
		border: 1px solid transparent;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		-webkit-appearance: button;

		&:hover {
			color: #fff;
			background-color: #c82333;
			border-color: #bd2130;
		}
	}
`;

export const FormSubTitle = styled.h5`
	font-size: 1.25rem;
	margin-top: 0;
	margin-bottom: 0.5rem;
	font-weight: 500;
	line-height: 1.2;
`;

export const FormSubDescription = styled.p`
	color: red;
	font-size: 0.8rem;
	margin-top: 5px;
`;

export const FormFileDragDrop = styled.div`
	width: 100%;
	border: dashed 2.5px rgb(190, 190, 190);
	border-radius: 5px;
	height: 250px;
	display: flex;
	label {
		width: 100%;
		display: flex;
		height: 100%;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		gap: 5px;
		flex-direction: column;

		&:hover {
			background-color: #e3e3e3;
		}
		&.dragging-true {
			background-color: #c0c0c0;
		}
		div.dragging-true {
			i {
				animation: jump 0.5s ease-in-out alternate infinite;
			}
		}

		i {
			font-size: 4.5rem;
			margin-bottom: 20px;
		}
		p {
			font-size: 18px;
			font-weight: normal;
		}
		font-weight: bold;
		top: 30%;
		left: 38%;
	}

	@keyframes jump {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-30%);
		}
	}
`;

export const FormFileListSection = styled.div`
	display: flex;
	height: 250px;
	overflow: auto;
	.file-list-container {
		flex: 1;
		display: flex;
		gap: 10px;
		flex-direction: column;
		&.center {
			justify-content: center;
			align-items: center;
		}

		.no-uploaded-file-msg {
			font-size: 18px;
		}

		.uploaded-file-item {
			border: solid 1px gray;
			padding: 22px;
			display: flex;
			position: relative;

			a {
				display: flex;
				gap: 10px;
				align-items: center;
				i {
					font-size: 30px;
				}
				div {
					font-size: 18px;
					line-height: 22px;
				}
				&:hover {
					text-decoration: underline;
				}
			}
			button.delete-btn {
				position: absolute;
				border: solid 1px black;
				right: 5px;
				top: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding-top: 2px;
				background-color: transparent;
				font-size: 12px;
				cursor: pointer;
				&:hover {
					background-color: red;
					color: white;
				}
			}
		}
	}
`;
