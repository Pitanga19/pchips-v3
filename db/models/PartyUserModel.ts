// db/models/PartyUserModel.ts

import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import { IPartyUser } from "./utils/interfaces";

class PartyUserModel extends Model {
    public id!: number;
    public partyId!: number;
    public userId!: number;
    public isOwner!: boolean;
    public isAdmin!: boolean;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IPartyUser {
        return {
            id: this.id,
            partyId: this.partyId,
            userId: this.userId,
            isOwner: this.isOwner,
            isAdmin: this.isAdmin,
        };
    };
};

PartyUserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        partyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "parties",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
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
        modelName: 'PartyUserModel',
        tableName: 'party_users',
        timestamps: true,
    },
);

export default PartyUserModel;