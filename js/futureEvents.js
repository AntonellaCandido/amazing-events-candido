
const containerDiv =document.getElementById("containerFuture");
let fragment = document.createDocumentFragment()

for(let anio of data.events){
console.log(anio)
    if(anio.date >= "2022"){

        let anioEventosFuturos = document.createElement("div")
        fragment.appendChild(anioEventosFuturos)
        anioEventosFuturos.textContent = anio.date 
        anioEventosFuturos.classList.add("card", "text-light", "m-1", "content-card")

        anioEventosFuturos.innerHTML = `
                <img src='${anio.image}' class='card-img-top' alt'"imgMaraton'>
                <div class='card-body text-center'>
                    <h5 class='card-title'>${anio.name}</h5>
                    <p class='card-text'>  ${anio.description}  </p>
                </div>
                <div class='card-body d-flex justify-content-center align-items-center'>
                    <p class='mb-0'> $ ${anio.price}</p>
                    <a href='./details.html' class='btn btn-light ms-3'>Details</a>
                </div>
    `
    containerDiv.appendChild( fragment)
    
    }
}



