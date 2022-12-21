    
    const contenedor = document.getElementById("containerHome") 
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
            
            renderCard(valoresDataHome,contenedor)
            renderCheckBox(arrayCheckNew,checkContainer)
        })
        .catch(err => console.log(console.log(err)))




        function renderCard(array,containerCard){
            containerCard.innerHTML = "";

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
        containerCard.appendChild(fragment)
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
        


        checkContainer.addEventListener("change", (e) =>{  
            
            const checked = document.querySelectorAll('input[type="checkbox"]:checked')
            const arrayChecked = Array.from(checked)
            const arrayCheckBox = arrayChecked.map(elemento => elemento.value)

            let cardFilterByCategory = filterByCategory(valoresDataHome,arrayCheckBox)

            renderCard(cardFilterByCategory, contenedor)
        })

        
        inputSearch.addEventListener("input", (e) =>{
        let filterBySearch = filtroDeBusqueda(valoresDataHome,inputSearch)
        
        renderCard(filterBySearch, contenedor)
            
        })


        function filterByCategory(eventos,categorias){

            if (categorias.length === 0){
                return eventos
            }
    
            return eventos.filter(evento => categorias.includes(evento.category))
    }

        function filtroDeBusqueda(eventos,input){
            return eventos.filter(event => event.name.toLowerCase().includes( input.value.toLowerCase() ))
    }
















































































































































































