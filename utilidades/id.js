// se crea una funcion para crear id unico

const { model } = require("mongoose");

function crearId({ longitud }) {
    let resultado = ''
    const caracteristicas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < longitud; i++) {
        resultado += caracteristicas.charAt(Math.floor(Math.random() * caracteristicas.length));
    }
    console.log(resultado)
    return resultado;
}

module.exports = {
    crearId
}