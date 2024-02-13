// Write your code below:

document.addEventListener("DOMContentLoaded",function() {
  
    var form = document.getElementById("user-details-form")
    
    form.addEventListener("submit",function(event) {
      
      event.preventDefault()
      
      var formData = new FormData(form)
      
      localStorage.setItem("Username", formData.get("username"))
      localStorage.setItem("Email", formData.get("email"))
      localStorage.setItem("Phone", formData.get("phone"))
      
    })
  })
  
  