// pchips-v3/db/models/RoomUserModel.ts

import { Model, DataTypes } from "sequelize";
import { sequelize, IRoomUser } from "../dbIndex";

class RoomUserModel extends Model {
    public id!: number;
    public roomId!: number;
    public userId!: number;
    public isOwner!: boolean;
    public isAdmin!: boolean;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IRoomUser {
        return {
            id: this.id,
            roomId: this.roomId,
            userId: this.userId,
            isOwner: this.isOwner,
            isAdmin: this.isAdmin,
        };
    };
};

RoomUserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "rooms",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            unique: "unique_room_user",
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            unique: "unique_room_user",
        },
        isOwner: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'RoomUserModel',
        tableName: 'room_users',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["room_id", "user_id"],
                name: "unique_room_user",
            },
        ],
    },
);

export default RoomUserModel;