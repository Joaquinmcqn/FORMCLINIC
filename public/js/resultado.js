var tabla = document.getElementById("tabla");
const getTable = async()=>{
    try{
        const res = await fetch("http://localhost:8080/resultable"),
        json = await res.json();
        // console.log(json)        
        json.forEach(element => {
        var row = "<tr><td>" + element.id_agenda + "</td><td>" + element.rut_paciente + "</td><td>" + element.email_paciente + "</td><td>" + element.fecha_hora_cita + "</td><td>" + element.areamedicac + "</td><td>" + element.nomprofesional + "</td><td>" + element.nomespecialidad  +"</td><tr>";
        console.log(element.id, element.email, element.password, element.nombre, element.fecha)
        tabla.innerHTML+= row;
        });     
    }
    catch (err) {
        console.error(err)
    }
}

document.addEventListener("DOMContentLoaded" , (e)=> getTable());