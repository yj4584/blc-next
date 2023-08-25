import { CocodaUserControllerAttribute } from 'data-controllers/webtoonguide/CocodaUserController';

export const UserList = ({
	users,
}: {
	users: CocodaUserControllerAttribute[];
}) => {
	return (
		<table className="base-table">
			<thead className="font-bold">
				<tr>
					<th>이름</th>
					<th>email</th>
					<th>그룹</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{users.map((user, userIndex) => {
					return (
						<tr key={`user-tr-${userIndex}`}>
							<th>{user.name}</th>
							<td>{user.email}</td>
							<td>
								{user?.cocodaUserGroups &&
									user.cocodaUserGroups
										.map((userGroup) => userGroup.name)
										.join(',')}
							</td>
							<td className="text-center">
								<a className="btn-sm-primary" href={`/user/${user.id}`}>
									수정
								</a>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default UserList;
