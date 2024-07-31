const mongoose = require('mongoose');   // mongose es una libreria para node que nos permite crear consultas para una base de datos MongoDb

mongoose.connect(process.env.MONGO_URL, {         // conexion a base de datos  llamada gestor de tareas
});

var usuarioSchema = new mongoose.Schema({}, { strict: false, _id: false });   // creamos un esquema 
// En el esquema resive dos parametros  uno que indica que me reciba cualquier objeto
// y el otro para no gener un id automaticamente para yo poder definir uno. 
var Model = mongoose.model('Model2', usuarioSchema, "usuario");    // creamos  un modelo

const formatearUsuario = ({ usuario }) => {
    return {
        "id": usuario.id,
        "nombre": usuario.nombre,
        "correo": usuario.correo,
        "contrasena": usuario.contrasena

    }
}

async function guardarUsuario({ cliente }) {
    cliente._id = cliente.id
    var usuario = new Model(cliente);
    usuario.save()
    return formatearUsuario({ usuario: usuario })
}

const consultarUsuarioPorCorreo = async (correo) => {             //  await espera la respuesta de una funcion asincrona
    var respuesta = await Model.find({ correo: correo })
    return respuesta[0]

}

module.exports = {
    guardarUsuario,
    consultarUsuarioPorCorreo


}