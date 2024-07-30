const mongoose = require('mongoose');   // mongose es una libreria para node que nos permite crear consultas para una base de datos MongoDb

mongoose.connect('mongodb://localhost:27017/gestion_de_tareas', {         // conexion a base de datos  llamada gestor de tareas
});

var taskSchema = new mongoose.Schema({}, { strict: false, _id: false });   // creamos un esquema 
var Model = mongoose.model('Model', taskSchema, "tareas");    // creamos  un modelo


const formatearTareas = ({ tarea }) => {
    return {
        "idTarea": tarea.idTarea,
        "idUsuario": tarea.idUsuario,
        "estado": tarea.estado,
        "titulo": tarea.titulo,
        "descripcion": tarea.descripcion,
        "fechaVencimiento": tarea.fechaVencimiento
    }
}

// guardar tarea
async function guardarTarea({ tarea }) {
    tarea._id = tarea.idTarea
    var document = new Model(tarea);
    document.save()
    return formatearTareas({ tarea: document })
}

const obtenerTareas = async (idUsuario) => {              //  await espera la respuesta de una funcion asincrona
    var tareas = await Model.find({ idUsuario })

    return tareas.map((tarea) => {
        return formatearTareas({ tarea })
    })
}

const obtenerTareaPorId = async ({ idTarea, idUsuario }) => {
    var tarea = await Model.find({ idTarea, idUsuario })
    if (tarea.length == 0) {
        return undefined
    }
    return formatearTareas({ tarea: tarea[0] })
}

const actualizarTareaRepo = async ({ idTarea, idUsuario, nuevaTarea }) => {
    var actualizada = await Model.updateOne({ _id: idTarea, idUsuario: idUsuario }, { $set: nuevaTarea })
    return actualizada

}

const eliminar = async ({ idTarea, idUsuario }) => {
    await Model.deleteOne({ _id: idTarea, idUsuario })
}






module.exports = {

    guardarTarea,
    obtenerTareas,
    obtenerTareaPorId,
    actualizarTareaRepo,
    eliminar

}
