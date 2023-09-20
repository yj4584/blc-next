import { useRouter } from 'next/router';
import React from 'react';
import { JSXElementConstructor, ReactElement } from 'react';
import { Card, Grid } from 'styles/styled-components/common/BaseComponents';
import {
	RowSection,
	TitleButton,
	TitleSection,
} from 'styles/styled-components/common/ListComponents';

export interface MainSectionLayoutInteface {
	titleName: string;
	isNewButton?: boolean;
	isEdit?: boolean;
	children: ReactElement<any, string | JSXElementConstructor<any>>;
}

export interface MainSectionChildrenPropsInterface {
	menuKey: string;
	isEdit?: boolean;
	handleClickSubmitButton: Function;
}

const MainSectionLayout = ({
	titleName,
	isNewButton,
	isEdit,
	children,
}: MainSectionLayoutInteface) => {
	const { asPath } = useRouter();
	const splitPath = asPath.split('/');
	const menuKey = splitPath.length > 1 ? `${splitPath[1]}` : '';

	return (
		<Grid.GridContainer>
			<Grid.GridByDevice
				defaultColumnCount={1}
				conditionalColumnCount={1}
				conditionalDeviceSize="deviceXLLess"
			>
				<Card.Card>
					<Card.CardBody>
						<RowSection>
							<TitleSection>{titleName}</TitleSection>
							{isNewButton == true && (
								<TitleButton href={`/${menuKey}/create`}>신규 추가</TitleButton>
							)}
						</RowSection>
						{React.cloneElement(
							children as React.ReactElement<MainSectionChildrenPropsInterface>,
							{
								menuKey,
								isEdit,
							},
						)}
					</Card.CardBody>
				</Card.Card>
			</Grid.GridByDevice>
		</Grid.GridContainer>
	);
};

export default MainSectionLayout;
