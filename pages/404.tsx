import React from 'react';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
	text-align: center;
`;

const NotFoundImage = styled.img`
	width: 30rem;
	animation: wobble 2s 100;

	@keyframes wobble {
		25% {
			transform: rotate(15deg);
		}

		50% {
			transform: rotate(-30deg);
		}

		75% {
			transform: rotate(5deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
`;

const TextContainer = styled.div`
	font-size: 2rem;
	p {
		font-size: 1rem;
	}
`;

function NotFound() {
	return (
		<NotFoundContainer>
			<NotFoundImage src="https://image.webtoonguide.com/db/38/3e8dafab79fa7d3715d9b93abbb0.png" />
			<TextContainer>페이지를 찾지 못 했습니다.</TextContainer>
		</NotFoundContainer>
	);
}

export default NotFound;
