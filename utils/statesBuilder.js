// Lógica del analizador sintáctico, por favor definir los tokens sin '_' y en minúsculas por ejemplo "tk_NEWLINE" como "tknewline"

function buildStates() {
    let states = [
        { name: 'tkparcuaizq', from: 'default', to: "list" },
        { name: 'true', from: 'list', to: "expr" },
        { name: 'false', from: 'list', to: "expr" },
        { name: 'tkentero', from: 'list', to: 'expr'},
        { name: 'tkcadena', from: 'list', to: 'expr'},
        { name: 'tkcoma', from: 'expr', to: 'exprlist' },
        { name: 'true', from: 'exprlist', to: "expr" },
        { name: 'false', from: 'exprlist', to: "expr" },
        { name: 'tkentero', from: 'exprlist', to: 'expr'},
        { name: 'tkcadena', from: 'exprlist', to: 'expr'},
        { name: 'tkparcuader', from: 'expr', to: "default" },
        { name: 'tkparcuader', from: 'list', to: "default" },
        { name: 'tknewline', from: 'default', to: "default"},
        { name: 'tkid', from: 'list', to: 'expr'},
        { name: 'tkid', from: 'expr', to: 'exprlist'}

    ]
    return states
}

module.exports = { buildStates }