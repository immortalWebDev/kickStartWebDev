// Write your code below:

function handleFormSubmit(event){
  
  event.preventDefault()
  
  var name = event.target.username.value;
  var email = event.target.email.value;
  var phone = event.target.phone.value;
  
  var obj = {
    name,
    email,
    phone
  }
  
  localStorage.setItem(obj.email,JSON.stringify(obj))
  showUsersOnScreen(obj)
  
  
}

function showUsersOnScreen(obj){
  
  var parentElement = document.getElementById("listOfitems")
  
  parentElement.innerHTML = parentElement.innerHTML + `<li> ${obj.name} - ${obj.email} - ${obj.phone}</li>`
  
  
}

module.exports = handleFormSubmit;