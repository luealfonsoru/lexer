// Lógica del analizador sintáctico, por favor definir los tokens sin '_' y en minúsculas por ejemplo "tk_NEWLINE" como "tknewline"

function buildStates() {
    let states = [
        { name: 'tkparcuaizq', from: '*', to: "list" },
        { name: 'true', from: 'list', to: "expr" },
        { name: 'false', from: 'list', to: "expr" },
        { name: 'tkentero', from: 'list', to: 'expr'},
        { name: 'tkcadena', from: 'list', to: 'expr'},
        { name: 'tkcoma', from: 'expr', to: 'list' },
        { name: 'tkparcuader', from: 'expr', to: "default" },

    ]
    return states
}

module.exports = { buildStates }