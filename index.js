// Write your code below:
function handleFormSubmit(event){
    event.preventDefault();
    
    var name = event.target.username.value;
    var email = event.target.email.value;
    var phone = event.target.phone.value;
    
    var userDetails = {
      name: name,
      email: email,
      phone: phone
    };
    
    localStorage.setItem("User Details", JSON.stringify(userDetails));
  }
  
  module.exports = handleFormSubmit;
  
  