// pchips-v3/db/models/HandModel.ts

import { Model, DataTypes } from 'sequelize';
import { IHand, sequelize } from '../dbIndex';

class HandModel extends Model {
    public id!: number;
    public tableId!: number;
    public handCount!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IHand {
        return {
            id: this.id,
            tableId: this.tableId,
            handCount: this.handCount,
        };
    };
};

HandModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "tables",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    handCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'HandModel',
    tableName: 'hands',
    timestamps: true,
});

export default HandModel;