import Header from './Header';

/**
 * 관리자 layout을 표현하기 위한 컴포넌트
 * @param props {any} : 해당 컴포넌트 출력이 중점
 * @returns
 */
const AdminPage = (props: any) => {
	return (
		<>
			<Header />
			{props.children}
		</>
	);
};

export default AdminPage;
