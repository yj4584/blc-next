import styled from 'styled-components';
import { deviceFunction } from 'styles/styled-components/media-query';

const loginStyle = {
	Section: styled.section`
		// width: 100%;
		max-width: 600px;
		margin: 0 auto;
		margin-top: 80px;
		background-color: #fff;
		box-shadow: 14px 14px 28px -15px grey;
		/* padding: 16px; */
		display: block;
		height: 500px;
		/* font: 'gMarketSans'; */
		font-family: 'GmarketSansMedium';
		position: relative;
		${deviceFunction.deviceLgLess(`
			max-width: 500px;
		`)}
	`,
	Form: styled.form`
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
		position: relative;
		height: 100%;
	`,
	Body: styled.div`
		width: 100%;
	`,
	Title: styled.h1`
		text-align: center;
		font-size: 40px;
		margin-top: 70px;
		margin-bottom: 50px;
		font-family: 'GmarketSansMedium';
	`,
	Label: styled.label`
		font-size: 20px;
		padding: 13px 20px;
		position: absolute;
		color: #283482;
	`,
	Input: styled.input`
		display: block;
		border: 1px solid #ced4da;
		border-radius: 30px;
		box-sizing: border-box;
		margin: 5px 0 20px 0;
		color: #000;
		font-size: 14px;
		line-height: 20px;
		padding: 14px 25px 14px 60px;
		width: 100%;
		transition: 0.3s;
		font-family: 'GmarketSansMedium';
	`,
	Button: styled.button`
		display: block;
		width: 200px;
		margin: 0 auto;
		margin-top: 50px;
		background: #283482;
		border: none;
		cursor: pointer;
		text-align: center;
		text-decoration: none;
		vertical-align: middle;
		transition: color 0.15s ease-in-out 0s,
			background-color 0.15s ease-in-out 0s, border-color 0.15s ease-in-out 0s,
			box-shadow 0.15s ease-in-out 0s;
		font-size: 20px;
		border-radius: 30px;
		padding-top: 6px;
		line-height: 34px;

		color: rgb(255, 255, 255);
		font-family: 'GmarketSansMedium';
	`,
	Footer: styled.p`
		display: block;
		content: 'Copyright (c) COINST. All rights reserved.';
		bottom: 14px;
		left: 0;
		right: 0;
		position: absolute;
		color: #283482;
		font-size: 12px;
		text-align: center;
		font-family: 'GmarketSansMedium';
		scale: 0.8;
	`,
};

export default loginStyle;
