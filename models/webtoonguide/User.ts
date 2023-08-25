import { DataTypes, Model } from 'sequelize';
import sequelize from 'models/index';

export interface UserAttribute {
	id?: number;
	name?: string;
	email?: string | null;
	mailing_email?: string | null;
	is_writer?: number | null;
	writer_user_id?: number | null;
	ori_user_id?: number | null;
	is_only_view_id?: boolean;
	password?: string;
	group?: string | null;
	nickname?: string;
	password_question?: string | null;
	password_answer?: string | null;
	birth?: Date;
	gender?: string;
	profile_picture?: string | null;
	signature?: string | null;
	join_mailing?: string;
	message_allow?: string | null;
	push_allow?: number | null;
	point?: number | null;
	level?: number;
	toonga_point?: number;
	exp?: number | null;
	verify_adult?: string | null;
	auth_id?: number | null;
	remember_token?: string | null;
	api_token?: string | null;
	old_member_srl?: number | null;
	old_user_id?: string | null;
	provider?: string | null;
	provider_id?: string | null;
	is_show_bl_recommend?: boolean;
	is_show_man_recommend?: boolean;
	adult_view_mode?: string | null;
	created_at?: Date;
	updated_at?: Date;
	deleted_at?: Date | null;
}

class User extends Model<UserAttribute> implements UserAttribute {
	declare readonly id?: number;
	declare name?: string;
	declare email?: string | null;
	declare mailing_email?: string | null;
	declare is_writer?: number | null;
	declare writer_user_id?: number | null;
	declare ori_user_id?: number | null;
	declare is_only_view_id?: boolean;
	declare password?: string;
	declare group?: string | null;
	declare nickname?: string;
	declare password_question?: string | null;
	declare password_answer?: string | null;
	declare birth?: Date;
	declare gender?: string;
	declare profile_picture?: string | null;
	declare signature?: string | null;
	declare join_mailing?: string;
	declare message_allow?: string | null;
	declare push_allow?: number | null;
	declare point?: number | null;
	declare level?: number;
	declare toonga_point?: number;
	declare exp?: number | null;
	declare verify_adult?: string | null;
	declare auth_id?: number | null;
	declare remember_token?: string | null;
	declare api_token?: string | null;
	declare old_member_srl?: number | null;
	declare old_user_id?: string | null;
	declare provider?: string | null;
	declare provider_id?: string | null;
	declare is_show_bl_recommend?: boolean;
	declare is_show_man_recommend?: boolean;
	declare adult_view_mode?: string | null;
	declare created_at?: Date;
	declare updated_at?: Date;
	declare deleted_at?: Date | null;
}

export default User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mailing_email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		is_writer: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		writer_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		ori_user_id: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: true,
		},
		is_only_view_id: {
			type: DataTypes.BOOLEAN,
		},
		password: {
			type: DataTypes.STRING,
		},
		group: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nickname: {
			type: DataTypes.STRING,
		},
		password_question: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password_answer: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		birth: {
			type: DataTypes.DATE,
		},
		gender: {
			type: DataTypes.STRING,
		},
		profile_picture: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		signature: {
			type: DataTypes.TEXT('long'),
			allowNull: true,
		},
		join_mailing: {
			type: DataTypes.STRING,
		},
		message_allow: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		push_allow: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		point: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		level: {
			type: DataTypes.INTEGER,
		},
		toonga_point: {
			type: DataTypes.INTEGER,
		},
		exp: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		verify_adult: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		auth_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		remember_token: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		api_token: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		old_member_srl: {
			type: DataTypes.BIGINT,
			allowNull: true,
		},
		old_user_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		provider: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		provider_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		is_show_bl_recommend: {
			type: DataTypes.BOOLEAN,
		},
		is_show_man_recommend: {
			type: DataTypes.BOOLEAN,
		},
		adult_view_mode: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_at: {
			type: DataTypes.DATE,
		},
		updated_at: {
			type: DataTypes.DATE,
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: 'users',
		timestamps: false,
		sequelize: sequelize.webtoonguide,
		modelName: 'user',
	},
);
