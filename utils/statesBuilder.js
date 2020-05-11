// Lógica del analizador sintáctico, por favor definir los tokens sin '_' y en minúsculas por ejemplo 'tk_NEWLINE' como 'tknewline'

function buildStatesExpr() {
    const baseStates = [
        { name: 'tkparcuaizq', from: 'default', to: 'list' },
        { name: 'true', from: 'list', to: 'expr' },
        { name: 'false', from: 'list', to: 'expr' },
        { name: 'tkentero', from: 'list', to: 'expr' },
        { name: 'tkcadena', from: 'list', to: 'expr' },
        { name: 'tkcoma', from: 'expr', to: 'exprlist' },
        { name: 'true', from: 'exprlist', to: 'expr' },
        { name: 'false', from: 'exprlist', to: 'expr' },
        { name: 'tkentero', from: 'exprlist', to: 'expr' },
        { name: 'tkcadena', from: 'exprlist', to: 'expr' },
        { name: 'tkparcuader', from: 'expr', to: 'default' },
        { name: 'tkparcuader', from: 'list', to: 'default' },
        { name: 'tknewline', from: 'default', to: 'default' },
        { name: 'tkentero', from: 'default', to: 'aritmetic' },
        { name: 'tkadicion', from: 'aritmetic', to: 'aroperator' },
        { name: 'tkmenos', from: 'aritmetic', to: 'aroperator' },
        { name: 'tkmultiplicacion', from: 'aritmetic', to: 'aroperator' },
        { name: 'tkdivision', from: 'aritmetic', to: 'aroperator' },
        { name: 'tkentero', from: 'aroperator', to: 'aritmetic' },
        { name: 'tkfinal', from: 'default', to: 'default' },
        { name: 'tkfinal', from: 'aritmetic', to: 'default' },
        { name: 'tkid', from: 'default', to: "let" },
        { name: 'tkdospuntos', from:'let', to:'letdefine'},
        { name: 'int', from: 'letdefine', to: "lettype" },
        { name: 'bool', from: 'letdefine', to: "lettype" },
        { name: 'str', from: 'letdefine', to: "lettype" },
        { name: 'tkasig', from: 'lettype', to: "letasig" },
        { name: 'tkentero', from: 'letasig', to: "letfinal" },
        { name: 'tkcadena', from: 'letasig', to: "letfinal" },
        { name: 'True', from: 'letasig', to: "letfinal" },
        { name: 'False', from: 'letasig', to: "letfinal" },
        { name: 'tknewline', from: 'letfinal', to: "default" },
        { name: 'tkfinal', from: 'letfinal', to: "default" },



    ]
    let states = [
        ...baseStates,
        ...addIdentStates(baseStates, "class"),
        ...addIdentStates(baseStates, "definition"),
        { name: 'class', from: 'default', to: 'defclass' },
        { name: 'tkid', from: 'defclass', to: 'defclass' },
        { name: 'tkparizq', from: 'defclass', to: 'defclasspar' },
        { name: 'tkid', from: 'defclasspar', to: 'defclassid' },
        { name: 'tkparder', from: 'defclassid', to: 'defclasspar' },
        { name: 'tkdospuntos', from: 'defclasspar', to: 'defclassnewline' },
        { name: 'tknewline', from: 'defclassnewline', to: 'defaultclassdent' },
        { name: 'tkdent', from: 'defaultclassdent', to: 'defaultclass' },
        { name: 'def', from: 'default', to: "defdefinition" },
        { name: 'tkid', from: "defdefinition", to: "namedefinition" },
        { name: 'tkparizq', from: "namedefinition", to: "contentdefinition" },
        { name: 'tkid', from: "contentdefinition", to: 'vardefinition' },
        { name: 'tkdospuntos', from: 'vardefinition', to: "asigndefinition" },
        { name: 'tkparcuaizq', from: "asigndefinition", to: 'arraytypedefinition' },
        { name: 'int', from: 'arraytypedefinition', to: "arraytypespecdefinition" },
        { name: 'bool', from: 'arraytypedefinition', to: "arraytypespecdefinition" },
        { name: 'str', from: 'arraytypedefinition', to: "arraytypespecdefinition" },
        { name: 'tkparcuader', from: 'arraytypespecdefinition', to: "arrayclosetypedefinition" },
        { name: 'tkcoma', from: "arrayclosetypedefinition", to: "contentdefinition" },
        { name: 'int', from: "asigndefinition", to: 'arrayclosetypedefinition' },
        { name: 'bool', from: "asigndefinition", to: 'arrayclosetypedefinition' },
        { name: 'str', from: "asigndefinition", to: 'arrayclosetypedefinition' },
        { name: 'tkparder', from: "arrayclosetypedefinition", to: 'returndefinition' },
        { name: 'int', from: 'returntypedefinition', to: 'dospuntosdefinition' },
        { name: 'bool', from: 'returntypedefinition', to: 'dospuntosdefinition' },
        { name: 'str', from: 'returntypedefinition', to: 'dospuntosdefinition' },
        { name: 'tkejecuta', from: 'returndefinition', to: "returntypedefinition" },
        { name: 'tknewline', from: "prenewlinedefinition", to: "identdefinition" },
        { name: "tkdent", from: "identdefinition", to: "defaultdefinition" },
        { name: "tkdospuntos", from: "dospuntosdefinition", to: "prenewlinedefinition" },
        { name: 'tkdent', from:"defaultdefinition", to:"defaultdefinition"}


    ]
    return states
}

function addIdentStates(statesTo, identifier) {
    let newArray = []
    let states = statesTo.slice(0)
    for (var i = 0; i < states.length; ++i) {
        newArray.push({})
        newArray[i].from = states[i].from + identifier
        newArray[i].to = states[i].to + identifier
        newArray[i].name = states[i].name
    }
    return newArray;
}

module.exports = { buildStatesExpr }