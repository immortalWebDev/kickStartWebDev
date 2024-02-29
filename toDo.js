//When user loads page show details of all users
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get("https://crudcrud.com/api/0f6b71e2b8ef4177afec0afdf6144806/list")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].taskStatus) {
                    displayCompletedTask(response.data[i]);
                } else {
                    displayPendingTask(response.data[i]);
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

//Handle form submission when user clicks on submit
function handleFormSubmit(event) {
    event.preventDefault();

    //Extract user details from form input
    task = {
        taskName: document.getElementById("taskName").value,
        taskDescription: document.getElementById("taskDescription").value,
        taskStatus: false,
    };

    //Push data on sever
    axios
        .post(
            "https://crudcrud.com/api/0f6b71e2b8ef4177afec0afdf6144806/list",
            task
        )
        .then((response) => {
            displayPendingTask(response.data); //display that data on screen also once pushing is successfull
        })
        .catch((error) => {
            console.log(error);
        });

    //Make user input fields empty for another entry
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
}

// Function to display a pending task
function displayPendingTask(task) {
    const taskList = document.getElementById("pendingTasks");
    displayTask(task, taskList);
}

// Function to display a completed task
function displayCompletedTask(task) {
    const taskList = document.getElementById("completedTasks");
    // taskList.removeChild(doneBtn)
    displayTask(task, taskList);
}

function displayTask(task, taskList) {
    // const taskList= document.getElementById("pendingTasks")

    const taskItem = document.createElement("li");

    taskItem.textContent = `${task.taskName} - ${task.taskDescription}`;

    if (!task.taskStatus) {
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.style.marginLeft = "5px";

        // Add click event listener to the "Task Done" button
        doneBtn.addEventListener("click", () => {
            const taskId = task._id;

            const updatedTask = {
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskStatus: true, // Update task status to true
            }; // Set taskStatus to true

            // Update task status on the server
            axios
                .put(
                    `https://crudcrud.com/api/0f6b71e2b8ef4177afec0afdf6144806/list/${taskId}`,
                    updatedTask
                )

                .then((response) => {
                    const completedTasksList = document.getElementById("completedTasks");
                    completedTasksList.appendChild(taskItem);

                    taskItem.removeChild(doneBtn); // Remove the "Done" button after moving the task
                })
                .catch((error) => {
                    console.log(error);
                });
        });

        // Append task details and the "Task Done" button to taskItem
        taskItem.appendChild(doneBtn);
    }
    taskList.appendChild(taskItem);

    // taskList.appendChild(doneBtn)
    // taskItem.appendChild(taskDetails);


    
}
