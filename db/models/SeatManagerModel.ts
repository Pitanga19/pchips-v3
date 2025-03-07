// pchips-v3/db/models/SeatModel.ts

import { Model, DataTypes } from 'sequelize';
import { ISeatManager, sequelize } from '../dbIndex';

class SeatManagerModel extends Model {
    public id!: number;
    public tableId!: number;
    public dealerSeat!: number;
    public smallBlindSeat!: number;
    public bigBlindSeat!: number;
    public actionSeat!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): ISeatManager {
        return {
            id: this.id,
            tableId: this.tableId,
            dealerSeat: this.dealerSeat,
            smallBlindSeat: this.smallBlindSeat,
            bigBlindSeat: this.bigBlindSeat,
            actionSeat: this.actionSeat,
        };
    };
};

SeatManagerModel.init({
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
    dealerSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    smallBlindSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bigBlindSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    actionSeat: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'SeatManagerModel',
    tableName: 'seat_managers',
    timestamps: true,
});

export default SeatManagerModel;