import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from 'ts-components/Layouts/default/Header';
import { CustomerLayoutElement } from 'styles/styled-components/layouts/default-layout';
import { MenuItemInterface, OpenPathNameInterface } from 'data-interface/menu';

function DefaultLayout(props: { metaInfo: any; children: any }) {
	const router = useRouter();
	let [isMobileSideMenuOpen, setIsMobileSideMenuOpen] = useState(false);

	return (
		<>
			<Header />
			{/* <CustomerLayoutElement.MainSection> */}
			{props.children}
			{/* </CustomerLayoutElement.MainSection> */}
		</>
	);
}

export default DefaultLayout;
