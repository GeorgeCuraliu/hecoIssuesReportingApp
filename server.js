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

function verifyAndUpdateCredentials(username, password, newUsername) {
    return new Promise((resolve, reject) => {
      // Check if the credentials are valid
      const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
      db.get(query, [username, password], (err, row) => {
        if (err) {
          reject(err);
        } else {
          if (row) {
            // Credentials are valid, update the username
            const updateQuery = 'UPDATE users SET username = ? WHERE username = ?';
            db.run(updateQuery, [newUsername, username], (err) => {
              if (err) {
                reject(err);
              } else {
                resolve(true); // Update successful
              }
            });
          } else {
            resolve(false); // Invalid credentials
          }
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
// WHERE albumID = 1    (row - logical operaor)
//LIMIT numb OFFSET num     (limits the returning values to numb -- optional -> OFFSET (will offset the first returning value by numv values))
//(NOT) BETWEEN 14.91 and 18.86   (used for row values)
//MediaTypeId IN (1, 2)     (checks if the MediaTypeID value are 1 or 2)
//INSERT INTO table (column1,column2 ,..) VALUES( value1,	value2 ,...);      column -> value
//
//







//
//https://www.sqlitetutorial.net/sqlite-insert/
//https://www.codecademy.com/learn/learn-node-sqlite/modules/learn-node-sqlite-module/cheatsheet
//https://github.com/TryGhost/node-sqlite3/wiki/Control-Flow
//


                         