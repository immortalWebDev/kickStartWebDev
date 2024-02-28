//When user loads page show details of all users

window.addEventListener("DOMContentLoaded",() => {

    axios.get("https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/app")
    .then((response) => {

        for(var i = 0;i<response.data.length;i++)
        {
          displayUserOnScreen(response.data[i])    
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

//Handle form submission when user clicks on submit

function handleFormSubmissionEvent(event){

    event.preventDefault()

    //Extract user details from form input
    userDetails = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    }


    //Push data on sever
    axios.post("https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/app",userDetails)
    .then((response) => {
        displayUserOnScreen(response.data) //display that data on screen also once pushing is successfull
    })
    .catch((error) => {
        console.log(error)
    })

    //Make user input fields empty for another entry
    document.getElementById("username").value = ""
    document.getElementById("email").value = ""
    document.getElementById("phone").value = ""

}

//Function to display user on screen
function displayUserOnScreen(userDetails){

//select element <ul>
const userList = document.querySelector("ul")

//create sub element <li> in <ul>
const userItem = document.createElement("li")

//Add text content i userItem
userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`

//Make delete button functionality

const deleteBtn = document.createElement("button")
deleteBtn.textContent = "DELETE"
deleteBtn.style.marginLeft = "3px"
deleteBtn.style.marginRight = "3px"

deleteBtn.addEventListener("click",() => {

    const userId = userDetails._id

    //Remove userDetails from server by userId
    axios.delete(`https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/app/${userId}`)
    .then((response) => {

        userList.removeChild(userItem) //remove details from screen once server deletion is done
    })
    .catch((error) => {
        console.log(error)
    })
})


//Make edit button functionality

const editBtn = document.createElement("button")
editBtn.textContent = "EDIT"
editBtn.style.marginLeft = "3px"
editBtn.style.marginRight = "3px"

editBtn.addEventListener("click" , () => {

    //Populate input fields with clicked userDetails (before deleting from server so that we donst loose it)
    document.getElementById("username").value = userDetails.username
    document.getElementById("email").value = userDetails.email
    document.getElementById("phone").value = userDetails.phone

    const userId = userDetails._id

    //Delete userDetails on server by userId
    axios.delete(`https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/app/${userId}`)
    .then((response) => {
        userList.removeChild(userItem) //remove screen details after successfull removal from server
    })
    .catch((error) => {
        console.log(error)
    })
}) 


userItem.appendChild(deleteBtn)
userItem.appendChild(editBtn)

userList.appendChild(userItem)

}


