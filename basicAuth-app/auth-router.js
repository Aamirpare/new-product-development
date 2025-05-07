const express = require("express");

let isAuthenticated = false;
const usrname = "admin";
const pwrd = "secret";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
    res.sendFile("./login.html", { root: __dirname });
});

authRouter.post("/login", (req, res) => {
   
    const { username, password } = req.body;
   
    if (username === usrname && password === pwrd) {
        isAuthenticated = true;
    }
    
    res.redirect("/");
});

//flag based authentication
const flagBasedAuthentication = (req, res, next) => {
    if (isAuthenticated) {
        return next();
    }
    return res.json({
        message: "you are not authenticated"
    });
};


//basic authentication
const basicAuthencation = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'basic');
        res.status = 401;
        return next(new Error("You are not authenticated..."));
    }
    const credentials = new Buffer.from(authHeader.split("Basic")[1], "base64");
    const token = credentials.toString().split(":");

    const username = token[0];
    const password = token[1];

    console.log("Username: ", username, "Password: ", password);

    if (username === 'admin' && password === "secret") {
        next();
    }
    else {
        res.setHeader("WWW-Authenticate", "basic");
        res.status = 401;
        return next(new Error("Please provide correct credentials..."));
    }
}

module.exports = { authRouter, flagBasedAuthentication, basicAuthencation };

