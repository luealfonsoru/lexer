// Lógica del analizador sintáctico, por favor definir los tokens sin '_' por ejemplo "tk_NEWLINE" como "tkNEWLINE"

function buildStates() { 
    let states = [
        { name: 'tkNEWLINE', from: '*', to: 'newLiner' }
    ]
    return states
}

module.exports = { buildStates }