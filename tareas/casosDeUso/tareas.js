var activo = "activo"
var finaliado = "finalizado"
var creada = "creada"

const Estado = {  // enums enumerador
    NUEVA: "NUEVA",
    CERRADA: "CERRADA"
}

function crearTarea({ titulo, descripcion, fechaVencimiento }) {
    tarea = {
        "estado": Estado.NUEVA,
        "titulo": titulo,
        "descripcion": descripcion,
        "fechaVencimiento": fechaVencimiento,
    }
}



module.exports = {
    crearTarea
}