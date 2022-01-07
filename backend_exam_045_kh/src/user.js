const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
const {query} = require("express");

const dbinfo = {
    host:"localhost",
    user:"Harshad",
    password:"cdac",
    database:"message",
};

async function connectionCheck(){
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    console.log("connections established successfully");
    await connection.endAsync();

}

async function addmsg(msg) {
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    let sql = `insert into messages(message) values (?)`;
    await connection.queryAsync(sql,[msg.message]);
    console.log("message added successfully");
    await connection.endAsync();
}

//connectionCheck();

const msg ={message:"hello everyone"};
addmsg(msg);

async function showmsg() {
    const connection = mysql.createConnection(dbinfo);
    await connection.connectAsync();
    let sql = `select * from  messages`;
    const list = await connection.queryAsync(sql, []);
    await connection.endAsync();
   
    console.log("message selected successfully");
    console.log(list);
    return list;
   
}

showmsg();

module.exports ={showmsg,addmsg};