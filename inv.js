

window.addEventListener("DOMContentLoaded", () => {

    // Perform a GET request to fetch initial inventory data from the server
    axios.get("https://crudcrud.com/api/8c4534c65b5f4f9d9a203dbb61629944/inventory")
        .then((response) => {
            const inventory = response.data;
            // Loop through the inventory items and print them on the screen
            inventory.forEach((item) => {
                printItem(item);
            });
        })
        .catch((error) => {
            console.error(error);
        });

})


var buyClickCount = 0

function addItem() {
    // Get input values
    const itemName = document.getElementById('itemName').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    

    // Create item object
    const item = {
        itemName: itemName,
        description: description,
        price: price,
        quantity: quantity,
        totalSale: 0

    };

    // Print item on screen
    printItem(item);

    // Perform a POST request to add the new item to the server
    axios.post("https://crudcrud.com/api/8c4534c65b5f4f9d9a203dbb61629944/inventory", item)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    // Clear input fields
    document.getElementById('itemName').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

function printItem(item) {
    // Create item element
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    // Set innerHTML of item element
    itemElement.innerHTML = `
        <p>${item.itemName}</p>
        <p>Description: ${item.description}</p>
        <p>Price: ${item.price} Rs.</p>
        <p>Quantity: <span class="quantity">${item.quantity}</span> 
        <p class="sale-value">Total Sale: ${item.totalSale} Rs.</p>
        <button class="buy-button">Buy</button>
        <button class="delete-button">Delete</button> 
    `;

    // Append item element to inventory list
    document.getElementById('inventoryList').appendChild(itemElement);

    // Add event listener to the "Buy" button
    const buyButton = itemElement.querySelector('.buy-button');
    buyButton.addEventListener('click', () => {
        buyClickCount++

        const saleValue = item.price * buyClickCount
        const saleElement = itemElement.querySelector(".sale-value")
        saleElement.textContent = `Total Sale: ${saleValue} Rs.`;

        const quantityElement = itemElement.querySelector('.quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 0) {
            currentQuantity--;
            quantityElement.textContent = currentQuantity;

            const updatedInventory = {
                itemName: item.itemName,
                description: item.description,
                price: item.price,
                quantity: currentQuantity,
                // totalSale: item.price * buyClickCount
                totalSale: item.price * buyClickCount
            }

            // Perform a PUT request to update the quantity on the server
            axios.put(`https://crudcrud.com/api/8c4534c65b5f4f9d9a203dbb61629944/inventory/${item._id}`, updatedInventory)
                .then((response) => {
                    
                    document.getElementById('inventoryList').appendChild(itemElement);

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });

    // Add event listener to the "Delete" button
    const deleteButton = itemElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteItem(item._id, itemElement);
    });
}

function deleteItem(itemId, itemElement) {
    // Perform a DELETE request to delete the item from the server
    axios.delete(`https://crudcrud.com/api/8c4534c65b5f4f9d9a203dbb61629944/inventory/${itemId}`)
        .then(() => {
            console.log("Item deleted successfully");
            // Remove the item element from the DOM
            itemElement.remove();
        })
        .catch((error) => {
            console.error(error);
        });
}
