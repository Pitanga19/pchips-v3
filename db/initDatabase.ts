// pchips-v3/db/initDatabase.ts

import sequelize from "./database"; // Import sequelize object
// ---------------- IMPORT MODELS   ---------------------------- //
import {
    UserModel, FriendModel, BlockModel, RoomModel, RoomUserModel, PlayerModel, SettingsModel, SeatManagerModel, GameModel, RoundModel, HandModel, ActionModel, PotModel,
} from "./dbIndex";

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

    // User <-> RoomUser (1:N)
    UserModel.hasMany(RoomUserModel, {
        foreignKey: "userId",
        as: "roomMemberships",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    RoomUserModel.belongsTo(UserModel, {
        foreignKey: "userId",
        as: "user",
    });

    // Room <-> RoomUser (1:N)
    RoomModel.hasMany(RoomUserModel, {
        foreignKey: "roomId",
        as: "roomMembers",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    RoomUserModel.belongsTo(RoomModel, {
        foreignKey: "roomId",
        as: "room",
    });

    // Room <-> Game (1:N)
    RoomModel.hasMany(GameModel, {
        foreignKey: "roomId",
        as: "games",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    GameModel.belongsTo(RoomModel, {
        foreignKey: "roomId",
        as: "room",
    });

    // Game <-> Settings (1:1)
    GameModel.hasOne(SettingsModel, {
        foreignKey: "gameId",
        as: "settings",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    SettingsModel.belongsTo(GameModel, {
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

    // Room <-> Player (1:N)
    RoomModel.hasMany(PlayerModel, {
        foreignKey: "roomId",
        as: "players",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PlayerModel.belongsTo(RoomModel, {
        foreignKey: "roomId",
        as: "room",
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

    // Game <-> Pot (1:N)
    GameModel.hasMany(PotModel, {
        foreignKey: "gameId",
        as: "pots",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PotModel.belongsTo(GameModel, {
        foreignKey: "gameId",
        as: "game",
    });

    // Hand <-> Pot (1:N)
    HandModel.hasMany(PotModel, {
        foreignKey: "handId",
        as: "pots",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PotModel.belongsTo(HandModel, {
        foreignKey: "handId",
        as: "hand",
    });

    // Round <-> Pot (1:N)
    RoundModel.hasMany(PotModel, {
        foreignKey: "roundId",
        as: "pots",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    });
    PotModel.belongsTo(RoundModel, {
        foreignKey: "roundId",
        as: "round",
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