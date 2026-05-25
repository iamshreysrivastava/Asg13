const mysqlPool = require('./config/mysqlDb');
const connectMongoDB = require('./config/mongoDb');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ roll_no: Number, name: String, course: String });
const StudentMongo = mongoose.models.Student || mongoose.model('Student', studentSchema);

async function runDelete() {
    await connectMongoDB();
    
    try {
        console.log("\n[DELETE] Dropping Roll No 204 from both ecosystems...");
        
        await mysqlPool.execute("DELETE FROM students WHERE roll_no = ?", [204]);
        await StudentMongo.deleteOne({ roll_no: 204 });

        console.log("✔ Deletion completed cleanly.");
        console.log("👉 Check your GUI tools. Sana Khan will be gone, leaving exactly 3 entries.");
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mysqlPool.end();
        await mongoose.connection.close();
    }
}

runDelete();