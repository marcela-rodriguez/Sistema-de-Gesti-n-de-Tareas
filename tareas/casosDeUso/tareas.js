const { guardarTarea, obtenerTareas, obtenerTareaPorId, actualizarTareaRepo, eliminar } = require("../repositorio/tareas")
const { crearId } = require("../../utilidades/id")
const { response } = require("express")
const Estado = {  // enums enumerador
    NUEVA: "NUEVA",
    PENDIENTE: "PENDIENTE",
    TERMINADA: "TERMINADA"
}


function crearTarea({ idUsuario, titulo, descripcion, fechaVencimiento }) {
    tarea = {
        "idTarea": crearId({ longitud: 10 }),
        "idUsuario": idUsuario,
        "estado": Estado.NUEVA,
        "titulo": titulo,
        "descripcion": descripcion,
        "fechaVencimiento": fechaVencimiento,
    }
    guardarTarea({ tarea })
}

function consultarTareas(idUsuario) {     // agregar paginacion
    return obtenerTareas(idUsuario)
}

async function consultarTareaId({ idTarea, idUsuario }) {
    var respuesta = await obtenerTareaPorId({ idTarea, idUsuario })
    if (respuesta == undefined) {
        throw "tarea no encontrada"  // throw envia la exepcion
    }
    return respuesta
}

async function actualizarTarea({ idTarea, idUsuario, nuevaTarea }) {
    if (Estado[nuevaTarea.estado.toUpperCase()] == undefined) {
        throw "El estado enviado no es un estado valido"
    }
    var tarea = await obtenerTareaPorId({ idTarea, idUsuario })
    if (tarea == undefined) {
        throw "Tarea con Id no esta creada"
    }

    var tareaActualizada = await actualizarTareaRepo({ idTarea, idUsuario, nuevaTarea })
    return tareaActualizada
}

async function elminarTarea({ idTarea, idUsuario }) {
    var consultaId = await obtenerTareaPorId({ idTarea, idUsuario })
    if (consultaId == undefined) {
        throw "Id incorrecto"
    }
    await eliminar({ idTarea, idUsuario })
}


module.exports = {
    crearTarea,
    consultarTareas,
    consultarTareaId,
    actualizarTarea,
    elminarTarea
}