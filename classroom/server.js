const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const cookieParser = require("cookie-parser");
app.use(cookieParser("SecretCode"));
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
  };

app.use(
  session(sessionOptions)
);

app.use(flash());

app.get("/register",(req,res) =>{
    let { name ="Anonymous" } = req.query;
    req.session.name = name;
    console.log(req.session.name);
    req.flash("Success","User registered successfully");
    res.redirect("/hello");
});

app.get("/hello",(req,res) =>{
  // res.send(`Hello Mr. ${req.session.name}`);
  res.render("page.ejs" , {name:req.session.name});
})

// app.get("/test",(req,res) =>{
//     res.send("Test is successful");
// })

// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count = 1;
//     }
//     res.send(`The request is sent ${req.session.count} number of times`);
// });

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
  console.log("Server is listening to the request on 3000");
});
