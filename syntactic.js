const lexerAnalyzer = require('./app')

function syntactic() {
    lexerAnalyzer.readFiles(lexerAnalyzer.directoryInputPath, lexerAnalyzer.lexer, true)
}
syntactic()