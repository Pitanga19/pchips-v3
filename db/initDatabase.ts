import sequelize from "./database"; // Import sequelize object
// ---------------- IMPORT MODELS   ---------------------------- //

const initDatabase = async () => {
    // ---------------- DEFINE RELATIONS    -------------------- //
    
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