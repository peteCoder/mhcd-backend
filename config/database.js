const mongoose = require('mongoose');
require('dotenv').config();

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// Database connection
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING, dbOptions);

        console.log("Database connection successful! 😇");
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on("connected", () => {
    console.log("Database Connected! 😇");
});
mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected! 😢");
});


module.exports.connection = dbConnection;