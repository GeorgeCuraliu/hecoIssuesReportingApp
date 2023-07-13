const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());

const path = './db/hecoAppDB.db';
const db = new sqlite3.Database(path);


const createAccount = (req) => {//req.body.username  req.body.password   req.body.name   req.body.gmail
    let query = `SELECT * FROM users WHERE username = ?`;
        db.get(query, [req.body.username], (err, row) => {
            if(err){return (err)}
            console.log(row)
            if(!row){
                db.run(`INSERT INTO users(username, password, name, gmail) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.name}", "${req.body.gmail}")`)
                console.log("created account");
            }else{
                console.log("the username is already used")
            }
    })
}

const deleteUser = (req) => {//req.body.username

    let query = `DELETE FROM users WHERE username = ?`;
    db.run(query, req.body.username, () => {console.log("user deleted")})

}

const logIn = (req) => {//req.body.username  req.body.password

    let query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.get(query, [req.body.username, req.body.password], (err, row) => {
            if (err) {
                console.log(err);
            } else {
                console.log(!!row); // Resolves to true if row exists, false otherwise
            }
    });

}


const createMachine = (req) => {//req.body.code  req.body.hangar  req.body.maintenance

    db.run(`INSERT INTO machineRegistry(code, hangar, maintenance, status) VALUES ("${req.body.code}", "${req.body.hangar}", "${req.body.maintenance}", "functional")`)
    console.log("Added machineRegistry to server")

}

const deleteMachine = (req) => {//req.body.code

    db.run(`DELETE FROM machineRegistry WHERE code = "${req.body.code}"`)

}

const getMachines = (req) => {

    let query = "SELECT * FROM machineRegistry";
    db.all(query, [], (err, rows) => {
        if(err){
            console.log("big error")
        }else{
            console.log(rows);
        }
    })

}




const createRepairRequest = (req) => {//req.body.machineCode  req.body.by  req.body.targetGroup  req.body.issue

    db.get("SELECT * FROM repairRequests WHERE machineCode = ?", [req.body.machineCode], (err, row) => {
        if(err){return "no no"}
        if(row){return "no no"}
        db.run(`INSERT INTO repairRequests(by, targetGroup, machineCode, issue) VALUES ("${req.body.by}", "${req.body.targetGroup}", "${req.body.machineCode}", "${req.body.issue}")`, err => {
            if(err){return}

            db.run(`UPDATE machineRegistry SET status = "in repairing" WHERE code = "${req.body.machineCode}"`)
        });
        
    })

}





//createAccount({body: {username: "niiiigersssssssssssss(dani)", password: "Dawd", name: "Adwad", gmail: "Dawdaaa"}})
//deleteUser({body: {username: "user1"}})
//logIn({body: {username: "aa2", password : "Dawd"}});
//createMachine({body: {code: 112, hangar: "Dwa", maintenance: "dwasdawd"}})
//deleteMachine({body: {code: 312}})
//getMachines()
//createRepairRequest({body:{ by: "awd", machineCode: 112, targetGroup: "daw", issue: "wda"}})


app.listen(port, () => {
    console.log("Local server is running, time to chat :)")
})