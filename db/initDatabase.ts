// pchips-v3/db/initDatabase.ts

import sequelize from "./database"; // Import sequelize object
// ---------------- IMPORT MODELS   ---------------------------- //
import UserModel from "./models/UserModel";
import FriendModel from "./models/FriendModel";
import BlockModel from "./models/BlockModel";
import PartyUserModel from "./models/PartyUserModel";
import PartyModel from "./models/PartyModel";
import PlayerModel from "./models/PlayerModel";
import SettingModel from "./models/SettingModel";
import GameModel from "./models/GameModel";
import RoundModel from "./models/RoundModel";
import HandModel from "./models/HandModel";
import ActionModel from "./models/ActionModel";
import SeatManagerModel from "./models/SeatManagerModel"; // Importar el modelo SeatManager

const initDatabase = async () => { // Init database function
    // ---------------- RELATIONS   ---------------------------- //
    // User <-> Friend (firstUserId) (1:N)
    UserModel.hasMany(FriendModel, {
        foreignKey: 'firstUserId',
        as: 'firstUserFriends',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    FriendModel.belongsTo(UserModel, {
        foreignKey: 'firstUserId',
        as: 'firstUser',
    });

    // User <-> Friend (secondUserId) (1:N)
    UserModel.hasMany(FriendModel, {
        foreignKey: 'secondUserId',
        as: 'secondUserFriends',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    FriendModel.belongsTo(UserModel, {
        foreignKey: 'secondUserId',
        as: 'secondUser',
    });

    // User <-> Block (blockerId) (1:N)
    UserModel.hasMany(BlockModel, {
        foreignKey: 'blockerId',
        as: 'blockerBlocks',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    BlockModel.belongsTo(UserModel, {
        foreignKey: 'blockerId',
        as: 'blocker',
    });

    // User <-> Block (blockedId) (1:N)
    UserModel.hasMany(BlockModel, {
        foreignKey: 'blockedId',
        as: 'blockedBlocks',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    BlockModel.belongsTo(UserModel, {
        foreignKey: 'blockedId',
        as: 'blocked',
    });

    // User <-> PartyUser (1:N)
    UserModel.hasMany(PartyUserModel, {
        foreignKey: "userId",
        as: "partyMemberships",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PartyUserModel.belongsTo(UserModel, {
        foreignKey: "userId",
        as: "user",
    });

    // Party <-> PartyUser (1:N)
    PartyModel.hasMany(PartyUserModel, {
        foreignKey: "partyId",
        as: "partyMembers",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PartyUserModel.belongsTo(PartyModel, {
        foreignKey: "partyId",
        as: "party",
    });

    // Party <-> Game (1:N)
    PartyModel.hasMany(GameModel, {
        foreignKey: "partyId",
        as: "games",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    GameModel.belongsTo(PartyModel, {
        foreignKey: "partyId",
        as: "party",
    });

    // Game <-> Setting (1:1)
    GameModel.hasOne(SettingModel, {
        foreignKey: "gameId",
        as: "settings",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    SettingModel.belongsTo(GameModel, {
        foreignKey: "gameId",
        as: "game",
    });

    // Game <-> SeatManager (1:1)
    GameModel.hasOne(SeatManagerModel, {
        foreignKey: "gameId",
        as: "seatManager",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    SeatManagerModel.belongsTo(GameModel, {
        foreignKey: "gameId",
        as: "game",
    });

    // User <-> Player (1:N)
    UserModel.hasMany(PlayerModel, {
        foreignKey: "userId",
        as: "players",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PlayerModel.belongsTo(UserModel, {
        foreignKey: "userId",
        as: "user",
    });

    // Party <-> Player (1:N)
    PartyModel.hasMany(PlayerModel, {
        foreignKey: "partyId",
        as: "players",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PlayerModel.belongsTo(PartyModel, {
        foreignKey: "partyId",
        as: "party",
    });

    // Game <-> Player (1:N)
    GameModel.hasMany(PlayerModel, {
        foreignKey: "gameId",
        as: "players",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PlayerModel.belongsTo(GameModel, {
        foreignKey: "gameId",
        as: "game",
    });

    // Game <-> Round (1:N)
    GameModel.hasMany(RoundModel, {
        foreignKey: "gameId",
        as: "rounds",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    RoundModel.belongsTo(GameModel, {
        foreignKey: "gameId",
        as: "game",
    });

    // Round <-> Hand (1:N)
    RoundModel.hasMany(HandModel, {
        foreignKey: "roundId",
        as: "hands",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    HandModel.belongsTo(RoundModel, {
        foreignKey: "roundId",
        as: "round",
    });

    // Hand <-> Action (1:N)
    HandModel.hasMany(ActionModel, {
        foreignKey: "handId",
        as: "actions",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    ActionModel.belongsTo(HandModel, {
        foreignKey: "handId",
        as: "hand",
    });

    // Player <-> Action (1:N)
    PlayerModel.hasMany(ActionModel, {
        foreignKey: "playerId",
        as: "actions",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    ActionModel.belongsTo(PlayerModel, {
        foreignKey: "playerId",
        as: "player",
    });

    // ---------------- SYNC DATABASE   ------------------------ //
    try {
        await sequelize.authenticate(); // Connect to database
        console.log('Database connection established successfully');

        await sequelize.sync({          // Synchronize database
            force: true,    // To reset db while dev
        });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error(`Error while initializing the database: ${error}\n`);
        throw error;
    };
};

export default initDatabase;