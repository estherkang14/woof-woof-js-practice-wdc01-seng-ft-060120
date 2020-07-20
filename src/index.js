const BASEURL = "http://localhost:3000/pups/"


document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    let dogBar = document.getElementById("dog-bar")
    let dogInfo = document.getElementById("dog-info")


    fetch(BASEURL)
    .then(response => response.json())
    .then(allDogsArray => renderDogs(allDogsArray));

    let renderDogs = (dogsArray) => {
        dogsArray.forEach(dogObj => renderDog(dogObj))
    }

    let renderDog = (dogObj) => {
        let dogSpan = document.createElement("span");
        dogSpan.id = dogObj.id
        dogSpan.className = "dog-span-info"
        dogSpan.innerText = dogObj.name

        dogSpan.dataset.name = dogObj.name
        dogSpan.dataset.isGoodDog = dogObj.isGoodDog
        dogSpan.dataset.image = dogObj.image
        dogBar.appendChild(dogSpan)
    }

    let showDogInfo = (showDog) => {
        clearDogInfo(showDog)
        let showDogDiv = document.createElement("div")
        showDogDiv.id = "show-dog-div"

        let img = document.createElement("img")
        img.src = showDog.dataset.image
        showDogDiv.appendChild(img)

        let h2 = document.createElement("h2")
        h2.innerText = showDog.dataset.name
        showDogDiv.appendChild(h2)

        let button = document.createElement("button")
        if (showDog.dataset.isGoodDog === "true") {
            button.innerText = "Good Dog!"
            button.addEventListener("click", () => updateToBadDog(showDog, button))
        } else if (showDog.dataset.isGoodDog === "false") {
            button.innerText= "Bad Dog!"
            button.addEventListener("click", () => updateToGoodDog(showDog, button))
        }

        showDogDiv.appendChild(button)

        dogInfo.appendChild(showDogDiv)
    }

    let clearDogInfo = (showDog) => {
            
        let findDogDiv = document.querySelector("#show-dog-div")
        if (findDogDiv) {findDogDiv.remove()}
        
    }

    document.addEventListener("click", (e) => {
        
        if (e.target.matches(".dog-span-info")) {
            showDogInfo(e.target)
        } 
        
        
    })

    let updateToGoodDog = ( showDog, button ) => {
        let putRequest = {
            method: 'put', 
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                name: `${showDog.dataset.name}`,
                image: `${showDog.dataset.image}`,
                isGoodDog: true
            })
        }
        

        fetch(BASEURL + showDog.id, putRequest)
        .then(response => response.json())
        .then ( updatedDog => button.innerText = "Good Dog!");
        showDog.dataset.isGoodDog = true
        console.log(showDog)
        showDogInfo(showDog)
        
    }

    let updateToBadDog = ( showDog, button ) => {
        let putRequest = {
            method: 'put', 
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify({
                name: `${showDog.dataset.name}`,
                image: `${showDog.dataset.image}`,
                isGoodDog: false
            })
        }
        
        fetch(BASEURL + showDog.id, putRequest)
        .then(response => response.json())
        .then ( updatedDog => button.innerText = "Bad Dog!")
        showDog.dataset.isGoodDog = false
        console.log(showDog)
        showDogInfo(showDog)
    }
})