

    const containerDivPastEvent =document.getElementById("contentPastEvents"); 
    let fragment = document.createDocumentFragment()
    const valoresDataPast = data.events

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

    renderPast(valoresDataPast,containerDivPastEvent)




    const checkPastEvents = document.getElementById("checkEventP");
    const fragmentPastEvent = document.createDocumentFragment(); 

    const arrayCheck = Array.from( new Set(valoresDataPast.map( elementPast => elementPast.category)))


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

    renderPastCheck(arrayCheck, checkPastEvents )


    checkPastEvents.addEventListener("change", (e) =>{
        
        const checkedPast = document.querySelectorAll('input[type="checkbox"]:checked');
        const checkListPast = Array.from(checkedPast)
        const arrayCheck = checkListPast.map(elemento => elemento.value)

        let cardFilterPast = filterCategoryPast(valoresDataPast,arrayCheck)
        renderPast(cardFilterPast,containerDivPastEvent)

    })


    const pastInput = document.getElementById("inputPast")

    pastInput.addEventListener("input", (e)=>{
        let filterPast = filterSearchPast(valoresDataPast,pastInput)
        renderPast(filterPast,containerDivPastEvent)
    })

    function filterCategoryPast(events,category){
        
        if (category.length === 0){
            return events
        }
        return events.filter(evento => category.includes(evento.category))
    }

    function filterSearchPast(eventos,input){
        return eventos.filter(event => event.name.toLowerCase().includes( input.value.toLowerCase() ))
    }









































