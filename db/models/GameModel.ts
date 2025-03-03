// pchips-v3/db/models/GameModel.ts

import { Model, DataTypes } from 'sequelize';
import { IGame, sequelize } from '../dbIndex';

class GameModel extends Model {
    public id!: number;
    public roomId!: number;
    public tableNumber!: number;
    public isPaused!: boolean;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IGame {
        return {
            id: this.id,
            roomId: this.roomId,
            tableNumber: this.tableNumber,
            isPaused: this.isPaused,
        };
    };
};

GameModel.init({
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
    },
    tableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'GameModel',
    tableName: 'games',
    timestamps: true,
});

export default GameModel;