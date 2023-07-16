const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 6969;

app.use(cors());
app.use(express.json());

const path = './db/hecoAppDB.db';
const db = new sqlite3.Database(path);


app.post("/createAccount", (req, res) => {//req.body.username  req.body.password   req.body.name   req.body.gmail req.body.admin
    let query = `SELECT * FROM users WHERE username = ?`;
        db.get(query, [req.body.username], (err, row) => {
            if(err){return (err)}
            console.log(row)
            if(!row){
                db.run(`INSERT INTO users(username, password, name, gmail, admin) VALUES ("${req.body.username}", "${req.body.password}", "${req.body.name}", "${req.body.gmail}", "${req.body.admin}")`)
                console.log("created account");
                return res.status(200).send()
            }else{
                console.log("the username is already used")
                return res.status(203).send("user already exists")
            }
    })
})

app.post("/deleteUser", (req, res) => {//req.body.username

    let query = `DELETE FROM users WHERE username = ?`;
    db.run(query, req.body.username, (err) => {
        console.log("user deleted")
        return res.status(200).send()
    })


})

app.post("/logIn", (req, res) => {//req.body.username  req.body.password

    let query = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.get(query, [req.body.username, req.body.password], (err, row) => {
            if (err) {
                console.log(err);
                return res.status(400).send()
            } else {
                console.log(!!row); // Resolves to true if row exists, false otherwise
                return res.status(200).send(!!row)
            }
    });

})


app.post("/createMachine", (req, res) => {//req.body.code  req.body.hangar  req.body.maintenance

    db.run(`INSERT INTO machineRegistry(code, hangar, maintenance, status) VALUES ("${req.body.code}", "${req.body.hangar}", "${req.body.maintenance}", "functional")`, err => {
        console.log("Added machineRegistry to server")
        return res.status(200).send();
    })

})

app.post("/deleteMachine", (req, res) => {//req.body.code

    db.run(`DELETE FROM machineRegistry WHERE code = "${req.body.code}"`, err => {
        return res.status(200).send();
    })

})

app.get("/getMachines", (req, res) => {

    let query = "SELECT * FROM machineRegistry";
    db.all(query, [], (err, rows) => {
        if(err){
            return res.status(404)
        }else{
            return res.status(200).send(rows);
        }
    })

})

app.get("/getRepairs", (req, res) => {

    let query = "SELECT * FROM repairRequests";
    db.all(query, [], (err, rows) => {
        if(err){
            return res.status(404)
        }else{
            return res.status(200).send(rows);
        }
    })

})

app.get("/getUsers", (req, res) => {

    let query = "SELECT * FROM users";
    db.all(query, [], (err, rows) => {
        if(err){
            return res.status(404)
        }else{
            return res.status(200).send(rows);
        }
    })

})

app.post("/createRepairRequest", (req, res) => {//req.body.machineCode  req.body.by  req.body.targetGroup  req.body.issue

    db.get("SELECT * FROM repairRequests WHERE machineCode = ?", [req.body.machineCode], (err, row) => {
        if(err){return res.status(404)}
        if(row){return res.status(404)}
        db.run(`INSERT INTO repairRequests(by, targetGroup, machineCode, issue) VALUES ("${req.body.by}", "${req.body.targetGroup}", "${req.body.machineCode}", "${req.body.issue}")`, err => {
            if(err){return res.status(404)}

            db.run(`UPDATE machineRegistry SET status = "in repairing" WHERE code = "${req.body.machineCode}"`, (err) => {
                return res.status(200).send()
            })
        });
        
    })

})


app.post("/addTool", (req, res) => {        //req.body.code     req.body.cabinetCode   req.body.rowCode   req.body.pieces

    db.run(`INSERT INTO partsRegistry(code, cabinetCode, rowCode, pieces) VALUES ("${req.body.code}", "${req.body.cabinetCode}", "${req.body.rowCode}", "${req.body.pieces}")`, err => {
        console.log("added tool")
        return res.status(200).send()
    })

})

app.post("/modifyToolInfo", (req, res) => {  //req.body.code  req.body.changeCategory   req.body.newValue

    db.run(`UPDATE partsRegistry SET ${req.body.changeCategory} = "${req.body.newValue}" WHERE code = "${req.body.code}"`, err => {
        if(err) return res.status(400).send();
        
        return res.status(200).send();
    })

})

app.post("/repairComplete", (req, res) => {//req.body.by   req.body.machineCode  req.body.issue (the issue identified after the repair)  req.body.usedParts -> object { pieceCode : number } 

    db.run('UPDATE machineRegistry SET status = "functional" WHERE code = ?', req.body.machineCode, err => {
        if (err) {
            console.error(err);
            return res.status(400).send();
        }

        db.get('SELECT * FROM repairRequests WHERE machineCode = ?', req.body.machineCode, (err, repairRequest) => {
            if (err) {
                console.error(err);
                return res.status(400).send();
            }

            console.log(repairRequest);

            db.run('DELETE FROM repairRequests WHERE machineCode = ?', req.body.machineCode, err => {
                if (err) {
                    console.error(err);
                    return res.status(400).send();
                }

                console.log("repair request deleted");

                Object.entries(req.body.usedParts).forEach(([key, value]) => {
                    db.get('SELECT * FROM partsRegistry WHERE code = ?', key, (err, row) => {
                        if (err) {
                            console.error(err);
                            return res.status(400).send();
                        }

                        console.log("iteration complete used parts");
                        db.run('UPDATE partsRegistry SET pieces = ? WHERE code = ?', [row.pieces - value, key]);
                    });
                });

                db.run('INSERT INTO repairHistory (code, repairedBy, requestedBy, partsUsed, issue) VALUES (?, ?, ?, ?, ?)', [req.body.machineCode, repairRequest.by, req.body.by, JSON.stringify(req.body.usedParts), req.body.issue]);

                return res.status(200).send()
            });
        });
    });

})




//createAccount({body: {username: "niiiigersssssssssssss(dani)", password: "Dawd", name: "Adwad", gmail: "Dawdaaa"}})
//deleteUser({body: {username: "user1"}})
//logIn({body: {username: "aa2", password : "Dawd"}});
//createMachine({body: {code: 112, hangar: "Dwa", maintenance: "dwasdawd"}})
//deleteMachine({body: {code: 312}})
//getMachines()
//getRepairs()
//getUsers()
//createRepairRequest({body:{ by: "awd", machineCode: 112, targetGroup: "daw", issue: "wda"}})
//addTool({body: {code: 9132, cabinetCode: 1, rowCode: 2, pieces: 32}});
//modifyToolInfo({body: {changeCategory: "cabinetCode", code: 6969, newValue: 3}})
//repairComplete({body: {by: "me", machineCode : 314, usedParts : {6969: 10, 9132: 2}, issue: "money"}})


app.listen(port, () => {
    console.log("Local server is running, time to chat :)")
})