const express = require('express')

let contadorVisitas = 0

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(require('./rutas'));



const PORT = process.env.PORT || 8080
const srv = app.listen(PORT, () => console.log('Servidor express escuchando en http://localhost:' + PORT))
srv.on('error', error => console.log(`Error en servidor http: ${error.message}`))




