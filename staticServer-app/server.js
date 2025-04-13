/*
    Author:         Aamir Pare
    Description:    This is an implementation of a Static Server in Node JS.
                    The purpose of this implementation is to provide students knowledge
                    how a static files can be served in a Node JS application by writing 
                    code from ground zero.
                    Another learning outcome is to attract students to start an assignments with 
                    this implementation and extend it to the next level.
    Location:       G-11/4 Home, Islamabad
    Date    :       7th March, 2025
*/
const http = require("http");
const url = require("url");
const fs = require("fs");
const mimeTypes = require("mime-types");
const path = require("path");
const { searchFileAsync } = require("./local-modules/search-file");

//Execute the below command if the terminal not installs npm packages
//Command:  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

const port = 4500;

const server = http.createServer((req, res) => {
    //handle the request and send back a static file from the public folder 
    let parsedUrl = url.parse(req.url, true);

    //remove the leading and trailing slashes.
    //let urlPath = parsedUrl.path.replace(/^\/+|\/+$/g, "");

    let urlPath = parsedUrl.path.substring(parsedUrl.path.lastIndexOf("/") + 1, parsedUrl.path.length);

    urlPath = urlPath === "" ? "index.html" : urlPath;

    console.log(`Requested Path ${urlPath}`);

    // let file = __dirname + "/public/" + urlPath;
    // console.log(file);

    let file = searchFileAsync("./public", urlPath);
    console.log("result: " + file);

    file = file === null ? path.join("/public", "index.html") : file;

    fs.readFile(file, (err, content) => {
        if (err) {
            console.log(`File not found ${file}`);
            res.writeHead(404);
            res.end();
        }
        else {
            //specify the content type in the response
            console.log(`Returning Path ${urlPath}`);
            //Setting 'nosniff' header tells the browser don't try to determine the content-type yourself, 
            //i am going to tell you. 
            //res.setHeader("X-Content-Type-Options", "nosniff");
            let mime = mimeTypes.lookup(urlPath);
            res.writeHead(200, { "Content-Type": mime });
            // switch (urlPath) {
            //     case "main.css":
            //         res.writeHead(200, { "Content-Type": "text/css" });
            //         break;
            //     case "main.js":
            //         res.writeHead(200, { "Content-Type": "application/javascript" });
            //         break;
            //     case "index.html":
            //         res.writeHead(200, { "Content-Type": "text/html" });
            // }
        }
        res.end(content);
    });
});

server.listen(port, () => {
    console.log(`Server listenting on port http://localhost:${port}`)
});
