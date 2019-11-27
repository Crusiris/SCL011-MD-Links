"use strict"
const fs = require("fs"); //Lee todo el contenido de un archivo.
const pathN = require("path");
const markdownLinkExtractor = require('markdown-link-extractor'); //Libreria para extraer links

//Funcion  de tipo promesa para leer archivo Markdown

const getLink = () => {
    const data = new Promise((resolve, reject) => {
        let path = process.argv[2];
        path = pathN.resolve(path);
        //Obtengo de forma sincrona el archivo markdown con un metodo de node
        fs.readFile(path, 'utf-8', (err, result) => {
            if (err) {
                reject(`${err}`)
            }
            resolve(result);
        })
    })
    return data;
}


getLink()
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error(error.message)
    });



// const getLink = () => {
//     //Obtengo de forma sincrona el archivo markdown con un metodo de node
//     let markdown = fs.readFileSync('./README.md', 'utf-8');
//     console.log(markdown);

//     // El archivo markdown es pasado como argumento al módulo extractor de links
//     let links = markdownLinkExtractor(markdown);

//     // Imprimo todos los links
//     links.forEach(function(link) {
//         console.log(link);
//     });
// }



// module.exports = {
//     getLink
// };