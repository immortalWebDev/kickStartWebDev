//When user loads page show details of all users
window.addEventListener("DOMContentLoaded",() => {

    axios.get("https://crudcrud.com/api/782a500e424342f294a9208418107409/list")
    .then((response) => {

        for(var i = 0;i<response.data.length;i++)
        {
          displayUserOnScreen(response.data[i])    
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

//Handle form submission when user clicks on submit
function handleFormSubmit(event){

    event.preventDefault()

    //Extract user details from form input
    userDetails = {
        taskName: document.getElementById("taskName").value,
        taskDescription: document.getElementById("taskDescription").value,
        taskStatus: false
    }


    //Push data on sever
    axios.post("https://crudcrud.com/api/782a500e424342f294a9208418107409/list",userDetails)
    .then((response) => {
        displayUserOnScreen(response.data) //display that data on screen also once pushing is successfull
    })
    .catch((error) => {
        console.log(error)
    })

    //Make user input fields empty for another entry
    document.getElementById("taskName").value = ""
    document.getElementById("taskDescription").value = ""
}


function displayUserOnScreen(userDetails){
    
    const taskList= document.getElementById("pendingTasks")

    const taskItem = document.createElement("li")
    
    taskItem.textContent = `${userDetails.taskName} - ${userDetails.taskDescription}`;
    
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.style.marginLeft = "5px"

    // Add click event listener to the "Task Done" button
    doneBtn.addEventListener("click", () => {

        const taskId = userDetails._id;

        const updatedTask = { 
            taskName: userDetails.taskName,
            taskDescription: userDetails.taskDescription,
            taskStatus: true // Update task status to true
         }; // Set taskStatus to true

        // Update task status on the server
        axios.put(`https://crudcrud.com/api/782a500e424342f294a9208418107409/list/${taskId}`, updatedTask)

            .then((response) => {
                
                    const completedTasksList = document.getElementById('completedTasks');
                    completedTasksList.appendChild(taskItem);
                    taskItem.removeChild(doneBtn); // Remove the "Done" button after moving the task

                
            })
            .catch((error) => {
                console.log(error);
            });
    });

    // Append task details and the "Task Done" button to taskItem
    taskList.appendChild(taskItem)

    // taskList.appendChild(doneBtn)
    // taskItem.appendChild(taskDetails);
    taskItem.appendChild(doneBtn);

    
    
}
