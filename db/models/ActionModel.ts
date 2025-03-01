// pchips-v3/db/models/ActionModel.ts

import { Model, DataTypes } from 'sequelize';
import { EActionType, IAction, sequelize } from '../dbIndex';

class ActionModel extends Model {
    public id!: number;
    public gameId!: number;
    public handId!: number;
    public roundId!: number;
    public playerId!: number;
    public actionCount!: number;
    public type!: EActionType;
    public amount!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IAction {
        return {
            id: this.id,
            gameId: this.gameId,
            handId: this.handId,
            roundId: this.roundId,
            playerId: this.playerId,
            actionCount: this.actionCount,
            type: this.type,
            amount: this.amount,
        };
    };
};

ActionModel.init({
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
    roundId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "rounds",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    playerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "players",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    actionCount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: Object.values(EActionType),
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ActionModel',
    tableName: 'actions',
    timestamps: true,
});

export default ActionModel;