// db/models/BlockModel.ts

import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import { IBlock } from "./utils/interfaces";

class BlockModel extends Model {
    public id!: number;
    public blockerId!: number;
    public blockedId!: number;

    createdAt!: Date;
    updatedAt!: Date;

    public toJSON(): IBlock {
        return {
            id: this.id,
            blockerId: this.blockerId,
            blockedId: this.blockedId,
        };
    };
};

BlockModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        blockerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        blockedId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    }, {
        sequelize,
        modelName: "BlockModel",
        tableName: "blocks",
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["blocker_id", "blocked_id"],
                name: "unique_blocking",
            },
        ],
    },
);

export default BlockModel;