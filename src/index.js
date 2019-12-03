"use strict"
const fs = require("fs"); //Lee todo el contenido de un archivo.
const pathN = require("path"); //ruta
const marked = require('marked'); //Libreria para obtener links, text, file
//const { getStatus } = require('./lib/axios');
const axios = require('axios')

//Accedo a la ruta escrita en la consola
let path = process.argv[2];
// convierte en ruta absoluta la ruta ingresada (path.resolve)
path = pathN.resolve(path);
//Corrige la ruta en caso de . y '' mal aplicadas
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

//Funcion Obtener array de objet
const getLinks = () => {

    const res = new Promise((resolve, reject) => {
        fileRead()
            .then(data => {

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
                if (links.length === 0) {
                    reject(new Error("Este archivo no contiene links"))
                }
                resolve(links);

            }).catch(err => reject(err.messsage))
    })
    return res;
}

//Funcion que crea un array de links

const Links = () => {

    const arraylinks = new Promise((resolve, reject) => {
        getLinks()
            .then(res => {
                let createarraylinks = res.map(item => {
                    return { href: item.href }
                })
                resolve(createarraylinks)
            })
            .catch(err => reject(err.messsage))
    })
    return arraylinks
}

//Funcion para validar el url

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

//Funcion que hara la peticion
const getStatus = (url) => {
    const data = new Promise((resolve, reject) => {
        const isUrl = validURL(url)
        if (isUrl) {
            axios.get(url)
                .then((result) => {
                    //console.log(`${result.status} ${url}`);

                    resolve({
                        code: result.status,
                        url
                    })
                })
                .catch((err) => {
                    console.log(`${err.message}`);
                    reject(err.message)
                });
        }

    })
    return data

}
console.log(data);

const getStatistics = () => {
    const statistics = new Promise((resolve, reject) => {
        Links()
            .then(arraylinks => {
                const arrayActivos = [];
                const arrayRotos = [];
                for (let i = 0; i < arraylinks.length; i++) {
                    let url = arraylinks[i];
                    //  console.log(url.href);
                    getStatus(url.href)
                        .then((result) => {
                            if (result.code === 200) {
                                arrayActivos.push(result.url)
                            } else {
                                arrayRotos.push(result.url)
                            }
                        }).catch((err) => {
                            console.log(`error 1: ${err}`);
                        });
                }


                // console.log('//////////   ARRAY ACTIVOS  //////////////');
                // console.log(arrayActivos);


                // console.log('//////////    ARRAY ROTOS  //////////////');
                // console.log(arrayRotos);
                // resolve(url)
            })
            // .catch(err => reject(err.messsage))

    })
    return getStatistics
}

getStatistics()