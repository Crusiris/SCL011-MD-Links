"use strict"
const fs = require("fs"); //Lee todo el contenido de un archivo.
const path = require("path");
const markdownLinkExtractor = require('markdown-link-extractor');



const getLink = () => {
    //Obtengo de forma sincrona el archivo markdown con un metodo de node
    let markdown = fs.readFileSync('./README.md', 'utf-8');
    console.log(markdown);

    // El archivo markdown es pasado como argumento al módulo extractor de links
    let links = markdownLinkExtractor(markdown);

    // Imprimo todos los links
    links.forEach(function(link) {
        console.log(link);
    });
}


getLink();

module.exports = {
    getLink
};