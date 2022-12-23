    
    const contenedorCard = document.getElementById("containerHome") 
    let fragment = document.createDocumentFragment()

    const checkContainer = document.getElementById("container-check") 
    const fragmentCheck = document.createDocumentFragment()

    const inputSearch = document.getElementById("searchInput")


    let valoresDataHome;


    fetch("https://amazing-events.onrender.com/api/events")
        .then((res) => res.json())
        .then((datos) =>{
            
            valoresDataHome = datos.events
            const arrayCheckNew = Array.from( new Set(valoresDataHome.map( elemento => elemento.category)))
            
            renderCard(valoresDataHome,contenedorCard)
            renderCheckBox(arrayCheckNew,checkContainer)
        })
        .catch(err => console.log(console.log(err)))




        function renderCard(array,contenedor){
            contenedor.innerHTML = "";

            array.forEach((evento)=>{
                
                const divEvents = document.createElement("div")
                divEvents.classList.add("card", "text-light", "m-1", "content-card")

                divEvents.innerHTML = `
                    <img src="${evento.image}" class="card-img-top" alt="${evento.name}">
                    <div class="card-body text-center">
                    <h5 class="card-title">${evento.name}</h5>
                    <p class="card-text"> ${evento.description} </p>
                    </div>
                    <div class="card-body d-flex justify-content-center align-items-center">
                    <p class="mb-0"> $ ${evento.price}</p>
                    <a href="./details.html?id=${evento._id}" class="btn btn-light ms-3">Details</a>
                    </div>
                    `
                fragment.appendChild( divEvents)
        })
        contenedor.appendChild(fragment)
        }


        function renderCheckBox(categoryCard,container){

            categoryCard.forEach( (element) => {
                
                const divCheck = document.createElement("div")
                divCheck.classList.add("form-check","ms-5")
                divCheck.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${element}" id="flexCheckIndeterminate">
                <label class="form-check-label" for="flexCheckIndeterminate">
                ${element}
                </label>`
                fragmentCheck.appendChild(divCheck)
            })
            container.appendChild(fragmentCheck)
        }
        

        let arrayCheckBox = []
        checkContainer.addEventListener("change", (e) =>{  
            
            const checked = document.querySelectorAll('input[type="checkbox"]:checked')
            const arrayChecked = Array.from(checked)
            arrayCheckBox = arrayChecked.map(elemento => elemento.value)

            let filtros =  filter(arrayCheckBox, inputSearch.value, valoresDataHome)
            renderCard(filtros, contenedorCard)
        })

        
        inputSearch.addEventListener("input", (e) =>{

        let filtros =  filter(arrayCheckBox, inputSearch.value, valoresDataHome)
        renderCard(filtros, contenedorCard)    
        })

        function filtroPorCategoria(eventos, categorias){
            if(!categorias.length){
                return eventos
            }
            return categorias.map(elemento => eventos.filter(evento => evento.category.includes(elemento))).flat()
        }


        function filtroDeBusqueda(eventos,input){
            return eventos.filter(event => event.name.toLowerCase().includes( input.toLowerCase() ))
    }

    function filter(select, input, array){
        let filtradoPorCategoria = filtroPorCategoria(array, select)
        let filtradoPorBusqueda = filtroDeBusqueda(filtradoPorCategoria, input)
        return filtradoPorBusqueda
}



    







































































































































































