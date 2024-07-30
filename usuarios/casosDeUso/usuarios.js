const { consultarUsuarioPorCorreo, guardarUsuario } = require("../repositorio/usuarios");
const { crearId } = require("../../utilidades/id")
const jwt = require("jsonwebtoken")
const secretkey = "secret"


//se crea funcion para registrar usuario
async function registrarUsuario({ infoUsuario }) {
    var validarUsuario = await consultarUsuarioPorCorreo(infoUsuario.correo)
    if (validarUsuario != undefined) {
        throw "El correo ya se encuentra registrado"
    }
    cliente = {
        "id": crearId({ longitud: 10 }),
        "nombre": infoUsuario.nombre,
        "correo": infoUsuario.correo,
        "contrasena": infoUsuario.contrasena
    }
    return guardarUsuario({ cliente })
}

async function inicioSesion({ usuario }) {
    if (!usuario.correo || !usuario.contrasena) {
        throw "los campos contraseña y correo son requeridos"    // throw envia la exepcion 
    }
    var usuarioBaseDatos = await consultarUsuarioPorCorreo(usuario.correo)

    if (usuarioBaseDatos == undefined) {
        throw "usuario no encontrado"
    }
    if (usuarioBaseDatos.contrasena != usuario.contrasena) {
        throw "contraseña incorrecta"
    }

    const token = jwt.sign({ id: usuarioBaseDatos._id }, secretkey, { expiresIn: "1h" })
    return token
}






module.exports = {
    registrarUsuario,
    inicioSesion
}