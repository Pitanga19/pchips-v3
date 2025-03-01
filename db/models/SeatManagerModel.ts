// pchips-v3/db/models/SeatModel.ts

import { Model, DataTypes } from 'sequelize';
import { ISeatManager, sequelize } from '../dbIndex';

class SeatManagerModel extends Model {
    public id!: number;
    public gameId!: number;
    public dealerSeat!: number;
    public smallBlindSeat!: number;
    public bigBlindSeat!: number;
    public actionSeat!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): ISeatManager {
        return {
            id: this.id,
            gameId: this.gameId,
            dealerSeat: this.dealerSeat,
            smallBlindSeat: this.smallBlindSeat,
            bigBlindSeat: this.bigBlindSeat,
            actionSeat: this.actionSeat,
        };
    };
};

SeatManagerModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    gameId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "games",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    dealerSeat: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    smallBlindSeat: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    bigBlindSeat: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    actionSeat: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'SeatManagerModel',
    tableName: 'seat_managers',
    timestamps: true,
});

export default SeatManagerModel;