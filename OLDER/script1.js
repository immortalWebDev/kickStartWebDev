window.addEventListener("DOMContentLoaded" ,() => {

  axios.get("https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/appointment")
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


function handleFormSubmission(event){

  event.preventDefault()


  // Extract user details from the form input fields using name attribute (RHS username is name attribute)
  // const userDetails = {
  //   username : event.target.username.value,
  //   email : event.target.email.value,
  //   phone : event.target.phone.value
  // }

  // Extract user details from the form input fields using getElementById
const userDetails = {
  username: document.getElementById("username").value,
  email: document.getElementById("email").value,
  phone: document.getElementById("phone").value,
};


  axios.post("https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/appointment", userDetails)
  .then((response) => {

    displayUserOnScreen(response.data)
  })
  .catch((error) => {
    console.log(error)
  })

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

}

function displayUserOnScreen(userDetails){

  const userList = document.querySelector("ul")
  const userItem = document.createElement("li")

  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  const deleteBtn = document.createElement("button")
  deleteBtn.textContent = "Delete"
  deleteBtn.addEventListener("click",() => {

    const userId = userDetails._id

    axios.delete(`https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/appointment/${userId}`)
    .then((response) => {

      userList.removeChild(userItem)
    })
    .catch((error) => {
      console.log(error)
    })
  })

  const editBtn = document.createElement("button")
  editBtn.textContent = "Edit"
  editBtn.addEventListener("click",() => {

    document.getElementById("username").value = userDetails.username
    document.getElementById("email").value = userDetails.email
    document.getElementById("phone").value = userDetails.phone

    const userId = userDetails._id
    axios.delete(`https://crudcrud.com/api/99b00ab1cbc44f65b36eda55dc2aedd6/appointment/${userId}`)
    .then((response) => {
      userList.removeChild(userItem)
    })
    .catch((response) => {
      console.log(error)
    })

  })


userItem.appendChild(deleteBtn)
userItem.appendChild(editBtn)

userList.appendChild(userItem)


}
