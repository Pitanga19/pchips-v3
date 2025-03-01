// pchips-v3/db/models/UserModel.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize, IUser } from '../dbIndex';
import bcrypt from 'bcrypt';

class UserModel extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IUser {
        return {
            id: this.id,
            username: this.username,
            email: this.email,
        };
    };

    // Compare hashed password
    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    };
};

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'UserModel',
        tableName: 'users',
        timestamps: true,
        hooks: {
            // Hash password on create, on update
            beforeCreate: async (user: UserModel): Promise<void> => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate: async (user: UserModel): Promise<void> => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                };
            },
        },
    },
);

export default UserModel;