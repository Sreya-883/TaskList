const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const { useParams } = require("react-router-dom");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todolistdb'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

db.connect((error)=>{
    if(error){
        console.log('Error!! cannott connect to database:', error);
    }else{
        console.log('DataBase Connection Successful');
    }
});

app.get('/api/get',(request,response)=>{
    const sqlSelect = 'SELECT * FROM tasklist';
    db.query(sqlSelect,(err,result)=>{
        response.send(result)
    })
})

app.delete('/api/delete/:id',(request,response)=>{
    
    let delId=parseInt(request.params.id,10);
    console.log(delId);
    const sqlDelete = "DELETE FROM tasklist WHERE id = ?";
    db.query(sqlDelete,[delId],(error,result)=>{
        response.send({message:"Succesfully deleted"});
    })
    
})

app.put('/api/update/:id',(request,response)=>{
    let updateId = parseInt(request.params.id,10);
    console.log(updateId);
    const sqlUpdate = "UPDATE tasklist SET task = ? , startTime = ? , endTime = ?, priority = ? , personal=?,status = ? WHERE id = ?";
    db.query(sqlUpdate,[request.body.task,request.body.startTime,request.body.endTime,request.body.priority,request.body.personal,request.body.status,updateId],(error,resul)=>{
        response.send({message:"Updated Successfully"})
    })
})

app.post('/api/post', (request, response)=>{

    const task = request.body.task;
    const startTime = request.body.startTime;
    const endTime = request.body.endTime;
    const priority = request.body.priority;
    const personal=request.body.personal;
    const status = request.body.status;


    const sqlInsert = "INSERT INTO tasklist (task,startTime,endTime,priority,personal,status) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert,[task,startTime,endTime,priority,personal,status],(err,result)=>{
        response.send(result);
    });
});

app.listen(3001, ()=>{console.log("Server running on port 3001..")});