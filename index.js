const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const port = 3000;
const path = require('path');
const dbpath = path.join(__dirname,'day1.db');
const {open} = require("sqlite");
const { request } = require("http");

let db = null;
const initializeDBAndServer = async ()=>{
    try{
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        });
        app.listen(3000, ()=>{
            console.log(`Example app listening on port ${port}!`);
        })
    }catch(e){
        console.log(`DB error: ${e.message}`);
        process.exit(1);
    }
};
initializeDBAndServer();

app.use(express.json());

app.get("/", async (request, response) => {
    const query = `
        SELECT * FROM employee ORDER BY salary ASC
    `;
    const empArray = await db.all(query);
    response.send(empArray);
});

app.get('/:id',async (request,response)=>{
    const {id} = request.params;
    const idQuery = `SELECT * FROM employee WHERE empId = ${id}`;
    const empIdArray = await db.get(idQuery);
    response.send(empIdArray);
});

app.post('/emp',async(request,response)=>{
    // const empDetails = request.body;
    const addQuery = `INSERT INTO employee (empId,empName,email,salary) VALUES (${16},${"Ganesh"},${"ganesh@gmail.com"},${1589700});`;
    // const addResponse = await db.run(addQuery);
    response.send({addQuery});
});