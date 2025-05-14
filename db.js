import sqlite from 'sqlite3';

// Create a connection to an in-memory database
const db = new sqlite.Database(':memory:');

// export to be able to use in other js files
export default db;

// Initialize database
db.serialize(() => {
    // If needed, drop table
    //db.run("DROP TABLE pictures");
    // Create a table
    db.run("CREATE TABLE pictures (url TEXT, type TEXT)");
});

// Close the connection when you're done
// db.close();
// Note: I was getting errors for doing this, not sure how to handle that,
// I know it is not best practice to keep it open.