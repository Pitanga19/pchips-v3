// pchips-v3/db/models/FriendModel.ts

import { Model, DataTypes } from "sequelize";
import { sequelize, IFriend } from "../dbIndex";
import { EFriendStatus } from '../utils/enums';

class FriendModel extends Model {
    public id!: number;
    public firstUserId!: number;
    public secondUserId!: number;
    public senderId! : number;
    public status!: EFriendStatus;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IFriend {
        return {
            id: this.id,
            firstUserId: this.firstUserId,
            secondUserId: this.secondUserId,
            senderId: this.senderId,
            status: this.status,
        };
    };
};

FriendModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        secondUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM,
            values: Object.values(EFriendStatus),
            allowNull: false,
            defaultValue: EFriendStatus.PENDING,
        },
    }, {
        sequelize,
        modelName: "FriendModel",
        tableName: "friends",
        timestamps: true,
        hooks: {
            beforeCreate: async (friend: FriendModel): Promise<void> => {
                // Make minor id be fistUserId
                if (friend.firstUserId > friend.secondUserId) {
                    const temp = friend.firstUserId;
                    friend.firstUserId = friend.secondUserId;
                    friend.secondUserId = temp;
                };
            },
        },
        indexes: [
            {
                unique: true,
                fields: ["first_user_id", "second_user_id"],
                name: "unique_friendship",
            },
        ],
    },
);

export default FriendModel;