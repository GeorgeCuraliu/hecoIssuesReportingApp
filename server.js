const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./db/DatabaseNameTest.db');

//Create the users table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT,
        accountType TEXT
    )
`);

// Insert data into the users table
db.run(`INSERT INTO users (username, password, accountType) VALUES ('user1', 'pass1', 'admin')`);
db.run(`INSERT INTO users (username, password, accountType) VALUES ('user2', 'pass2', 'guest')`);
// Add more data as needed...

// Function to verify if var1 and var2 correspond to server data
function verifyCredentials(username, password) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.get(query, [username, password], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row); // Resolves to true if row exists, false otherwise
            }
        });
    });
}

// Usage example
const var1 = 'user1';
const var2 = 'pass1';
verifyCredentials(var1, var2)
    .then((isValid) => {
        if (isValid) {
            console.log('Credentials verified!');
        } else {
            console.log('Invalid credentials!');
        }
    })
    .catch((err) => {
        console.error('Error:', err);
    })
    .finally(() => {
        // Close the database connection
        db.close();
    });


    


//SELECT   FROM   ORDER BY



//SELECT -rows- FROM -table-
//SELECT DISTINCT (removes duplicate rows)
//SELECT -rows- FROM -table- ORDER BY -condition
//                                          -> row ASC/DESC  (ascending, descnding)
//                                          -> row  (no condition)
//                                          -> NULL LAST/FIRST (sql`s undefined)
//WHERE condition
//              -> logical operators(=, !=, <, >...)
//              -> ALL	  returns 1 if all expressions are 1.
//              -> AND	  returns 1 if both expressions are 1, and 0 if one of the expressions is 0.
//              -> ANY	  returns 1 if any one of a set of comparisons is 1.
//              -> BETWEEN	    returns 1 if a value is within a range.
//              -> EXISTS	    returns 1 if a subquery contains any rows.
//              -> IN	    returns 1 if a value is in a list of values.
//              -> LIKE	    returns 1 if a value matches a pattern
//              -> NOT	    reverses the value of other operators such as NOT EXISTS, NOT IN, NOT BETWEEN, etc
//              -> OR	    returns true if either expression is 1
// where albumID = 1 (row - logical operaor)

                         