// pchips-v3/db/models/PotModel.ts

import { Model, DataTypes } from 'sequelize';
import { IPot, sequelize } from '../dbIndex';

class PotModel extends Model {
    public id!: number;
    public gameId!: number;
    public handId!: number;
    public roundId!: number;
    public potNumber!: number;
    public chips!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IPot {
        return {
            id: this.id,
            gameId: this.gameId,
            handId: this.handId,
            roundId: this.roundId,
            potNumber: this.potNumber,
            chips: this.chips,
        };
    };
};

PotModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "games",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    handId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "hands",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    roundId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "rounds",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    potNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    chips: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'PotModel',
    tableName: 'pots',
    timestamps: true,
});

export default PotModel;