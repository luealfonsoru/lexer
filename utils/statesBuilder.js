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
=======
//Se incluye la lógica para el análsis sintáctico descendente con conjuntos de prediccción - LL(1)

/**
 * Basado en el LL(1) Parser de Dmitry Soshnikov 
* Primeros:
* 
* Los primeros  son todo lo que se encuentra en la primera posición de una derivación.
* Si tenemos una producción `A -> aB`, entonces el símbolo` a` está en el primer conjunto
* de `A`, y siempre que tengamos el símbolo` A` en la pila, y el símbolo `a` en
* el buffer, deberíamos usar la producción `A -> aB`. Si en cambio tenemos un
* no terminal en el lado derecho, como p. ej. en `A -> BC`, luego en orden
* para calcular el primer conjunto de `A`, debemos calcular el primer conjunto de` BC`, y
* luego fusionarlo a `A`.
* 
* Siguientes:
* 
* Los siguientes se usan cuando un símbolo puede ser `ε` (símbolo" vacío "conocido como
* épsilon). En producciones como: `A -> bXa`, si` X` puede ser `ε`, entonces
* ser eliminado, y todavía podremos derivar `a` que sigue a` X`.
* Entonces decimos que `a` está en el siguiente conjunto de` X`.
 */

// Special "empty" symbol.
var EPSILON = "ε";

var firstSets = {};
var followSets = {};
var grammar = analyzeSyntactic(tokenlist)

/**

Reglas para los primeros 

- Si X es un terminal, entonces Primero (X)
- Si hay una Producción X → ε t
- Si hay una Producción X → Y1Y
- Primero (Y1Y2..Yk) es
    - Primero (Y1) (si Primero (Y1) hace
    - O (si Primero (Y1) contiene Primero (Y1) <excepto para ε>
    - Si Primero (Y1) Primero (Y2) .. Primero
      a Primero (Y1Y2..Yk) también.
 */

function buildFirstSets(grammar) {
  firstSets = {};
  buildSet(firstOf);
}

function firstOf(symbol) {

//Es posible que un conjunto ya esté construido a partir de algún análisis previo,
//así que se debe verificar si este ya existe 


  if (firstSets[symbol]) {
    return firstSets[symbol];
  }

  // Inicializa y calcula
  var first = firstSets[symbol] = {};

  // Si es un terminal, el primer conjunto es el mismo
  if (isTerminal(symbol)) {
    first[symbol] = true;
    return firstSets[symbol];
  }

  var productionsForSymbol = getProductionsForSymbol(symbol);
  for (var k in productionsForSymbol) {
    var production = getRHS(productionsForSymbol[k]);

    for (var i = 0; i < production.length; i++) {
      var productionSymbol = production[i];

      // Epsilon va al primer conjunto
      if (productionSymbol === EPSILON) {
        first[EPSILON] = true;
        break;
      }

	//De lo contrario, el primero es un no terminal,
    //entonces primero va al primero de nuestro símbolo
    //(a menos que sea un épsilon).
      var firstOfNonTerminal = firstOf(productionSymbol);

	//Si el primer no terminal de la producción de RHS no
    //contiene épsilon, luego solo combina su conjunto con el nuestro
      if (!firstOfNonTerminal[EPSILON]) {
        merge(first, firstOfNonTerminal);
        break;
      }

	//De lo contrario (obtuvimos epsilon en el primer no terminal),
	//- fusionar todo excepto epsilon
    //- elimine este no terminal y avance al siguiente símbolo
    //(es decir, no rompa este bucle)  
      merge(first, firstOfNonTerminal, [EPSILON]);
    // no rompa el ciclo, vaya al siguiente`productionSymbol`.
    }
  }

  return first;
}


function getProductionsForSymbol(symbol) {
  var productionsForSymbol = {};
  for (var k in grammar) {
    if (grammar[k][0] === symbol) {
      productionsForSymbol[k] = grammar[k];
    }
  }
  return productionsForSymbol;
}


function getLHS(production) {
  return production.split('->')[0].replace(/\s+/g, '');
}


function getRHS(production) {
  return production.split('->')[1].replace(/\s+/g, '');
}

/**
 Reglas para conjuntos de siguientes

 - Primero ponga $ (el final del marcador de entrada) en Siguiente (S) (S es el símbolo de inicio)
 - Si hay una producción A → aBb, (donde a puede ser una cadena completa)
   entonces colocar todo en PRIMERO (b) excepto ε, que se coloca en Siquiente (B).
 - Si hay una producción A → aB, entonces todo en
   Siguiente (A) está en Siguiente (B)
 - Si hay una producción A → aBb, donde Primero (b) contiene ε,
   entonces todo en Siguiente (A) está en Siguiente (B)
 */	

function buildFollowSets(grammar) {
  followSets = {};
  buildSet(followOf);
}

function followOf(symbol) {

  // Si ya se calculó a partir de alguna ejecución anterior.
  if (followSets[symbol]) {
    return followSets[symbol];
  }

  // De lo contrario, inicie y calcule.
  var follow = followSets[symbol] = {};

  // El símbolo de inicio siempre contiene `$` en su siguiente conjunto.
  if (symbol === START_SYMBOL) {
    follow['$'] = true;
  }

  // Se necesitan analizar todas las producciones dinde nuestro simpobo es usado
  var productionsWithSymbol = getProductionsWithSymbol(symbol);
  for (var k in productionsWithSymbol) {
    var production = productionsWithSymbol[k];
    var RHS = getRHS(production);

    // Se obtiene el siguiente simbolo de nuestro simbolo
    var symbolIndex = RHS.indexOf(symbol);
    var followIndex = symbolIndex + 1;

    // We need to get the following symbol, which can be `$` or
    // may contain epsilon in its first set. If it contains epsilon, then
    // we should take the next following symbol: `A -> aBCD`: if `C` (the
    // follow of `B`) can be epsilon, we should consider first of `D` as well
    // as the follow of `B`.

    while (true) {

      if (followIndex === RHS.length) { // "$"
        var LHS = getLHS(production);
        if (LHS !== symbol) { // To avoid cases like: B -> aB
          merge(follow, followOf(LHS));
        }
        break;
      }

      var followSymbol = RHS[followIndex];

      // Follow of our symbol is anything in the first of the following symbol:
      // followOf(symbol) is firstOf(followSymbol), except for epsilon.
      var firstOfFollow = firstOf(followSymbol);

      // If there is no epsilon, just merge.
      if (!firstOfFollow[EPSILON]) {
        merge(follow, firstOfFollow);
        break;
      }

      merge(follow, firstOfFollow, [EPSILON]);
      followIndex++;
    }
  }

  return follow;
}

function buildSet(builder) {
  for (var k in grammar) {
    builder(grammar[k][0]);
  }
}

/**
 * Finds productions where a non-terminal is used. E.g., for the
 * symbol `S` it finds production `(S + F)`, and for the symbol `F`
 * it finds productions `F` and `(S + F)`.
 */
function getProductionsWithSymbol(symbol) {
  var productionsWithSymbol = {};
  for (var k in grammar) {
    var production = grammar[k];
    var RHS = getRHS(production);
    if (RHS.indexOf(symbol) !== -1) {
      productionsWithSymbol[k] = production;
    }
  }
  return productionsWithSymbol;
}

function isTerminal(symbol) {
  return !/[A-Z]/.test(symbol);
}

function merge(to, from, exclude) {
  exclude || (exclude = []);
  for (var k in from) {
    if (exclude.indexOf(k) === -1) {
      to[k] = from[k];
    }
  }
}

function printGrammar(grammar) {
  console.log('Grammar:\n');
  for (var k in grammar) {
    console.log('  ', grammar[k]);
  }
  console.log('');
}

function printSet(name, set) {
  console.log(name + ': \n');
  for (var k in set) {
    console.log('  ', k, ':', Object.keys(set[k]));
  }
  console.log('');
}

// Testing

// --------------------------------------------------------------------------
// Example 1 of a simple grammar, generates: a, or (a + a), etc.
// --------------------------------------------------------------------------

var grammar = {
  1: 'S -> F',
  2: 'S -> (S + F)',
  3: 'F -> a',
};

var START_SYMBOL = 'S';

printGrammar(grammar);

buildFirstSets(grammar);
printSet('First sets', firstSets);

buildFollowSets(grammar);
printSet('Follow sets', followSets);



module.exports = { buildStates }
