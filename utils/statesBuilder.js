// Lógica del analizador sintáctico, por favor definir los tokens sin '_' y en minúsculas por ejemplo 'tk_NEWLINE' como 'tknewline'

function buildStates() {
    let states = [
        { name: 'tkparcuaizq', from: 'default', to: 'list' },
        { name: 'true', from: 'list', to: 'expr' },
        { name: 'false', from: 'list', to: 'expr' },
        { name: 'tkentero', from: 'list', to: 'expr'},
        { name: 'tkcadena', from: 'list', to: 'expr'},
        { name: 'tkcoma', from: 'expr', to: 'exprlist' },
        { name: 'true', from: 'exprlist', to: 'expr' },
        { name: 'false', from: 'exprlist', to: 'expr' },
        { name: 'tkentero', from: 'exprlist', to: 'expr'},
        { name: 'tkcadena', from: 'exprlist', to: 'expr'},
        { name: 'tkparcuader', from: 'expr', to: 'default' },
        { name: 'tkparcuader', from: 'list', to: 'default' },
        { name: 'tknewline', from: 'default', to: 'default'},
        { name: 'tkentero', from: 'default', to:'aritmetic'},
        { name: 'tkadicion', from: 'aritmetic', to:'aroperator'},
        { name: 'tkmenos', from:'aritmetic', to:'aroperator'},
        { name: 'tkmultiplicacion', from:'aritmetic', to: 'aroperator'},
        { name: 'tkdivision', from:'aritmetic', to: 'aroperator'},
        { name: 'tkentero', from:'aroperator', to: 'aritmetic'},
        { name: 'tkfinal', from: 'default', to:'default'},
        { name: 'tkfinal', from: 'aritmetic', to:'default'}
        

    ]
    return states
}

module.exports = { buildStates }