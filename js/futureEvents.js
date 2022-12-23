

    const containerDiv =document.getElementById("containerFuture"); 
    let fragment = document.createDocumentFragment()

    const containerUpcoming = document.getElementById("containerUpcoming"); 
    const fragmentUpcoming = document.createDocumentFragment();

    const inputF = document.getElementById("inputFuture")
    let valoresFuture;

    fetch("https://amazing-events.onrender.com/api/events")
        .then((res) => res.json())
        .then((datos) =>{
            valoresFuture = datos.events
            const arrayFuture = Array.from( new Set( valoresFuture.map( elementUpcoming => elementUpcoming.category) ))
            renderFuture(valoresFuture,containerDiv)
            renderFutureCheck(arrayFuture,containerUpcoming)
        })
        .catch((err)=>console.log(err))

    
    function renderFuture(lista,contenedor){

    contenedor.innerHTML = "";

        lista.forEach( (e)=>{
            if(e.date >= "2022"){

                let anioEventosFuturos = document.createElement("div")
                anioEventosFuturos.classList.add("card", "text-light", "m-1", "content-card")
        
                anioEventosFuturos.innerHTML = `
                    <img src='${e.image}' class='card-img-top' alt'${e.name}'>
                    <div class='card-body text-center'>
                    <h5 class='card-title'>${e.name}</h5>
                    <p class='card-text'>  ${e.description}  </p>
                    </div>
                    <div class='card-body d-flex justify-content-center align-items-center'>
                    <p class='mb-0'> $ ${e.price}</p>
                    <a href='./details.html?id=${e._id}' class='btn btn-light ms-3'>Details</a>
                    </div>
            `
            fragment.appendChild(anioEventosFuturos)
            }
        }) 
        contenedor.appendChild( fragment)
    }


    function renderFutureCheck(category,container){

        category.forEach( (pastEvents) => {
            const divCheckPast = document.createElement("div");
            divCheckPast.classList.add = ("form-check,ms-5");
            divCheckPast.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${pastEvents}" id="flexCheckIndeterminate">
            <label class="form-check-label" for="flexCheckIndeterminate"> ${pastEvents} </label>
            `
    
            fragmentUpcoming.appendChild(divCheckPast)
        } )
    
        container.appendChild(fragmentUpcoming)
    }

    let futureArray = []

    containerUpcoming.addEventListener("change", (e) =>{
        
        const checkedFuture = document.querySelectorAll('input[type="checkbox"]:checked');
        const checkListFuture = Array.from(checkedFuture)
        futureArray = checkListFuture.map(elemento => elemento.value)
        
        let filtrosF = futuroFiltros(futureArray,inputF.value,valoresFuture)
        renderFuture(filtrosF,containerDiv)
    })



    inputF.addEventListener("input", (e)=>{

        let filtrosF = futuroFiltros(futureArray,inputF.value,valoresFuture)
        renderFuture(filtrosF,containerDiv)
    })


    function filtroPorCategoriaFuture(eventos,categorias){
        if(!categorias.length){
            return eventos
        }
        return categorias.map(elemento => eventos.filter(evento => evento.category.includes(elemento))).flat()
    }

    function filtroPorBusquedaFuturo(eventos,input){
        return eventos.filter(event => event.name.toLowerCase().includes( input.toLowerCase() ))
    }

    function futuroFiltros(select, input, array){
        let categoriaFiltrado = filtroPorCategoriaFuture(array,select)
        let busquedaFiltrado = filtroPorBusquedaFuturo(categoriaFiltrado,input)
        return busquedaFiltrado
    }
    




























































