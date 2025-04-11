const express = require("express");
const userRouter = express.Router();

const app = express();
const PORT = 9000;

const users = [
    { id: 1, name: "Palwisha-1", email: "palwisha-1@gamil.com", age: 35 },
    { id: 1, name: "Palwisha-2", email: "palwisha-2@gamil.com", age: 36 },
    { id: 1, name: "Palwisha-3", email: "palwisha-3@gamil.com", age: 37 },
    { id: 1, name: "Palwisha-4", email: "palwisha-4@gamil.com", age: 38 },
    { id: 1, name: "Palwisha-5", email: "palwisha-5@gamil.com", age: 39 },
];

//midlleware
app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
    console.log(Date.now().toLocaleString());
    next();
});

//root enpoint
app.get("/", (req, res) => {
    //res.send("<h1> Welcome to Express</h1>");
    res.sendFile(__dirname + "/index.html");
});

//user endpoint
app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    res.json({
        message: "Post request received",
        user: req.body
    });
});

app.put("/users", (req, res) => {
    res.json({
        message: "Put request received"
    });
});


//Api endpoints

userRouter.get("/v1/users", (req, res) => {
    res.json(users);
});
userRouter.post("/v1/users", (req, res) => {
    res.json(users);
});


app.use("/api", userRouter);




app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});