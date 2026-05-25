const mysqlPool = require('./config/mysqlDb');
const connectMongoDB = require('./config/mongoDb');
const mongoose = require('mongoose');

// Define Schema for MongoDB
const studentSchema = new mongoose.Schema({ roll_no: Number, name: String, course: String });
const StudentMongo = mongoose.model('Student', studentSchema);

async function runCreate() {
    await connectMongoDB();
    
    try {
        // Reset MySQL table layout cleanly
        await mysqlPool.query("DROP TABLE IF EXISTS students");
        await mysqlPool.query(`
            CREATE TABLE students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                roll_no INT,
                name VARCHAR(100),
                course VARCHAR(100)
            )
        `);
        // Reset MongoDB collection cleanly
        await StudentMongo.deleteMany({});
        console.log("🧹 Both databases cleared and initialized.");

        // 4 Student entries to insert
        const newStudents = [
            { roll_no: 201, name: "Aanya Rao", course: "Cloud Computing" },
            { roll_no: 202, name: "Kabir Mehta", course: "Cyber Security" },
            { roll_no: 203, name: "Rohan Das", course: "UI/UX Design" },
            { roll_no: 204, name: "Sana Khan", course: "DevOps Engineering" }
        ];

        console.log("\n[CREATE] Inserting 4 entries into MySQL and MongoDB...");
        const mysqlInsert = "INSERT INTO students (roll_no, name, course) VALUES (?, ?, ?)";

        for (let student of newStudents) {
            await mysqlPool.execute(mysqlInsert, [student.roll_no, student.name, student.course]);
            await StudentMongo.create(student);
            console.log(`   -> Saved: ${student.name}`);
        }
        
        console.log("\n🚀 Insertion complete! Go check your MySQL Workbench and MongoDB Compass now.");
    } catch (err) {
        console.error("❌ Error:", err.message);
    } finally {
        await mysqlPool.end();
        await mongoose.connection.close();
    }
}

runCreate();