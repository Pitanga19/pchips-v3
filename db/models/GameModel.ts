// pchips-v3/db/models/GameModel.ts

import { Model, DataTypes } from 'sequelize';
import { IGame, sequelize } from '../dbIndex';

class GameModel extends Model {
    public id!: number;
    public partyId!: number;
    public tableNumber!: number;
    public isPaused!: boolean;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IGame {
        return {
            id: this.id,
            partyId: this.partyId,
            tableNumber: this.tableNumber,
            isPaused: this.isPaused,
        };
    };
};

GameModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    partyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "parties",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    tableNumber: {
        type: DataTypes.INTEGER.UNSIGNED,
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