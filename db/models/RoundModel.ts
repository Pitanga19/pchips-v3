// pchips-v3/db/models/RoundModel.ts

import { Model, DataTypes } from 'sequelize';
import { IRound, sequelize } from '../dbIndex';

class RoundModel extends Model {
    public id!: number;
    public gameId!: number;
    public handId!: number;
    public roundCount!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IRound {
        return {
            id: this.id,
            gameId: this.gameId,
            handId: this.handId,
            roundCount: this.roundCount,
        };
    };
};

RoundModel.init({
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
    handId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "hands",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    roundCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'RoundModel',
    tableName: 'rounds',
    timestamps: true,
});

export default RoundModel;