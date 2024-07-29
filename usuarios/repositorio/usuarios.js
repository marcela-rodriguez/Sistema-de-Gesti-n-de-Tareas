const mongoose = require('mongoose');   // mongose es una libreria para node que nos permite crear consultas para una base de datos MongoDb

mongoose.connect('mongodb://localhost:27017/gestion_de_tareas', {         // conexion a base de datos  llamada gestor de tareas
});

var usuarioSchema = new mongoose.Schema({}, { strict: false });   // creamos un esquema 
var Model = mongoose.model('Model2', usuarioSchema, "usuario");    // creamos  un modelo


async function guardarUsuario({ cliente }) {
    console.log(cliente)
    var document = new Model(cliente);
    document.save()
    console.log(document)
    return document
}

const consultarUsuario = async (usuario) => {             //  await espera la respuesta de una funcion asincrona
    var unicoUsuario = await Model.find(usuario)
    console.log(unicoUsuario)

    return unicoUsuario[0]

}

module.exports = {
    guardarUsuario,
    consultarUsuario


}