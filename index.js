//Approach 1 

// Add edit button to each list item
var fruits = document.querySelectorAll('.fruit'); // Select all list items with class 'fruit'
for (var i = 0; i < fruits.length; i++) { // Loop through each list item
  var item = fruits[i]; // Current list item
  
  // Create edit button
  var editButton = document.createElement('button'); // Create a new button element
  editButton.textContent = 'Edit'; // Set the button text
  editButton.classList.add('edit-btn'); // Add 'edit-btn' class to the button
  
  // Append edit button to the current list item
  item.appendChild(editButton); // Append the edit button to the current list item
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior
  
  // Get input value
  var fruitInput = document.getElementById('fruit-to-add'); // Get the input element
  var fruitName = fruitInput.value
  
    // Create new list item
    var newItem = document.createElement('li'); // Create a new list item element
    newItem.textContent = fruitName; // Set the text content of the new list item
    newItem.classList.add('fruit'); // Add 'fruit' class to the new list item

    // Create delete button
    var deleteButton = document.createElement('button'); // Create a new button element
    deleteButton.textContent = 'x'; // Set the button text
    deleteButton.classList.add('delete-btn'); // Add 'delete-btn' class to the button
    newItem.appendChild(deleteButton); // Append the delete button to the new list item

    // Create edit button
    var editButton = document.createElement('button'); // Create a new button element
    editButton.textContent = 'Edit'; // Set the button text
    editButton.classList.add('edit-btn'); // Add 'edit-btn' class to the button
    newItem.appendChild(editButton); // Append the edit button to the new list item

    // Append new item to the list
    var fruitList = document.querySelector('.fruits'); // Get the list element
    fruitList.appendChild(newItem); // Append the new item to the list
  
}

// Function to handle delete button click
function handleDeleteButtonClick(event) {
    
  var target = event.target; // Get the clicked element
  if (target.classList.contains('delete-btn')) 
  {
    // Check if clicked element has 'delete-btn' class
    var listItem = target.closest('.fruit'); // Get the closest list item
    listItem.remove(); // Remove the list item from the DOM
  }
}

// Add event listener for form submission //add
var form = document.querySelector('form'); // Get the form element
form.addEventListener('submit', handleFormSubmit); // Add event listener for form submission

// Add event listener for delete button clicks //delete
var fruitList = document.querySelector('.fruits'); // Get the list element
fruitList.addEventListener('click', handleDeleteButtonClick); // Add event listener for click on the list element

