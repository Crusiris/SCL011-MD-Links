"use strict"
const fs = require("fs"); //Lee todo el contenido de un archivo.
const path = require("path");



const getLink = () => {
    //Obtengo de forma sincrona el archivo markdown con un metodo de node
    let markdown = fs.readFileSync('./README.md', 'utf-8');
    console.log(markdown);

}


getLink();

module.exports = {
    getLink
};