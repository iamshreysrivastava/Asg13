const mysqlPool = require('./config/mysqlDb');
const connectMongoDB = require('./config/mongoDb');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ roll_no: Number, name: String, course: String });
const StudentMongo = mongoose.models.Student || mongoose.model('Student', studentSchema);

async function runUpdate() {
    await connectMongoDB();
    
    try {
        console.log("\n[UPDATE] Updating Roll No 203 to 'Product Design'...");
        
        await mysqlPool.execute("UPDATE students SET course = ? WHERE roll_no = ?", ["Product Design", 203]);
        await StudentMongo.updateOne({ roll_no: 203 }, { course: "Product Design" });

        console.log("✔ Update applied successfully to both engines.");
        console.log("👉 Refresh MySQL Workbench and MongoDB Compass to confirm Rohan's course changed!");
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mysqlPool.end();
        await mongoose.connection.close();
    }
}

runUpdate();