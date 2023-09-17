import styled, { css } from 'styled-components';

export const TicketComponents = {
	ButtonArea: styled.div`
		width: 100%;
		position: relative;
		height: fit-content;
	`,
	Button: styled.button`
		float: right;
		margin-bottom: 1.5rem;
		padding: 0.5rem;
		background-color: #283482;
		border-radius: 0.25rem;
		border: none;
		color: #fff;
		cursor: pointer;
	`,
	InfoSection: styled.div`
		width: 100%;
		border-bottom: 1px solid #cccccc;
		padding: 1.2rem 0 1.5rem 0;
	`,
	InfoArea: styled.div`
		width: 100%;
		height: fit-content;
		.title-icon {
			margin-left: 0.3rem;
		}
	`,
	AreaTitle: styled.p`
		margin-top: 0.5rem;
		margin-bottom: 0.6rem;
		font-weight: 700;
		i {
			cursor: pointer;
		}
	`,
	Input: styled.input`
		width: 100%;
		height: calc(1.5em + 0.75rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		// font-weight: 400;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	`,
	Select: styled.div`
		position: relative;
		.display-area {
			-webkit-box-align: center;
			align-items: center;
			background-color: rgb(255, 255, 255);
			border-color: rgb(204, 204, 204);
			border-radius: 4px;
			border-style: solid;
			border-width: 1px;
			cursor: default;
			display: flex;
			flex-wrap: wrap;
			-webkit-box-pack: justify;
			justify-content: space-between;
			min-height: 38px;
			position: relative;
			transition: all 100ms ease 0s;
			box-sizing: border-box;
			outline: 0px !important;
			.items {
				padding: 2px 8px;
				position: relative;
				overflow: hidden;
				box-sizing: border-box;
				.item {
					display: inline-block;
					background-color: rgb(230, 230, 230);
					border-radius: 2px;
					margin: 2px;
					padding: 0.5rem 0.5rem 0.5rem 0.5rem;
					min-width: 0px;
					box-sizing: border-box;
					.item-content {
						display: inline-block;
						color: rgb(51, 51, 51);
						font-size: 0.8rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						box-sizing: border-box;
					}
					.item-button {
						height: 100%;
						display: inline-block;
						align-self: center;
						padding-left: 1rem;
						box-sizing: border-box;
					}
				}
			}

			.search-wrap {
				margin: 2px;
				padding-bottom: 2px;
				padding-top: 2px;
				visibility: visible;
				color: rgb(51, 51, 51);
				flex: 1 1 auto;
				display: inline-grid;
				box-sizing: border-box;
				.search {
					color: inherit;
					background: 0px center;
					opacity: 1;
					width: 100%;
					font: inherit;
					min-width: 2px;
					border: 0px;
					margin: 0px;
					outline: 0px;
					padding: 0px;
				}
			}
			.buttons {
				-webkit-box-align: center;
				align-items: center;
				align-self: stretch;
				display: flex;
				flex-shrink: 0;
				box-sizing: border-box;
				.button {
					color: #cccccc;
					display: flex;
					padding: 8px;
					transition: color 150ms ease 0s;
					box-sizing: border-box;
				}
				.seperator {
					align-self: stretch;
					background-color: #cccccc;
					margin-bottom: 8px;
					margin-top: 8px;
					width: 1px;
					box-sizing: border-box;
				}
				.expand {
				}
			}
		}
		.select-area {
			position: absolute;
			z-index: 9999;
			width: 100%;
			-webkit-box-align: center;
			align-items: center;
			background-color: #fff;
			border: 1px solid #cccccc;
			border-radius: 4px;
			min-height: 38px;
			box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.15) !important;
			.select-item {
				padding: 0.5rem;
				cursor: pointer;
				&:hover {
					background: #deebff;
				}
			}
		}
	`,
	PriceRow: styled.div`
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
		margin-right: -15px;
		margin-left: -15px;
		margin-bottom: 0.5rem;
		i {
			cursor: pointer;
		}
		div {
			position: relative;
			width: 100%;
			padding-right: 15px;
			padding-left: 15px;
			label {
				display: inline-block;
				font-weight: 700;
				margin-bottom: 0.1rem;
			}
		}
		.rate-input {
			width: 90%;
			height: calc(1.5em + 0.75rem + 2px);
			padding: 0.375rem 0.75rem;
			font-size: 1rem;
			font-weight: 400;
			line-height: 1.5;
			color: #495057;
			background-color: #fff;
			background-clip: padding-box;
			border: 1px solid #ced4da;
			border-radius: 0.25rem;
			transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		}
		.col-2 {
			flex: 0 0 16.666667%;
			max-width: 16.666667%;
		}
		.col-4 {
			flex: 0 0 33.333333%;
			max-width: 33.333333%;
		}
	`,
	SubmitButton: styled.button`
		width: 100%;
		padding: 0.5rem;
		background-color: #007bff; //#283482;
		border-radius: 0.25rem;
		border: none;
		color: #fff;
		cursor: pointer;
		font-size: 1rem;
	`,
};
