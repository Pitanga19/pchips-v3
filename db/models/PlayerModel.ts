// pchips-v3/db/models/PlayerModel.ts

import { Model, DataTypes } from 'sequelize';
import { IPlayer, sequelize } from '../dbIndex';
import { EPlayerStatus } from '../utils/enums';

class PlayerModel extends Model {
    public id!: number;
    public userId!: number;
    public roomId!: number;
    public gameId!: number;
    public seatNumber!: number;
    public status!: EPlayerStatus;
    public chips!: number;
    public bettingChips!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IPlayer {
        return {
            id: this.id,
            userId: this.userId,
            roomId: this.roomId,
            gameId: this.gameId,
            seatNumber: this.seatNumber,
            status: this.status,
            chips: this.chips,
            bettingChips: this.bettingChips,
        };
    };
};

PlayerModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: Object.values(EPlayerStatus),
        allowNull: false,
        defaultValue: EPlayerStatus.WAITING_NEXT_HAND,
    },
    chips: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bettingChips: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'PlayerModel',
    tableName: 'players',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["user_id", "room_id"],
            name: "unique_player_in_room",
        },
    ],
});

export default PlayerModel;