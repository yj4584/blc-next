import styled from 'styled-components';
import { deviceFunction } from 'styles/styled-components/media-query';

export const CustomerLayoutElement = {
	PageLayout: styled.div`
		width: 100%;
		position: relative;
	`,
	MainSection: styled.main`
		padding: 94px 0.75rem 60px;
		margin-left: 240px;
		background-color: #f3f3f3;

		${deviceFunction.deviceLgLess(`
			margin-left: 0;
		`)}
	`,
	Header: {
		LogoSection: {
			Section: styled.div`
				position: absolute;
				left: 0;
				top: 0;
				padding: 0 1.5rem;
				width: 240px;
				height: 70px;
				text-align: center;
				padding: 0 1.5rem;
				.sm-logo {
					display: none;
				}
				${deviceFunction.deviceLgLess(`
                width: 75px;
                .sm-logo {
                    display: inline !important;
                }
                .lg-logo {
                    display: none !important;
                }
            `)}
			`,
			TextLogo: styled.a`
				color: white;
				font-weight: bold;
				position: relative;
				top: 35%;
				font-size: 2rem;
			`,
		},
		Header: styled.header`
			width: 100%;
			position: fixed;
			top: 0px;
			left: 0px;
			right: 0px;
			z-index: 1002;
			background-size: cover;
			background-position: 50% center;
			background-repeat: no-repeat;
			display: flex;
			-webkit-box-pack: justify;
			justify-content: space-between;
			-webkit-box-align: center;
			align-items: center;
			margin: 0px auto;
			height: 70px;
			padding: 0px 0.75rem 0px 240px;
			box-shadow: rgba(0, 0, 0, 0.03) 1px 0px 5px;
			background-color: #fff;
			border-bottom: 1px solid #c3c2c2;

			${deviceFunction.deviceLgLess(`
				padding-left: 75px;
			`)}
		`,
		Content: {
			Section: styled.div`
				position: relative;
				width: 100%;
				height: 100%;
				text-align: left;
				padding-right: 45px;
				padding-left: 12px;
			`,
			MainSection: styled.div`
				font-size: 18px;
				line-height: 26px;
				font-weight: bold;
				display: inline-block;
				position: absolute;
				left: 12px;
				right: 45px;
				top: 50%;
				transform: translateY(-50%);
				//overflow: hidden;
				max-height: 70px;

				${deviceFunction.deviceLgLess(`
					font-size: 16px;
					line-height: 18px;
					padding-left: 25px;
					font-weight: normal;

					select {
						font-weight: normal;
					}
				`)}

				.btn-open-side-bar {
					display: none;
					cursor: pointer;
					font-size: 22px;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);

					${deviceFunction.deviceLgLess(`
                  display: inline-block;
                  margin-right: 20px;
              `)}
				}
			`,
			HeaderMenuSection: styled.div`
				display: inline-block;
				position: absolute;
				right: 15px;
				top: 50%;
				transform: translateY(-50%);
				max-height: 70px;
				font-weight: bold;
				font-size: 1.2rem;
				cursor: pointer;
			`,
			HeaderItem: styled.span`
				&::after {
					font-family: 'Font Awesome 6 Free';
					font-weight: 900;
					content: '\f105';
					margin-left: 4px;
					margin-right: 4px;
				}
				&:last-child {
					&::after {
						display: none;
					}
				}
			`,
			HeaderSelectItem: styled.select`
				border: 0;
				background: inherit;
				font-size: 18px;
				font-weight: bold;
			`,
			RightSection: {
				Area: styled.div`
					position: absolute;
					right: 0;
					top: 50%;
					transform: translate(0, -50%);
				`,
				MyPage: styled.div`
					cursor: pointer;
					vertical-align: middle;
					height: 36px;
					width: 36px;
					line-height: 36px;
					text-align: center;
					font-weight: 700;
					background-size: cover;
					background-position: 50%;
					background-repeat: no-repeat;
					background-image: url('https://image.webtoonguide.com/72/87/94b71e362458bd7aaff221ba4f4b.png');
				`,
			},
		},
	},
};
