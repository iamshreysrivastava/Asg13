const mysqlPool = require('./config/mysqlDb');
const connectMongoDB = require('./config/mongoDb');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({ roll_no: Number, name: String, course: String });
const StudentMongo = mongoose.models.Student || mongoose.model('Student', studentSchema);

async function runRead() {
    await connectMongoDB();
    
    try {
        console.log("\n[READ ALL] Fetching full database states...");
        const [mysqlRows] = await mysqlPool.execute("SELECT * FROM students");
        const mongoDocs = await StudentMongo.find({});
        
        console.log("📊 MySQL Total Rows:", mysqlRows.length);
        console.log("📊 MongoDB Total Documents:", mongoDocs.length);

        console.log("\n[READ SINGLE] Fetching specific details for Roll No 202...");
        const [mysqlSingle] = await mysqlPool.execute("SELECT * FROM students WHERE roll_no = ?", [202]);
        const mongoSingle = await StudentMongo.findOne({ roll_no: 202 });

        console.log("   -> MySQL Grid Value:", mysqlSingle[0]);
        console.log("   -> MongoDB Document Value:", mongoSingle);
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mysqlPool.end();
        await mongoose.connection.close();
    }
}

runRead();