

const contenedor = document.getElementById("containerHome")

const valoresDataHome = Object.values(data.events)

for (let event of valoresDataHome) {
    let fragment = document.createDocumentFragment()
    const divEvents = document.createElement("div")
    divEvents.classList.add("card", "text-light", "m-1", "content-card")
    fragment.appendChild( divEvents)

    divEvents.innerHTML += `
    <img src="${event.image}" class="card-img-top" alt="imgMaraton">
    <div class="card-body text-center">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text"> ${event.description} </p>
    </div>
    <div class="card-body d-flex justify-content-center align-items-center">
        <p class="mb-0"> $ ${event.price}</p>
        <a href="./details.html" class="btn btn-light ms-3">Details</a>
    </div>
    `
    contenedor.appendChild(fragment)
};























