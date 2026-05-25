const mongoose = require('mongoose');

async function connectMongoDB() {
    try {
        // Replace 'test_db' at the end of the URI with your target MongoDB database name
        const mongoURI = 'mongodb://127.0.0.1:27017/test_db';
        
        await mongoose.connect(mongoURI);
        console.log("✔ Connected to MongoDB successfully via Mongoose.");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}

module.exports = connectMongoDB;