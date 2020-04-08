/* Contiene utils que constituyen cada uno de los métodos para el análisis de tokens; excepto el de los strings, que se
encuentra en app.js*/
const reserved = require('../common/reserved')
const charset = require('../common/charset')

function analizeId(currentPosition, i, currentCharacter, text, currentToken) {
    let tokenResult;
    while (charset.alphaNumeric.indexOf(currentCharacter) > -1) {
        currentPosition += 1;
        i += 1
        currentToken = currentToken + currentCharacter;
        currentCharacter = text[i]
    }
    if (reserved.indexOf(currentToken) < 0)
        tokenResult = `id,${currentToken}`
    else
        tokenResult = `${currentToken}`
    return { token: tokenResult, currentPosition, i }

}

function analizeSpecial(currentPosition, i, currentCharacter, text) {
    let tokenResult;
    let token = currentCharacter
    while (charset.special[token]) {
        tokenResult = charset.special[token]
        i += 1
        currentPosition += 1
        token += text[i]
    }
    return { token: tokenResult, currentPosition, i }
}

function analizeNumbers(currentPosition, i, currentCharacter, text, currentToken) {
    while (charset.numbers.indexOf(currentCharacter) > -1) {
            currentPosition += 1;
            i += 1
            currentToken = currentToken + currentCharacter;
            currentCharacter = text[i]
    }
    tokenResult = `tk_entero,${currentToken}`
    return { token: tokenResult, currentPosition, i }

}

module.exports = { analizeSpecial, analizeId, analizeNumbers }