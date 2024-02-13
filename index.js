// Create an unordered list element
var userList = document.createElement("ul");

// Set the id attribute to "list-of-items"
userList.setAttribute("id", "list-of-items");

// Append the unordered list to the body of the document
document.body.appendChild(userList);

// Create an unordered list and append it to the body
var userList = document.createElement("ul");
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

  // Clear form input fields
  event.target.reset();

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
  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function() {
    localStorage.removeItem(obj.email);
    parentElement.removeChild(listItem);
  };

  // Create an edit button for the user
  var editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = function() {
    localStorage.removeItem(obj.email);
    parentElement.removeChild(listItem);
      
    // Populate form fields with existing values
    document.getElementById("username").value = obj.name;
    document.getElementById("email").value = obj.email;
    document.getElementById("phone").value = obj.phone;
  };

  // Append delete and edit buttons to the list item
  listItem.appendChild(deleteButton);
  listItem.appendChild(editButton);

  // Append the list item to the parent element
  parentElement.appendChild(listItem);
}

module.exports = handleFormSubmit;
