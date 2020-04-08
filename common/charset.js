/* Contiene la lista de caracteres válidos en el lenguaje, los caracteres en special contituyen tokens de un solo caracter o 
de 2, los caracteres en binary son aquellos que a menos que se encuentren precediendo a otro caracter como se muestran en 
la lista 'special' son errores léxicos (no deberían aparecer solos) */
let charset = {
    lowLetters: 'abcdefghijklmnopqrstuvwxyz_',
    capLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '1234567890',
    special: {
        ',':"tk_coma",
        '(':"tk_par_izq",
        ')':"tk_par_der",
        '[':"tk_par_cua_izq",
        ']':"tk_par_cua_der",
        ':':"tk_dos_puntos",
        '.':"tk_punto",
        '=': "tk_asig",
        '==': "tk_equivalente",
        '>': "tk_mayor",
        '<': "tk_menor",
        '>=': "tk_mayor_igual",
        "<=": "tk_menor_igual",
        '->': "tk_ejecuta",
        '!=': "tk_distinto",
        "*": "tk_multiplicacion",
        "//": "tk_division",
        "+": "tk_adicion",
        "%": "tk_modulo"
    },
    "binary": ["!","/"]
}
charset.alpha = `${charset.lowLetters}${charset.capLetters}`
charset.alphaNumeric = `${charset.alpha}${charset.numbers}`

module.exports = charset