


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



    function mayorAsistencia(eventos,contenedor){

        let filtrarAsistencia = eventos.filter(even => even.hasOwnProperty("assistance") )


        const highestAssistance = filtrarAsistencia.reduce((highest, current) => {
            return current.assistance > highest.assistance ? current : highest;}, { assistance: 0 });

        let porcentaje = parseInt(highestAssistance.assistance / highestAssistance.capacity * 100)


        contenedor.innerHTML = `<td scope="row" id="FilaMayor"> ${highestAssistance.name}  ${porcentaje} %</td>`
    }


    function menorAsistencia(eventos,contenedor){

        let filtrarAsistencia = eventos.filter(even => even.hasOwnProperty("assistance") )

        const minAssitance = filtrarAsistencia.reduce((min, event) => {
            return event.assistance < min.assistance ? event : min;}, filtrarAsistencia[0] );
        let porcentaje = parseInt(minAssitance.assistance / minAssitance.capacity * 100)

        contenedor.innerHTML = `<td scope="row" id="FilaMayor"> ${minAssitance.name}  ${porcentaje} %</td>`
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
