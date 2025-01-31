const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("./config.db");





let contadorVisitas = 0


const getespecialidades = (request, response) => {
    connection.query("SELECT id_especialidades, nomespecialidad FROM especialidades", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

const getprofesionales = (request, response) => {
    connection.query("SELECT id_profesionales, nomprofesional FROM profesionales", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

// ruta
app.route("/especialidades")
.get(getespecialidades);


app.route("/profesionales")
.get(getprofesionales);




app.get('/resultado', (req,res) => {
    contadorVisitas++
    res.sendFile(__dirname + '/views/listado.html')
})



const getTable = (request, response) => {
    connection.query("select a.id_agenda, a.rut_paciente, a.email_paciente, a.fecha_hora_cita, b.nomespecialidad as areamedicac, c.nomprofesional, d.nomespecialidad from info_agenda as a join areamedica as b on a.area_de_cita=b.id join profesionales as c on a.profesional_cita=c.id_profesionales join especialidades as d on a.especialidad_cita=d.id_especialidades", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

// ruta Obtener Especialidad
app.route("/resultable")
.get(getTable);




/* --------------------------------------------------------- */
/*                Proceso de las rutas GET                   */
/* --------------------------------------------------------- */
app.get('/', (req,res) => {
    contadorVisitas++
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/saludo/:empresa?/:encargado?', (req,res) => {
    const { url:ruta, method, query, params } = req
    res.send(`
        <h4>Hola Node.JS - fyh: ${new Date().toLocaleString()}</h4>
        <p>
            url: ${ruta}<br>
            method: ${method}<br> 
            query: ${JSON.stringify(query)}<br>
            params: ${JSON.stringify(params)}
        </p>        
    `)
})

app.get('/contador', (req,res) => {
    res.status(200).send(`
        <h3 style="color:crimson;">
            Ud. visitó el sitio root ${contadorVisitas} ${contadorVisitas == 1? 'vez': 'veces'}
        </h3>
    `)
})

app.get('/especialidades', (req,res) => {

  
    res.status(200).send(`
        <h3 style="color:crimson;">
Conectado base de datos        </h3>
    `)
})

app.get('/profesionales', (req,res) => {

  
    res.status(200).send(`
        <h3 style="color:crimson;">
Conectado base de datos        </h3>
    `)
})


app.get('*', (req,res) => {
    let { url } = req
    res.status(404).send(`
        <h3 style="color:red;">
            La ruta GET ${url} no es válida
        </h3>
    `)    
})







/* --------------------------------------------------------- */
/*               Proceso de las rutas POST                   */
/* --------------------------------------------------------- */

//const areaNumerico = parseInt(area, 10);
const areaNumerico = parseInt(10);


if (isNaN(areaNumerico)) {
    return res.status(400).json({ error: "El campo 'area_de_cita' debe ser un número válido." });
}



app.use(express.json()); // Asegurar que Express pueda leer JSON en req.body

app.post('/datos', (req, res) => {
    const fechaActual = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato MySQL
    const { area, selec_busqueda, rutt, correoC, Fecha, Seleccion } = req.body;

    console.log('📩 Datos recibidos:', req.body);

    if (!area || !selec_busqueda || !rutt || !correoC) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    const fechaFinal = Fecha ? new Date(Fecha).toISOString().slice(0, 19).replace('T', ' ') : fechaActual;

    connection.query(
        "INSERT INTO info_agenda (area_de_cita, profesional_cita, rut_paciente, email_paciente, fecha_hora_cita, especialidad_cita) VALUES (?,?,?,?,?,?)",
        [area, selec_busqueda, rutt, correoC, fechaFinal, Seleccion],
        (error, results) => {
            if (error) {
                console.error("❌ ERROR en la consulta SQL:", error);
                return res.status(500).json({ error: "Error en la base de datos", detalle: error.message });
            }

            console.log("✅ Registro insertado correctamente:", results);
            res.sendFile(__dirname+'/views/ok.html');

        }
    );

    
 
});








/* --------------------------------------------------------- */
/*               Proceso de las rutas PUT                    */
/* --------------------------------------------------------- */
app.put('*', (req,res) => {
    let { url } = req
    res.status(500).send(`
        <h3 style="color:red;">
            La ruta PUT ${url} no es válida
        </h3>
    `)    
})

/* --------------------------------------------------------- */
/*              Proceso de las rutas DELETE                  */
/* --------------------------------------------------------- */
app.delete('*', (req,res) => {
    let { url } = req
    res.status(500).send(`
        <h3 style="color:red;">
            La ruta DELETE ${url} no es válida
        </h3>
    `)    
})

module.exports = app;