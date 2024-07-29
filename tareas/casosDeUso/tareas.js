const { guardarTarea, obtenerTareas, obtenerTareaPorId, actualizar, eliminar } = require("../repositorio/tareas")

const Estado = {  // enums enumerador
    NUEVA: "NUEVA",
    PENDIENTE: "PENDIENTE",
    TERMINADA: "TERMINADA"
}

function crearTarea({ idUsuario, titulo, descripcion, fechaVencimiento }) {
    tarea = {
        "idUsuario": idUsuario,
        "estado": Estado.NUEVA,
        "titulo": titulo,
        "descripcion": descripcion,
        "fechaVencimiento": fechaVencimiento,
    }
    console.log(tarea)
    guardarTarea({ tarea })
}

function consultarTareas(idUsuario) {     // agregar paginacion
    return obtenerTareas(idUsuario)
}

async function consultarTareaId({ id, idUsuario }) {    // agregar paginacion
    var respuesta = await obtenerTareaPorId({ id, idUsuario })
    if (respuesta == undefined) {
        throw "tarea no encontrada"  // throw envia la exepcion
    }
    return respuesta
}

function actualizarTarea({ id, nuevaTarea }) {
    console.log(nuevaTarea)
    return actualizar({ id, nuevaTarea })

}

function elminarTarea({ id, idUsuario }) {
    return eliminar({ id, idUsuario })
}


module.exports = {
    crearTarea,
    consultarTareas,
    consultarTareaId,
    actualizarTarea,
    elminarTarea
}