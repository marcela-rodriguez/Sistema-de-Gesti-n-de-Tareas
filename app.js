var express = require("express")
var app = express()
var router = express.Router()
const jwt = require("jsonwebtoken")
const secretkey = "secret"
var { registro, inicio, registrarUsuario, inicioSesion } = require("./usuarios/casosDeUso/usuarios")
const { crearTarea, consultarTareas, consultarTareaId, actualizarTarea, elminarTarea } = require("./tareas/casosDeUso/tareas")
app.use(express.json())


router.get("/task", (request, response) => {   // recurso=task metodo= get
    console.log(request)
    return response.status(200).json( // responde un objeto json, con un status 200
        {
            "payload": {},
            "errors": {}
        }
    )
})

router.post("/registro", (request, response) => {  //servicio para el registro de usuario
    registrarUsuario({
        "nombre": request.body.nombre,
        "contrasena": request.body.contrasena,
        "correo": request.body.correo
    })
    return response.status(201).json({ "mensaje": "Cliente creado" })
})

router.post("/inicio", async (request, response) => {   //servicio para el inicio de sesion
    try {                                               //intenta //  control de excepciones 
        var usuario = {
            "correo": request.body.correo,
            "contrasena": request.body.contrasena
        }
        var usuarioAlmacenado = await inicioSesion({ usuario })  // await async para manejar procesos asincronos que los convierte a sincronos
        console.log(usuarioAlmacenado)
        return response.status(200).json({ usuarioAlmacenado })
    } catch (error) {                                        //capturar //  control de excepciones 
        console.log(error)
        if (error == "los campos contraseña y correo son requeridos") {
            return response.status(400).json({ "mensaje": error })
        }
        if (error == "contraseña incorrecta") {
            return response.status(401).json({ "mensaje": error })
        }
        if (error == "usuario no encontrado") {
            return response.status(401).json({ "mensaje": error })
        }
        return response.status(404).json({ "mensaje": "Error interno del servidor" })
    }
})
function vericaToken(request, response, next) {     // funcion para la verificacion del token
    const encabezados = request.header("Authorization") || ""
    const token = encabezados.split(" ")[1]

    if (!token) {
        return response.status(401).json({ "mensaje": "token no proporcionado" })
    }
    try {
        const infoToken = jwt.verify(token, secretkey)
        request.id = infoToken.id
        next()
    } catch (error) {
        return response.status(403).json({ "mensaje": " token no valido" })
    }
}


// se crean los servicios para crear, consultar, eliminar y actualizar tareas
// tareas con autenticacion para gestionar  únicamente sus propias tareas

router.post("/tareas", vericaToken, (request, response) => {
    crearTarea({
        "idUsuario": request.id,
        "titulo": request.body.titulo,
        "descripcion": request.body.descripcion,
        "fechaVencimiento": request.body.fechaVencimiento,
    })
    return response.status(201).json({ "mensaje": "Tarea creada" })
})

router.get("/tareas", vericaToken, async (req, resp) => {
    var idUsuario = req.id
    var response = await consultarTareas(idUsuario)
    return resp.status(200).json({ "mensaje": response })
})


router.get("/tareas/:id", vericaToken, async (req, resp) => {
    var id = req.params.id
    var idUsuario = req.id
    try {                                             // try / carch controla la excepcion 
        var respuesta = await consultarTareaId({ id, idUsuario })
        console.log(respuesta)
        return resp.status(200).json({ "mensaje": respuesta })
    } catch (error) {
        if (error == "tarea no encontrada") {
            return resp.status(404).json({ "mensaje": `Tarea no encontrada` })
        }
        console.log(error)
        return resp.status(404).json({ "mensaje": `Error interno del servidor` })
    }
})

router.put("/tareas/:id", vericaToken, async (request, response) => {
    var id = request.params.id
    var nuevaTarea = {
        "idUsuario": request.id,
        "estado": request.body.estado,
        "titulo": request.body.titulo,
        "descripcion": request.body.descripcion,
        "fechaVencimiento": request.body.fechaVencimiento,
    }
    try {
        var respuesta = await actualizarTarea({ id, nuevaTarea })
        return response.status(201).json({ "Tarea actualizada": respuesta })
    } catch (error) {
        if (error == "Tarea con Id no esta creada") {
            return response.status(404).json({ "mensaje": "Tarea con Id no esta creada" })
        }
    }
})

router.delete("/tareas/:id", vericaToken, async (request, response) => {
    var id = request.params.id
    var idUsuario = request.id
    try {
        var respuesta = await elminarTarea({ id, idUsuario })
        return response.status(201).json({ "mensaje": respuesta })
    } catch (error) {
        if (error == "Id incorrecto") {
            return response.status(404).json({ "mensaje": `Id incorrecto` })
        }
    }

})




app.use(router)
app.listen(3000, () => {
    console.log("app en ${3000}")

})