


let contenedorTr = document.getElementById("contenedor") 
let contenedorMin = document.getElementById("contenedorDos")
let contenedorCapacity = document.getElementById("contenedorTres")



let contenedorcategoria = document.getElementById("eventosFuturosFilas")

let contenedorEventoPasado = document.getElementById("contenedorPasado")


let dataStats;
let dataStatsGeneral;

fetch("https://amazing-events.onrender.com/api/events")
    .then((res) => res.json())
    .then((data) =>{
        dataStatsGeneral = data
        dataStats = data.events

        mayorAsistencia(dataStats,contenedorTr)
        menorAsistencia(dataStats,contenedorMin)
        mayoCapacidad(dataStats,contenedorCapacity)
        eventosFuturos(dataStats,contenedorcategoria)
        eventosPasados(dataStats,contenedorEventoPasado)
    })


    function mayorAsistencia(eventos, contenedor){

        let filtrarAsistencia = eventos.filter(event => event.hasOwnProperty("assistance"))
        

        const asistenciaPorcentaje = filtrarAsistencia.map(event => event.assistance / event.capacity * 100)
        
        const mayorAsistencia = asistenciaPorcentaje.indexOf(Math.max(...asistenciaPorcentaje))
        
        contenedor.innerHTML += `
            <td scope="row" id="FilaMayor"> ${eventos[mayorAsistencia].name}
            ${Math.max(...asistenciaPorcentaje).toFixed(2)} %<td/>
        `
    }




    function menorAsistencia(eventos,contenedor){
        let filtrarAsistencia = eventos.filter(even => even.hasOwnProperty("assistance"))

        const asistenciaPorcentaje = filtrarAsistencia.map(event => event.assistance / event.capacity * 100)

        const menorAsistenciaEvento = asistenciaPorcentaje.indexOf(Math.min(...asistenciaPorcentaje))

        contenedor.innerHTML += `
            <td scope="row" id="FilaMayor"> ${eventos[menorAsistenciaEvento].name}
            ${Math.min(...asistenciaPorcentaje).toFixed(2)} %<td/>
        `



    }


    function mayoCapacidad(eventos,contenedor){

        const highestCapacity = eventos.reduce((highest, current) => {
            return current.capacity > highest.capacity ? current : highest;}, { capacity: 0 });

        contenedor.innerHTML = `<td scope="row" id="FilaMayor"> ${highestCapacity.name} capacity: ${highestCapacity.capacity} </td>`
    }



    function eventosFuturos(eventos,contenedor){

        contenedor.innerHTML = ""
        let listaEvento = ""

        const eventosFiltrados = eventos.filter(events => events.date > dataStatsGeneral.currentDate )

        eventosFiltrados.forEach((element) => {

                listaEvento += `
                <tr id="eventosFuturosFilas">
                    <td scope="row">${element.category} </td>
                    <td> $ ${(element.price * element.estimate)} </td>
                    <td> ${((element.estimate * 100) / element.capacity).toFixed(2)} % </td> 
                </tr>
                `
        });
        contenedor.innerHTML = listaEvento
    }



    function eventosPasados(eventos,contenedor){

        contenedor.innerHTML = ""
        let listaEvento = ""

        const eventosFiltrados = eventos.filter(events => events.date < dataStatsGeneral.currentDate )

        eventosFiltrados.forEach((element) => {

                listaEvento += `
                <tr id="eventosFuturosFilas">
                    <td scope="row">${element.category} </td>
                    <td> $ ${(element.price * element.assistance)} </td>
                    <td> ${((element.assistance * 100) / element.capacity).toFixed(2)} % </td> 
                </tr>
                `
        });
        contenedor.innerHTML = listaEvento
    }



