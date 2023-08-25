import { CocodaUserGroupControllerAttribute } from 'data-controllers/webtoonguide/CocodaUserGroupController';
import {
	NewPageFormRow,
	NewPageInput,
	NewPageLabel,
	NewPageSelectBoxSection,
} from 'styles/styled-components/common/NewPage';
import { NewPageForm } from 'ts-components/common/NewPage';

const UserForm = ({ ...props }) => {
	const { user, userGroups } = props;
	let cocodaUserGroupId = 0;
	user &&
		user?.cocodaUserGroups.forEach((userGroup: { id: number }) => {
			cocodaUserGroupId = userGroup.id;
			return;
		});

	return (
		<NewPageForm {...props}>
			<input type="hidden" name="id" defaultValue={user ? user.id : ''} />
			<NewPageFormRow>
				<NewPageLabel>사용자명</NewPageLabel>
				<NewPageInput
					type="text"
					name="name"
					defaultValue={user ? user.name : ''}
					required={true}
					autoFocus
				/>
			</NewPageFormRow>
			<NewPageFormRow>
				<NewPageLabel>닉네임</NewPageLabel>
				<NewPageInput
					type="text"
					name="nickname"
					defaultValue={user ? user.nickname : ''}
					required={true}
				/>
			</NewPageFormRow>
			<NewPageFormRow>
				<NewPageLabel>email</NewPageLabel>
				<NewPageInput
					type="text"
					name="email"
					defaultValue={user ? user.email : ''}
					required={true}
				/>
			</NewPageFormRow>
			<NewPageFormRow>
				<NewPageLabel>이용 권한</NewPageLabel>
				<NewPageSelectBoxSection>
					<select name="userGroupId" defaultValue={cocodaUserGroupId}>
						<option value={''}>미선택</option>
						{userGroups &&
							userGroups.map(
								(
									userGroup: CocodaUserGroupControllerAttribute,
									userGroupIndex: number,
								) => (
									<option
										key={`user-group-type-${userGroupIndex}`}
										value={userGroup.id.toString()}
									>
										{userGroup.name}
									</option>
								),
							)}
					</select>
				</NewPageSelectBoxSection>
			</NewPageFormRow>
		</NewPageForm>
	);
};

export default UserForm;
