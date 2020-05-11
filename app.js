/* Contiene la logica principal del analizador léxico, se realiza el análisis por medio de condicionales y los métodos de 
/utils/analizers */
const charset = require('./common/charset')
const path = require('path')
const { analizeSpecial, analizeId, analizeNumbers, analyzeSyntactic } = require('./utils/analizers')
const { readFiles, writeContent, writeContentSyntactic } = require('./utils/files')
const { promisify } = require('util');

let currentPosition;
let currentRow;
let initPosition
let text;

const directoryInputPath = path.join(__dirname, 'input')
const directoryOutputPath = path.join(__dirname, 'output')

readFiles(directoryInputPath, lexer, false)

function lexer(content, isSyntactic, currentFile) {
    let i = 0
    let list = {}
    let spaceCounter = 0;
    text = content
    currentPosition = 1
    currentRow = 1
    while (i < text.length) {
        let currentCharacter = text[i];
        let currentToken = '';
        let result;
        initPosition = currentPosition;
        if(currentCharacter !== ' '){
            spaceCounter = 0;
        }
        if (charset.alpha.indexOf(currentCharacter) > -1) {
            result = analizeId(currentPosition, i, currentCharacter, text, currentToken, isSyntactic)
            currentPosition = result.currentPosition
            i = result.i
            currentToken = result.token
            if (isSyntactic != false)
                list = writeContentSyntactic(list, { token: currentToken, row: currentRow, col: initPosition }, currentFile)
            else
                writeContent(`<${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
        } else if (currentCharacter === "\n") {
            if (isSyntactic != false)
                list = writeContentSyntactic(list, { token: 'tk_NEWLINE', row: currentRow, col: currentPosition }, currentFile)
            currentPosition = 1;
            currentRow += 1;
            i += 1;
        } else if (currentCharacter === "\0") {
            currentPosition += 1;
            i += 1;
        } else if (currentCharacter === " ") {
            currentPosition += 1;
            i += 1;
            spaceCounter += 1;
            if(spaceCounter === 4){
                writeContentSyntactic(list, { token: 'tk_DENT', row: currentRow, col: currentPosition - 4 }, currentFile)
                spaceCounter = 0;
            }
        } else if (currentCharacter === '\r') {
            i += 1;
        } else if (currentCharacter === "\t") {
            currentPosition += 4;
            i += 1;
            if (isSyntactic != false)
                list = writeContentSyntactic(list, { token: 'tk_DENT', row: currentRow, col: currentPosition }, currentFile)
        } else if (charset.special[currentCharacter]) {
            result = analizeSpecial(currentPosition, i, currentCharacter, text)
            currentPosition = result.currentPosition
            i = result.i
            currentToken = result.token
            if (isSyntactic != false)
                list = writeContentSyntactic(list, { token: currentToken, row: currentRow, col: initPosition }, currentFile)
            else
                writeContent(`<${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
        } else if (currentCharacter === `"`) {
            // Los strings tienen una consideración adicional: las comillas dobles no son caracter terminal para string si están precedidos por '\'
            let nextCharacter;
            let validString = true;
            let endString = false;
            currentToken = currentToken + currentCharacter;
            currentPosition += 1;
            i += 1;
            currentCharacter = text[i];
            while (!endString && currentCharacter !== '\n' && currentCharacter !== "\0") {
                currentCharacter = text[i];
                nextCharacter = text[i + 1];
                currentToken = currentToken + currentCharacter;
                if (currentCharacter === "\\" && nextCharacter !== '"' && nextCharacter !== 'n' && nextCharacter !== '\\' && nextCharacter !== 't') {
                    validString = false;
                    endString = true
                } else if (currentCharacter === "\\") {
                    currentToken += nextCharacter
                    currentPosition += 2;
                    i += 2;
                } else if (currentCharacter === '"') {
                    endString = true
                    currentPosition += 1;
                    i += 1;
                } else {
                    currentPosition += 1;
                    i += 1;
                }

            }
            if (currentCharacter === '"') {
                isSyntactic !== false ? list = writeContentSyntactic(list, { token: "tk_cadena", row: currentRow, col: initPosition }, currentFile) :
                    writeContent(`<tk_cadena,${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
            } else {
                i = text.length + 1;
                isSyntactic !== false ? null :
                    writeContent(`>> Error léxico(linea:${currentRow},posición:${currentPosition})`, directoryOutputPath)
            }
        } else if (currentCharacter === "#") {
            while (currentToken !== "\n" && currentToken !== "\0") {
                i += 1;
                currentToken = text[i];
            }
        } else if (charset.numbers.indexOf(currentCharacter) > -1) {
            result = analizeNumbers(currentPosition, i, currentCharacter, text, currentToken)
            currentPosition = result.currentPosition
            i = result.i
            currentToken = result.token
            isSyntactic !== false ? list = writeContentSyntactic(list, { token: currentToken, row: currentRow, col: initPosition }, currentFile) :
                writeContent(`<${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
        } else if (currentCharacter === '-') {
            // El caracter '-' constituye un caso especial, y se puede convertir en parte de un token numérico, o un token definido en /common/charset.js
            let nextCharacter = text[i + 1];
            let nextToken = currentCharacter + nextCharacter
            if (charset.special[nextToken]) {
                i += 1;
                currentPosition += 1;
                result = analizeSpecial(currentPosition, i, nextToken, text)
                currentPosition = result.currentPosition
                i = result.i
                currentToken = result.token
                isSyntactic !== false ? list = writeContentSyntactic(list, { token: currentToken, row: currentRow, col: initPosition }, currentFile) :
                    writeContent(`<${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
            } else if (charset.numbers.indexOf(nextCharacter) > -1) {
                i += 1;
                currentPosition += 1;
                currentToken = currentCharacter;
                currentCharacter = text[i]
                result = analizeNumbers(currentPosition, i, currentCharacter, text, currentToken)
                currentPosition = result.currentPosition
                i = result.i
                currentToken = result.token
                isSyntactic !== false ? list = writeContentSyntactic(list, { token: currentToken, row: currentRow, col: initPosition }, currentFile) :
                    writeContent(`<${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
            } else {
                isSyntactic !== false ? list = writeContentSyntactic(list, { token: 'tk_menos', row: currentRow, col: initPosition }, currentFile) :
                    writeContent(`<tk_menos,${initPosition}>`, directoryOutputPath)
                i += 1;
                currentToken = text[i];
            }
        } else if (charset.binary.indexOf(currentCharacter) > -1) {
            //los caracteres 'binarios' consituyen un error si no se encuentran precediendo a un caracter que los convierte en tokens
            let nextCharacter = text[i + 1];
            let nextToken = currentCharacter + nextCharacter
            if (charset.special[nextToken]) {
                i += 1;
                currentPosition += 1;
                result = analizeSpecial(currentPosition, i, nextToken, text)
                currentPosition = result.currentPosition
                i = result.i
                currentToken = result.token
                isSyntactic !== false ? list = writeContentSyntactic(list, { token: currentToken, row: currentRow, col: initPosition }, currentFile) :
                    writeContent(`<${currentToken},${currentRow},${initPosition}>`, directoryOutputPath)
            } else {
                i = text.length + 1;
                isSyntactic !== false ? null :
                    writeContent(`>> Error léxico(linea:${currentRow},posición:${initPosition})`, directoryOutputPath)
            }

        } else {
            i = text.length + 1;
            isSyntactic !== false ? null :
                writeContent(`>> Error léxico(linea:${currentRow},posición:${initPosition})`, directoryOutputPath)
        }
    }
    isSyntactic !== false ? list = writeContentSyntactic(list, { token: "tkfinal", row: currentRow, col: currentPosition }, currentFile) : null
    if (list[currentFile]) analyzeSyntactic(list)
}

module.exports = { readFiles, directoryInputPath, lexer }