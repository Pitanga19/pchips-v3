// pchips-v3/db/models/RoomModel.ts

import { Model, DataTypes } from "sequelize";
import { sequelize, IRoom } from "../dbIndex";

class RoomModel extends Model {
    public id!: number;
    public name!: string;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IRoom {
        return {
            id: this.id,
            name: this.name,
        };
    };
};

RoomModel.init(
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
        modelName: 'RoomModel',
        tableName: 'rooms',
        timestamps: true,
    },
);

export default RoomModel;