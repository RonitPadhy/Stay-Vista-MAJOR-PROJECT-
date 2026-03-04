const express = require("express");
const passport = require("passport");


module.exports.isLoggedIn = (req , res , next) => {
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in first!!");
        return res.redirect("/login");
    }
    next();
}