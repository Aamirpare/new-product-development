/*
    Author:         Aamir Pare
    Description:    This module contains two functions, searchFileSync and searchFile.
                    searchFileSync is synchronous and searchFile is asynchronous version 
                    of the same file serch functionality. 
                    Both functions takes a directory and file to be searched inputs and looks
                    for the file recursively.
    Location:       G-11/4 Home, Islamabad
    Date    :       7th March, 2025
*/


const fs = require("fs");
const path = require("path");


//Synchrounous file search.
function searchFileAsync(dir, fileName) {

    if (!fs.existsSync(path.resolve(dir))) return null;

    //read the contents of the directory
    const files = fs.readdirSync(dir);

    //Search through the file
    for (const file of files) {
        //build the full urlPath of the file
        const filePath = path.join(dir, file);

        //get the file stats
        const fileStat = fs.statSync(filePath);

        //if the file is a directory, recursively search the directory
        if (fileStat.isDirectory()) {
            const result = searchFileAsync(filePath, fileName);
            if (result) return result;
        }
        else if (fileStat.isFile() && file.endsWith(fileName)) {
            //if the file is a match, use it 
            return path.resolve(filePath);
        }
    }

    return null;
}


//Asychronous version of search file
function searchFile(dir, fileName, callback) {

    if (!fs.existsSync(path.resolve(dir))) return null;

    //read the contents of the directory
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        //Search through the file
        for (const file of files) {
            //build the full urlPath of the file
            const filePath = path.join(dir, file);

            //get the file stats
            fs.stat(filePath, (err, fileStat) => {
                if (err) throw err;

                //if the file is a directory, recursively search the directory
                if (fileStat.isDirectory()) {
                    searchFile(filePath, fileName, callback);
                }
                else if (fileStat.isFile() && file.endsWith(fileName)) {
                    //if the file is a match, use it 
                    callback(path.resolve(filePath));
                }
                else {
                    callback(null);
                }
            });
        }
    });
}

////Test APIs
// const result = searchFileAsync("../public", "main.css");
// console.log(result);

// searchFile("../public", "main.css", (result) => {
//     if (result) console.log(result);
// });


module.exports = { searchFileAsync, searchFile };