document.addEventListener('DOMContentLoaded', function() {
    // Add input element inside form, before button, to take fruit description
    const form = document.querySelector('form');
    const button = document.querySelector('button');
    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('placeholder', 'Enter fruit description');
    descriptionInput.setAttribute('id', 'description');
    form.insertBefore(descriptionInput, button);

    // Show the fruit description in italics on the next line
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const fruitName = document.querySelector('#fruit-to-add').value;
        const fruitDescription = document.querySelector('#description').value;
        const fruitList = document.querySelector('.fruits');
        const fruitItem = document.createElement('li');
        fruitItem.classList.add('fruit');
        
        // Create separate elements for the fruit name and description, and format the description in italics
        const nameElement = document.createElement('span');
        nameElement.textContent = fruitName;
        
        const descriptionElement = document.createElement('p');
        const italicElement = document.createElement('em');
        italicElement.textContent = fruitDescription;
        descriptionElement.appendChild(italicElement);
        
        // Append the name and description elements to the fruit item
        fruitItem.appendChild(nameElement);
        fruitItem.appendChild(descriptionElement);
        
        // Add the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('delete-btn');
        fruitItem.appendChild(deleteButton);
        
        // Append the fruit item to the fruit list
        fruitList.appendChild(fruitItem);

        // Ensure that the fruit description appears in italics
        italicElement.style.fontStyle = "italic";
    });

    // Create a filter that shows only those fruits whose either name or description or both matches the entered text
    var filter = document.getElementById("filter");

    filter.addEventListener("keyup", function(event) {
        var textEntered = event.target.value.toLowerCase();
      
        var fruitItems = document.getElementsByClassName("fruit");
      
        for (var i = 0; i < fruitItems.length; i++) {
            var currentFruitText = fruitItems[i].textContent.toLowerCase();
            
            if (currentFruitText.indexOf(textEntered) === -1) {
                fruitItems[i].style.display = "none";
            } else {
                fruitItems[i].style.display = "flex";
            }
        }
    });
});
