const express = require("express");
const router = express.Router();

//Posts
router.get("/posts",(req,res) =>{
    res.send("Hi,I am post root");
});

router.get("/posts/:id",(req,res) =>{
    res.send("Show route for  post ID");
})

router.post("/posts",(req,res) =>{
    res.send("POST route is working well");
});

router.delete("/posts/:id",(req,res) =>{
    res.send("Delete route is working well");
})

module.exports = router;
