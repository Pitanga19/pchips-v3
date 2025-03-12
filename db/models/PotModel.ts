// pchips-v3/db/models/PotModel.ts

import { Model, DataTypes } from 'sequelize';
import { IPot, sequelize } from '../dbIndex';

class PotModel extends Model {
    public id!: number;
    public tableId!: number;
    public handId!: number;
    public roundId!: number;
    public potNumber!: number;
    public isActive!: boolean;
    public chips!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): IPot {
        return {
            id: this.id,
            tableId: this.tableId,
            handId: this.handId,
            roundId: this.roundId,
            potNumber: this.potNumber,
            isActive: this.isActive,
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
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    chips: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'PotModel',
    tableName: 'pots',
    timestamps: true,
});

export default PotModel;