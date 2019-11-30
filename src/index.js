"use strict"
const fs = require("fs"); //Lee todo el contenido de un archivo.
const pathN = require("path");
//const markdownLinkExtractor = require('markdown-link-extractor'); //Libreria para extraer links
const marked = require('marked'); //Libreria para obtener links, text, file

let path = process.argv[2];
// convierte en ruta absoluta la ruta ingresada (path.resolve)
path = pathN.resolve(path);
path = pathN.normalize(path);

//Funcion  de tipo promesa para leer archivo Markdown
const fileRead = () => {
    const data = new Promise((resolve, reject) => {

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

const getLinks = () => {

    const res = new Promise((resolve, reject) => {
        fileRead()
            .then(data => {
                let final;
                let links = [];
                let renderer = new marked.Renderer();

                renderer.link = function(href, title, text) {

                    links.push({
                        href: href,
                        text: text,
                        file: path

                    })

                };

                marked(data, { renderer: renderer });
                resolve(links);

            }).catch(err => reject(err.messsage))
    })
    return res;
}

getLinks().then(res => console.log(res));