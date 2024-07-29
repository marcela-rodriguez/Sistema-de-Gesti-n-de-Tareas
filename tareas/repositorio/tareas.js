const mongoose = require('mongoose');   // mongose es una libreria para node que nos permite crear consultas para una base de datos MongoDb

mongoose.connect('mongodb://localhost:27017/gestion_de_tareas', {         // conexion a base de datos  llamada gestor de tareas
});

var taskSchema = new mongoose.Schema({}, { strict: false });   // creamos un esquema 
var Model = mongoose.model('Model', taskSchema, "tareas");    // creamos  un modelo


const formatearTareas = ({ tarea }) => {
    return {
        "id": tarea._id,
        "estado": tarea.estado,
        "titulo": tarea.titulo,
        "descripcion": tarea.descripcion,
        "fechaVencimiento": tarea.fechaVencimiento
    }
}

// Creando tarea
async function guardarTarea({ tarea }) {
    console.log(tarea)
    var document = new Model(tarea);
    document.save()
    console.log(document)
    return formatearTareas({ tarea: document })
}

const obtenerTareas = async (idUsuario) => {              //  await espera la respuesta de una funcion asincrona
    var tareas = await Model.find({ idUsuario })

    return tareas.map((tarea) => {
        return formatearTareas({ tarea })
    })
}

const obtenerTareaPorId = async ({ id, idUsuario }) => {
    var tarea = await Model.find({ _id: id, idUsuario })
    if (tarea.length == 0) {
        return undefined
    }
    return formatearTareas({ tarea: tarea[0] })
}

const actualizar = async ({ id, nuevaTarea }) => {
    console.log(nuevaTarea)
    var actualizar = await Model.updateOne({ _id: id }, { $set: nuevaTarea })
    return actualizar

}

const eliminar = async ({ id, idUsuario }) => {
    var eliminada = await Model.deleteOne({ _id: id, idUsuario })
    return eliminada
}






module.exports = {

    guardarTarea,
    obtenerTareas,
    obtenerTareaPorId,
    actualizar,
    eliminar

}
