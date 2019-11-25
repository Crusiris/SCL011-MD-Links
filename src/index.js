//Desde este archivo debes exportar una función (mdLinks).

//Fs es un modulo de node que se encarga comunicarse con el sistema de archivos de la computadora
const fs = require("fs"); //Lee todo el contenido de un archivo.

const path = require("path");

//Asincrono
fs.readFile('./README.md', 'utf-8', (error, data) => {

    if (error) {
        console.log(`Error ${error}`);
    } else {
        console.log(data);
    }
})

//  module.exports = () => {


// };