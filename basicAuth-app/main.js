const express = require("express");
const { authRouter, flagBasedAuthentication, basicAuthencation } = require("./auth-router");

const users = [
    { id: 1, username: "aamirpare-1", email: "aamirpare-1@gmail.com" },
    { id: 2, username: "aamirpare-2", email: "aamirpare-2@gmail.com" },
    { id: 3, username: "aamirpare-3", email: "aamirpare-3@gmail.com" },
    { id: 4, username: "aamirpare-4", email: "aamirpare-4@gmail.com" },
    { id: 5, username: "aamirpare-5", email: "aamirpare-5@gmail.com" },
];

const PORT = 4200;
const listenMessage = `Server is listening on http://localhost:${PORT}`;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>Welcome to the Basic Authentication</h1>");
});

app.use(authRouter);

//auth Middleware

//Check this from the browser
app.use(flagBasedAuthentication);

//Check this by opening test.htpp and click GET endpoints 
//app.use(basicAuthencation);


app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/students", (req, res) => {
    res.send("<h1>Students are not allowed without authentication</h1>");
});

app.listen(PORT, () => console.log(listenMessage));