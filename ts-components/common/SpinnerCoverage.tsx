import styled from 'styled-components';
import { RootPortal } from './RootPortal';

const Wrapper = styled.div`
	background-color: #00000055;
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999999;
	display: flex;
	justify-content: center;
	align-items: center;
	.spinner-box {
		> i {
			font-size: 50px;
			animation-name: spin;
			animation-duration: 2000ms;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
`;
const SpinnerCoverage = () => {
	return (
		<RootPortal>
			<Wrapper>
				<div className={'spinner-box'}>
					<i className="fa-solid fa-circle-notch"></i>
				</div>
			</Wrapper>
		</RootPortal>
	);
};

export default SpinnerCoverage;
