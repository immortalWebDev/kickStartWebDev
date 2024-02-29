
// Function to fetch tasks from the server and display them
window.addEventListener("DOMContentLoaded", () => {

    axios.get("https://crudcrud.com/api/0f6b71e2b8ef4177afec0afdf6144806/list")
        .then((response) => {
            const tasks = response.data;
            // displayTask(task,taskList)
            tasks.forEach(task => {

                if (task.taskStatus) {
                    displayCompletedTask(task);
                }
                else {
                    displayPendingTask(task);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching tasks:", error);
        });
});

// Function to handle form submission when user clicks on submit
function handleFormSubmit(event) {
    event.preventDefault();

    // Extract task details from form input
    const task = {
        taskName: document.getElementById("taskName").value,
        taskDescription: document.getElementById("taskDescription").value,
        taskStatus: false // New tasks are always pending initially
    };

    // Push data to server
    axios.post("https://crudcrud.com/api/0f6b71e2b8ef4177afec0afdf6144806/list", task)
        .then((response) => {
            displayPendingTask(response.data); // Display the new task in pending tasks
        })
        .catch((error) => {
            console.error("Error adding task:", error);
        });

    // Clear form input fields for another entry
    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
}

// Function to display a task in the pending tasks list
function displayPendingTask(task) {
    const taskList = document.getElementById("pendingTasks");
    displayTask(task, taskList);
}

// Function to display a task in the completed tasks list
function displayCompletedTask(task) {
    const taskList = document.getElementById("completedTasks");
    displayTask(task, taskList);
}

// Function to create task item and attach event listeners
function displayTask(task, taskList) {
    const taskItem = document.createElement("li");
    taskItem.textContent = `${task.taskName} - ${task.taskDescription}`;

    if (!task.taskStatus) {
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "Done";
        doneBtn.style.marginLeft = "5px";

        doneBtn.addEventListener("click", () => {

            const taskId = task._id;
            const updatedTask = {
                taskName: task.taskName,
                taskDescription: task.taskDescription,
                taskStatus: true // Update task status to true
            };

            // Update task status on the server
            axios.put(`https://crudcrud.com/api/0f6b71e2b8ef4177afec0afdf6144806/list/${taskId}`, updatedTask)
                .then((response) => {
                    // taskList.removeChild(taskItem); // Remove the task from the current list
                    // if (!task.taskStatus) 
                    // {
                    // displayCompletedTask(task); // Display the task in the completed tasks list
                    // }

                    const completedTasksList = document.getElementById('completedTasks');
                    completedTasksList.appendChild(taskItem);


                    taskItem.removeChild(doneBtn); // Remove the "Done" button after moving the task
                })
                .catch((error) => {
                    console.error("Error updating task status:", error);
                });



        });

        taskItem.appendChild(doneBtn);

    }
    taskList.appendChild(taskItem);


}