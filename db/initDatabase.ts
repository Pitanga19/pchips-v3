// pchips-v3/db/initDatabase.ts

import sequelize from "./database"; // Import sequelize object
// ---------------- IMPORT MODELS   ---------------------------- //
import UserModel from "./models/UserModel";
import FriendModel from "./models/FriendModel";
import BlockModel from "./models/BlockModel";
import PartyUserModel from "./models/PartyUserModel";
import PartyModel from "./models/PartyModel";

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