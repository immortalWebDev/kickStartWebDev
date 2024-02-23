document.addEventListener("DOMContentLoaded", function () {

    const expenseForm = document.getElementById("expenseForm");
    const expensesList = document.getElementById("expensesList");
  
    //Load/retrive expenses from local storage
    //Data It is stored in the form of key:val in localStorage
    //So, Allexpenses is key and [{"amount":1400,"description":"2 People Dunky","category":"Film"}...]  this will be value
    //Whenever we update localStorage we call displayExpense() function to reflect same changes on screen
    //allExpenses is a key name and expenses is a particular array of objects
  
    let expenses = JSON.parse(localStorage.getItem("allExpenses")) || [];
  
    // Calling function to Display expenses on page even after refreshing page (or 1st page load)
    displayExpenses();
  
    // Event listener for form submission (Once "Add Expenses" is clicked)
    expenseForm.addEventListener("submit", function (event) {

      event.preventDefault(); //To prevent default behaviour of form sumbission (Which is to reload)
  
      const amount = parseFloat(document.getElementById("amount").value); //Make amount in number to add to total
      const description = document.getElementById("description").value;
      const category = document.getElementById("category").value;
  
        // Check if any editing is done (This is to enable inplace editing)
        const editedIndex = expenseForm.dataset.editIndex;
        if (editedIndex !== undefined) 
        {
            //if object exists in expenses array, update it with changes made
            expenses[editedIndex] = { amount, description, category };
    
            //remove added attribute once editing is done
            //if we dont remove it, it will be fine and overwritten new index value if edit is clicked again
            //It is fine if not removed, but its good practice to free memory by removing unused attributes
            expenseForm.removeAttribute("data-edit-index");
        } 
        else //if not , push new object in expenses array
        {
            expenses.push({ amount, description, category });
        }
  
      // Save expenses to local storage after editing
      localStorage.setItem("allExpenses", JSON.stringify(expenses));
  
      // Clear form fields
      expenseForm.reset();
  
      // Update expenses list and call function to display on screen
      displayExpenses();
    });
  
    // Function to display expenses on the page
    function displayExpenses() {

      expensesList.innerHTML = ""; //clears expensesList element, ensuring that it's empty before adding the updated list of expenses.
  
        //loop over expenses array (arr[i], i)
        expenses.forEach((expense, index) => {
            
            const li = document.createElement("li"); //list element for each expense
    
            //Sets the HTML content of the list item to display the details of the current expense,
            //including its amount, description, and category.
            li.innerHTML = `${expense.amount} - ${expense.description} - ${expense.category}`;
    
            //New delete button for deleting particular expense
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
    
            // Add margin to the right and left of the delete button
            deleteBtn.style.marginRight = "5px";
            deleteBtn.style.marginLeft = "5px";
    
            //Delete button functionality
            //Deletes a particular element from expenses array using splice method (from screen and localStorage)
            deleteBtn.addEventListener("click", function () {

                expenses.splice(index, 1);
                localStorage.setItem("allExpenses", JSON.stringify(expenses)); //update local storage accordingly
                displayExpenses(); //call function to show changes on display
            });
    
            //edit button to make changes in added expense
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
    
            // Add margin to the right of the edit button
            editBtn.style.marginRight = "5px";
    
            //Edit button functionality
            //Pushes expense to input field once clicked
            editBtn.addEventListener("click", function () {

                //Populating input field with present amount value of expense object in expenses array
                expenseForm.elements["amount"].value = expense.amount;
                expenseForm.elements["description"].value = expense.description;
                expenseForm.elements["category"].value = expense.category;
        
                //Important
                //set new attribute in expense from with value index (index is of object in expenses array which is edited)
                expenseForm.setAttribute("data-edit-index", index);
            });
    
            // Append both buttons to the list item (Do not change order else style will get disturbed)
            li.appendChild(deleteBtn);
            li.appendChild(editBtn);
    
            // Append list item to the expenses list
            expensesList.appendChild(li);
    
            // Insert a line break after each list item except the last one
            if (index < expenses.length - 1) 
            {
             expensesList.appendChild(document.createElement("br"));
            }
        });
  
      // Display total amount (call displayTotalAmount() each time to update value of Total Amount)
      displayTotalAmount();
    }
  
    // Function to display total amount
    function displayTotalAmount() {

      //Total of value added by user each time
      const totalAmount = expenses.reduce((total, expense) => total + expense.amount,0);
  
      const totalElement = document.getElementById("totalAmount");
      totalElement.textContent = `Total Amount: ${totalAmount} Rupees`;
      totalElement.style.fontWeight = "bold"; // Apply bold style
      totalElement.style.marginLeft = "5px"; // Apply bold style
    }
});
  