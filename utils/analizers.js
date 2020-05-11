/* Contiene utils que constituyen cada uno de los métodos para el análisis de tokens; excepto el de los strings, que se
encuentra en app.js*/
const reserved = require('../common/reserved')
const charset = require('../common/charset')
const StateMachine = require('javascript-state-machine');
const statesBuilder = require('./statesBuilder')


function analizeId(currentPosition, i, currentCharacter, text, currentToken, isSyntactic) {
    let tokenResult;
    while (charset.alphaNumeric.indexOf(currentCharacter) > -1) {
        currentPosition += 1;
        i += 1
        currentToken = currentToken + currentCharacter;
        currentCharacter = text[i]
    }
    if (reserved.indexOf(currentToken) < 0)
        tokenResult = isSyntactic ? 'tk_id' : `id,${currentToken}`
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
    tokenResult = `tk_entero`
    return { token: tokenResult, currentPosition, i }

}

let hasError = false

function analyzeSyntactic(list) {
    let fsmExpr = new StateMachine({
        init: 'default',
        transitions: statesBuilder.buildStatesExpr(),
        methods: {
            onLeaveState: function () { },
            onEnterState: function () {
                //console.log(this.state)
            },
            onTransition: function (lifecycle, arg1, arg2) {
                if (lifecycle.from === 'error' && lifecycle.to === 'error') {
                    console.log("error de identación")
                };
            }
        },
    })
    let tokenList = list[Object.keys(list)[0]]
    let currentFile = Object.keys(list)[0]
    for (let i = 0; i < tokenList.length; i++) {
        let element = tokenList[i]
        let currentToken = element.token.replace(/_/g, '').toLowerCase()
        if (hasError === false) {
            try {
                eval(`fsmExpr.${currentToken}()`)
            } catch (error) {
                hasError = true
                console.log(`${currentFile}: <${element.row},${element.col}> Error sintactico: se encontró ${currentToken}; se esperaba ${fsmExpr.transitions()}`)
            }

        }
    }
    if (!hasError) {
        console.log(`¡El analizador sintáctico ha termiado para ${currentFile} sin errores!`)
    }
}

module.exports = { analizeSpecial, analizeId, analizeNumbers, analyzeSyntactic }