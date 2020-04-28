/*Contiene métodos que ayudan a la lectura de datos; la funcion 'lexer' es llamada como parámetro para cada uno de
los archivos leídos en la carpeta '/inputs'. Se decidió usar node-dir para la carga asíncrona */
const dir = require('node-dir')
const fs = require('fs')
const moment = require('moment')
const path = require('path')

let currentFile;
let currentDate;

moment().format()
currentDate = moment(new Date()).format("DD-MMM-YYYY-HH-mm-ss")

function writeContent(content, directoryOutputPath) {
    const currentFolder = path.join(directoryOutputPath, currentDate)
    if (!fs.existsSync(currentFolder)) {
        fs.mkdirSync(currentFolder);
    }
    fs.appendFileSync(path.join(currentFolder, `${currentFile}.result`), `${content}\n`, function (err) {
        if (err) throw err;
    });
}

function writeContentSyntactic(list, content, currentFile) {
    if (!list[currentFile]) {
        list[currentFile] = []
    }
    (list[currentFile]).push(content)
    return list
}

function readFiles(directoryInputPath, lexer, isSintactic) {
    return dir.readFiles(directoryInputPath,
        function (err, content, filename, next) {
            currentFile = filename.replace(directoryInputPath, '')
            lexer(content + '\0', isSintactic, currentFile)
            next()
        },
        function (err, files) {
            if (!isSintactic)
                console.log("¡El analizador léxico ha terminado!, por favor revisar /output para los resultados")
        }
    )
}

module.exports = { writeContent, readFiles, writeContentSyntactic }