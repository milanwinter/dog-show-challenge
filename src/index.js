const DOGS_URL = "http://localhost:3000/dogs"
document.addEventListener('DOMContentLoaded', () => {

    getAllDogs()
    const form = document.getElementById('dog-form')
    form.addEventListener("submit", updateDog)
})

function getAllDogs() {
    
    fetch(DOGS_URL)
        .then(resp => resp.json())
        .then(data =>
            displayDogs(data)
        )
}

function displayDogs(dogs) {
    dogs.forEach(dog => createRow(dog))
}

function createRow(dog) {
    const dogContainer = document.querySelector("tbody")
    const dogRow = document.createElement("tr")
    const name = document.createElement("td")
    const breed = document.createElement("td")
    const sex = document.createElement("td")
    const button_row = document.createElement("td")
    const button = document.createElement('button')
    button.setAttribute("id",`${dog.id}`)
    name.innerText = dog.name
    breed.innerText = dog.breed
    sex.innerText = dog.sex
    button.innerText = "Edit"
    button.addEventListener("click", (e) => editDog(e,dog))
    button_row.appendChild(button)
    dogRow.append(name,breed,sex,button_row)
    dogContainer.appendChild(dogRow)
}

function editDog(e,dog) {
    const form = document.getElementById('dog-form')
 
    form.name.value = dog.name
    form.breed.value = dog.breed
    form.sex.value = dog.sex
    form.dataset.id = dog.id

}


function updateDog(e) {
    e.preventDefault()
    const form = document.querySelector("form")
    const dogId = e.target.dataset.id
    
    fetch("http://localhost:3000/dogs/" + `${dogId}` , {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value
        })
    })
    .then(resp => resp.json())
    .then(json => {
        const dogContainer = document.querySelector("tbody")
        dogContainer.innerHTML=""
        form.reset()
        getAllDogs()
    })

}
