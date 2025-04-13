/*
    Author:         Aamir Pare
    Description:    Building a static file server in Node JS. 
                    Express provides a static middleware for this purpose.
                    But wirting yourself from the gound zeor helps students to 
                    understand clearly how things work at low level.
    Date: 08 March, 2025
    Location: G-11/4 Home, Islamabad

    The Problem Building the Static Server in Node JS
    =================================================
    1. Create an HTTP Server to serve the static content.  
    2. It must server different type of file, normally css, javascript, png, jpg, ico, json and etc..
    4. Must default to the index.html at the root leve request.
    4. Must default to the index.html in the subfolders of public folder, when path doesn't contain the file.
    5. Must set the content type according to the resource to be served.
    6. Must serve a 404 if the resource doen't exist.
*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    // Construct the file path based on the request URL
    let filePath = path.join(PUBLIC_DIR, req.url);

    //Default to index.html in subfolders of the Public folder
    filePath = path.extname(filePath) === "" ? path.join(filePath, "index.html") : filePath;

    // Default to index.html if the request URL is '/'
    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    }

    // Check if the file doen't exist
    if (!fs.existsSync(filePath)) {
        // If the file doesn't exist, return a 404 response
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
    }

    // Read the file and serve it
    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.log("File not found: " + filePath);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        res.setHeader("X-Content-Type-Options", "nosniff");
        // Set the content type and serve the file
        const contentType = getContentType(path.extname(filePath));
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//This method determines the content type based on the file extension
function getContentType(extname) {
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.mp3':
            contentType = 'audio/mpeg';
            break;
    }
    return contentType;
}