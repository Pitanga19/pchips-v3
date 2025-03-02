// pchips-v3/db/models/PartyModel.ts

import { Model, DataTypes } from "sequelize";
import { sequelize, IParty } from "../dbIndex";

class PartyModel extends Model {
    public id!: number;
    public name!: string;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IParty {
        return {
            id: this.id,
            name: this.name,
        };
    };
};

PartyModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'PartyModel',
        tableName: 'parties',
        timestamps: true,
    },
);

export default PartyModel;