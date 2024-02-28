// This event listener runs when the DOM content is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  
  // Fetch existing user data from the server when the page loads
  axios.get("https://crudcrud.com/api/1aead7cce14a4245af767c4826f0122f/appointmentRouter")
  .then((response) => {
      // Iterate over the fetched data and display each user on the screen

      // response.data.forEach(user => {
          // displayUserOnScreen(user);
      // });

      for(var i = 0;i<response.data.length;i++)
      {
        displayUserOnScreen(response.data[i])
      }

  })
  .catch((error) => {
      console.log(error);
  });
});


// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Extract user details from the form input fields
//   const userDetails = {
//       username: event.target.username.value,
//       email: event.target.email.value,
//       phone: event.target.phone.value,
//   };

// Extract user details from the form input fields using getElementById
const userDetails = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
};




  // Make a POST request to add the new user data to the server
  axios.post("https://crudcrud.com/api/1aead7cce14a4245af767c4826f0122f/appointmentRouter", userDetails)
  .then((response) => {
      // Display the newly added user on the screen
      displayUserOnScreen(response.data);
  })
  .catch((error) => {
      console.log(error);
  });

  // Clear the input fields after form submission
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

// Function to display a user on the screen
function displayUserOnScreen(userDetails) {
  const userList = document.querySelector("ul"); // Get the <ul> element
  const userItem = document.createElement("li"); // Create a new <li> element

  // Set the text content of the <li> element to display user details
  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  // Create delete button for each user
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
      // Handle delete button click
      const userId = userDetails._id;
      axios.delete(`https://crudcrud.com/api/1aead7cce14a4245af767c4826f0122f/appointmentRouter/${userId}`)
      .then((response) => {
          // Remove the user item from the screen
          userList.removeChild(userItem);
      })
      .catch((error) => {
          console.log(error);
      });
  });

  // Create edit button for each user
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", function () {
      // Populate the input fields with user details for editing
      document.getElementById("username").value = userDetails.username;
      document.getElementById("email").value = userDetails.email;
      document.getElementById("phone").value = userDetails.phone;

      // Handle edit button click 
      const userId = userDetails._id;
      axios.delete(`https://crudcrud.com/api/1aead7cce14a4245af767c4826f0122f/appointmentRouter/${userId}`)
      .then((response) => {
          // Remove the user item from the screen 
          userList.removeChild(userItem);
      })
      .catch((error) => {
          console.log(error);
      });
  });

  // Append delete and edit buttons to the user item
  userItem.appendChild(deleteBtn);
  userItem.appendChild(editBtn);

  // Append the user item to the user list
  userList.appendChild(userItem);
}
