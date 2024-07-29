const { consultarUsuario, guardarUsuario } = require("../repositorio/usuarios");
const jwt = require("jsonwebtoken")
const secretkey = "secret"

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
    guardarUsuario({ cliente })
}

async function inicioSesion({ usuario }) {
    console.log(usuario);
    if (!usuario.correo || !usuario.contrasena) {
        throw "los campos contraseña y correo son requeridos"    // throw envia la exepcion 
    }
    var usuarioBaseDatos = await consultarUsuario(usuario)

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