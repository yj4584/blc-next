import { useEffect } from 'react';

const useDebouncedEffect = (callback: Function, dep: any[], time = 1000) => {
	useEffect(() => {
		const timer = setTimeout(async () => {
			callback();
		}, time);

		return () => {
			clearTimeout(timer);
		};
	}, [...dep]);
};

export default useDebouncedEffect;
