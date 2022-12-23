


    const containerDivPastEvent =document.getElementById("contentPastEvents"); 
    let fragment = document.createDocumentFragment()
    let valoresDataPast;

    fetch("https://amazing-events.onrender.com/api/events")
        .then((res) => res.json())
        .then((datos) =>{
            valoresDataPast = datos.events
            const arrayCheck = Array.from( new Set(valoresDataPast.map( elementPast => elementPast.category)))
            renderPast(valoresDataPast,containerDivPastEvent)
            renderPastCheck(arrayCheck, checkPastEvents )
        })
        .catch((err) => console.log(err))



    function renderPast(array,contenedor){

        contenedor.innerHTML = "";

        array.forEach((e) =>{
        
            if(e.date < "2022"){
                let anioEventos = document.createElement("div")
                anioEventos.classList.add("card", "text-light", "m-1", "content-card")
        
                anioEventos.innerHTML = `
                    <img src="${e.image}" class="card-img-top" alt=" ${e.name} ">
                    <div class="card-body text-center">
                    <h5 class="card-title">${e.name}</h5>
                    <p class="card-text">  ${e.description}  </p>
                    </div>
                    <div class="card-body d-flex justify-content-center align-items-center">
                    <p class="mb-0"> $ ${e.price}</p>
                    <a href="./details.html?id=${e._id}" class="btn btn-light ms-3">Details</a>
                    </div>
            `
            fragment.appendChild(anioEventos)
            }
        })
        contenedor.appendChild(fragment)
    }







    const checkPastEvents = document.getElementById("checkEventP");
    const fragmentPastEvent = document.createDocumentFragment(); 




    function renderPastCheck(category,container){

        category.forEach( (elementPastEvent) => {

            const divPastEvent = document.createElement("div");
            divPastEvent.classList.add("form-check,ms-5");
            divPastEvent.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${elementPastEvent}" id="flexCheckIndeterminate">
            <label class="form-check-label" for="flexCheckIndeterminate"> ${elementPastEvent} </label>
            `
            fragmentPastEvent.appendChild(divPastEvent);
        })
        container.appendChild(fragmentPastEvent);
    }



    let checkLista = []
    checkPastEvents.addEventListener("change", (e) =>{
        
        const checkedPast = document.querySelectorAll('input[type="checkbox"]:checked');
        const checkListPast = Array.from(checkedPast)
        checkLista = checkListPast.map(elemento => elemento.value)

        let filtrosPasados = filterPasados(checkLista,pastInput.value,valoresDataPast)
        renderPast(filtrosPasados,containerDivPastEvent)
    })


    const pastInput = document.getElementById("inputPast")

    pastInput.addEventListener("input", (e)=>{
        let filtrosPasados = filterPasados(checkLista,pastInput.value,valoresDataPast)
        renderPast(filtrosPasados,containerDivPastEvent)
    })

    function filtroPorCategoriaPast(events,category){
        if(!category.length){
            return events
        }
        return category.map(elemento => events.filter(evento => evento.category.includes(elemento))).flat()
    }

    function filtroPorBusquedaPast(eventos,input){
        return eventos.filter(event => event.name.toLowerCase().includes( input.toLowerCase() ))
    }


    function filterPasados(select,input,array){
        let filtradoCategoriaPast = filtroPorCategoriaPast(array,select)
        let filtradoBPast = filtroPorBusquedaPast(filtradoCategoriaPast,input)
        return filtradoBPast
    }








//let cardFilterPast = filtroPorCategoriaPast(valoresDataPast,arrayCheck)
        //renderPast(cardFilterPast,containerDivPastEvent)




 //let filterPast = filtroPorBusquedaPast(valoresDataPast,pastInput)
        //renderPast(filterPast,containerDivPastEvent)







  // if (category.length === 0){
        //     return events
        // }
        // return events.filter(evento => category.includes(evento.category))



































