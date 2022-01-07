const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const {showmsg,addmsg} =  require("./user");

app.get("/users",async (req,res) => {
    const list = await showmsg();
    res.json(list);
});

app.post("/user-msg",async(req,res) => {
    const msg = req.body;
    await addmsg(msg);
    res.json({message:"message added successfully"});
});

app.listen(4000, () => {
    console.log("server started successfully!!!");
});
