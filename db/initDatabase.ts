import sequelize from "./database"; // Import sequelize object
import UserModel from "./models/UserModel";
import FriendModel from "./models/FriendModel";
// ---------------- IMPORT MODELS   ---------------------------- //

const initDatabase = async () => {
    // ---------------- RELATIONS   ---------------------------- //
    // User <-> Friend (firstUserId) (1:N)
    UserModel.hasMany(FriendModel, { foreignKey: 'firstUserId', as: 'firstUserFriends' });
    FriendModel.belongsTo(UserModel, { foreignKey: 'firstUserId', as: 'firstUser' });

    // User <-> Friend (secondUserId) (1:N)
    UserModel.hasMany(FriendModel, { foreignKey: 'secondUserId', as: 'secondUserFriends' });
    FriendModel.belongsTo(UserModel, { foreignKey: 'secondUserId', as: 'secondUser' });
    
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