import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const RootPortal = ({ children }: { children: ReactNode }) => {
	const el = document.querySelector('body');
	return createPortal(children, el as HTMLBodyElement);
};
