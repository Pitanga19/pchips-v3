// pchips-v3/db/models/SettingModel.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize, ISetting, EBlindIncreaseType, ERebuyAddon, EStartingChipsType, EBlindLevel, ETableSize } from '../dbIndex';

class SettingModel extends Model {
    public id!: number;
    public gameId!: number;
    public blindLevel!: EBlindLevel;
    public tableSize!: ETableSize;
    public blindIncreaseType!: EBlindIncreaseType;
    public blindIncreaseGoal!: number;
    public blindIncreaseCount!: number;
    public startingChipsType!: EStartingChipsType;
    public startingChips!: number;
    public rebuyAddon!: ERebuyAddon;

    public createdAt!: Date;
    public updatedAt!: Date;

    public toJSON(): ISetting {
        return {
            id: this.id,
            gameId: this.gameId,
            blindLevel: this.blindLevel,
            tableSize: this.tableSize,
            blindIncreaseType: this.blindIncreaseType,
            blindIncreaseGoal: this.blindIncreaseGoal,
            blindIncreaseCount: this.blindIncreaseCount,
            startingChipsType: this.startingChipsType,
            startingChips: this.startingChips,
            rebuyAddon: this.rebuyAddon,
        };
    };
};

SettingModel.init({
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
    blindLevel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: EBlindLevel.NL10,
    },
    tableSize: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: ETableSize.TEN_MAX,
    },
    blindIncreaseType: {
        type: DataTypes.ENUM,
        values: Object.values(EBlindIncreaseType),
        allowNull: false,
        defaultValue: EBlindIncreaseType.NONE,
    },
    blindIncreaseGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    blindIncreaseCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    startingChipsType: {
        type: DataTypes.ENUM,
        values: Object.values(EStartingChipsType),
        allowNull: false,
        defaultValue: EStartingChipsType.EQUAL,
    },
    startingChips: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000,
    },
    rebuyAddon: {
        type: DataTypes.ENUM,
        values: Object.values(ERebuyAddon),
        allowNull: false,
        defaultValue: ERebuyAddon.NONE,
    },
}, {
    sequelize,
    modelName: 'SettingModel',
    tableName: 'settings',
    timestamps: true,
    hooks: {
        // Use gameId as id for setting
        beforeCreate: (setting: SettingModel) => {
            setting.id = setting.gameId;
        },
    },
});

export default SettingModel;