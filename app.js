var express = require("express")
var app = express()
var router = express.Router()
var { registro, inicio, registrarUsuario } = require("./usuario/casosDeUso/registro")
const { tarea } = require("./tareas/casosDeUso/tareas")
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

router.post("/registro", (request, response) => {
    registrarUsuario({
        "nombre": request.body.nombre,
        "contrasena": request.body.contrasena,
        "correo": request.body.correo
    })
    return response.status(201).json({ "mensaje": "Cliente creado" })
})

router.get("/inicio", (request, response) => {
    inicioSesion({
        "correo": request.body.correo,
        "contrasena": request.body.contrasena
    })
    return response.status(200).json({ "mensaje": "Ingreso con Exito" })
})

router.post("/tareas", (request, response) => {
    crearTarea({
        "titulo": request.body.titulo,
        "descripcion": request.body.descripcion,
        "fechaVencimiento": request.body.fechaVencimiento,
    })
    return response.status(201).json({ "mensaje": "Tarea creada" })
})




app.use(router)
app.listen(3000, () => {
    console.log("app en ${3000}")

})