


fetch("https://amazing-events.onrender.com/api/events")
    .then((res) => res.json())
    .then(data =>{

        let datos = data.events

        const queryString = location.search
        const params = new URLSearchParams(queryString)
        const id = params.get("id")

        
        const eventsCard = datos.find(item => item._id == id)
    
        const container = document.getElementById("containerDetails")

        container.innerHTML = `

        <div class="card cardImg d-flex flex-row m-1">
            <img src="${eventsCard.image}"class="card-img-top w-100 img-fluid" alt="${eventsCard.name}">
        </div>
        <div class="card-body text-center">
            <h5 class="card-title text-light"> ${eventsCard.name} </h5>
            <p class="card-text text-light">Date:  ${eventsCard.date} </p>
            <p class="card-text text-light"> Description:  ${eventsCard.description} </p>
            <p class="card-text text-light"> Place: ${eventsCard.place} </p>
            <p class="card-text text-light"> Capacity:  ${eventsCard.capacity} </p>
            <p class="card-text text-light"> Assistance: ${eventsCard.assistance ? eventsCard.assistance : "No assistance" }</p>
            <p class="card-text text-light"> Estimate: ${eventsCard.estimate ? eventsCard.estimate : "No estimate" }</p>
        </div>

`

    })



