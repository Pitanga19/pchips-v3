// pchips-v3/db/models/PotPlayerModel.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize, IPotPlayer } from '../dbIndex';

class PotPlayerModel extends Model {
    public id!: number;
    public potId!: number;
    public playerId!: number;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IPotPlayer {
        return {
            id: this.id,
            potId: this.potId,
            playerId: this.playerId,
        };
    };
};

PotPlayerModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        potId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pots",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            unique: "unique_pot_player",
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "players",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            unique: "unique_pot_player",
        },
    }, {
        sequelize,
        modelName: 'PotPlayerModel',
        tableName: 'pot_players',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["pot_id", "player_id"],
                name: "unique_pot_player",
            },
        ],
    },
);

export default PotPlayerModel;