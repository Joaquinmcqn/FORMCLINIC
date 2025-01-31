console.log('Sitio Web desde Node.JS')


function clearOptions() {
    $seleccion.innerHTML = ""; // Borra todas las opciones previas

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Seleccione una opción";
    defaultOption.value = "";
    defaultOption.selected = true;
    
    $seleccion.appendChild(defaultOption);
}


//let var_profesional = document.getElementById("selec_busqueda")
let var_especialidad = document.getElementById("selec_busqueda")
console.log(var_especialidad)


document.getElementById("selec_busqueda").addEventListener("change", printMsg);
function printMsg() {
    clearOptions();
    if (var_especialidad.value==1){
        getseleccionpro();
 
            
    }else {
        if ( var_especialidad.value==2){
            getseleccion();

        }else {
            clearOptions();

        }
        

    };


}


function ver_select(){
    let cod = document.getElementById("seleccion").selectedIndex;
    alert(cod)
}

const $seleccion = document.getElementById("seleccion");

const getseleccion = async()=>{
    try{
        const res = await fetch("http://localhost:8080/especialidades");
        const json = await res.json();
        console.log(json)
        json.forEach(element => {
            console.log(element)
            const $option = document.createElement("option");
            $option.textContent = element.nomespecialidad;
            $option.value = element.id_especialidades;            ;
            $seleccion.appendChild($option);
        });
            
    }
    catch (err) {
        console.error(err)
    }
}


const getseleccionpro = async()=>{
    try{
        const res = await fetch("http://localhost:8080/profesionales");
        const json = await res.json();
        console.log(json)
        json.forEach(element => {
            console.log(element)
            const $option = document.createElement("option");
            $option.textContent = element.nomprofesional;
            $option.value = element.id_profesionales;            ;
            $seleccion.appendChild($option);
        });
            
    }
    catch (err) {
        console.error(err)
    }
}









