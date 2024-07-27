function crearId({ longitud }) {
    let resultado = ''
    const caracteristicas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    for (let i = 0; i < longitud; i++) {
        resultado += caracteristicas.charAt(Math.floor(Math.random() * caracteristicas.longitud));
    }
    return resultado;
}

function registrarUsuario({ nombre, correo, contrasena }) {
    cliente = {
        "id": crearId({ "longitud": 5 }),
        "nombre": nombre,
        "correo": correo,
        "contrasena": contrasena
    }
}

function inicioSesion({ correo, contrasena }) {
    cliente = {
        "correo": correo,
        "contrasena": contrasena
    }
}
module.exports = {
    registrarUsuario,
    inicioSesion
}