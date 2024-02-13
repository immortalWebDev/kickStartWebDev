// Create an unordered list element
var userList = document.createElement("ul");

// Set the id attribute to "list-of-items"
userList.setAttribute("id", "list-of-items");

// Append the unordered list to the body of the document
document.body.appendChild(userList);

// Function to handle form submission
function handleFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve form input values
  var name = event.target.username.value;
  var email = event.target.email.value;
  var phone = event.target.phone.value;

  // Create an object to store user details
  var obj = {
    name,
    email,
    phone
  };

  // Store user details in localStorage with email as the key
  localStorage.setItem(email, JSON.stringify(obj));

  // Call the function to display user details on the screen
  showUsersOnScreen(obj);
}

// Function to display user details on the screen
function showUsersOnScreen(obj) {
  var parentElement = document.getElementById("list-of-items");

  // Create a list item for the user
  var listItem = document.createElement("li");
  listItem.textContent = `${obj.name} - ${obj.email} - ${obj.phone}`;

  // Create a delete button for the user
  var deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";

  // Add event listener to delete button to remove user details
  deleteButton.onclick = function() {
    localStorage.removeItem(obj.email);
    parentElement.removeChild(listItem);
  };

  // Append delete button to the list item
  listItem.appendChild(deleteButton);

  // Append the list item to the parent element
  parentElement.appendChild(listItem);
}

module.exports = handleFormSubmit
