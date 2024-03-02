//final working


let students = [];


window.addEventListener('DOMContentLoaded', fetchStudents);

// Function to fetch student details from the server
function fetchStudents() {
    axios.get('https://crudcrud.com/api/60f053e5ae4a49369b83b21660be3b2d/stu')
        .then(response => {
            students = response.data;
            displayStudents();
            updateStudentCount();
        })
        .catch(error => console.error(error));
}

function addStudent() {
    const name = document.getElementById('nameInput').value;
    const mobile = document.getElementById('mobileInput').value;
    const address = document.getElementById('addressInput').value;

    
        const student = { name, mobile, address };
        const index = findStudentIndex(name);
        if (index !== -1) {
            updateStudent(student, students[index]._id);
        } else {
            createStudent(student);
        }
        clearInputs();
    
}

function createStudent(student) {
    axios.post('https://crudcrud.com/api/60f053e5ae4a49369b83b21660be3b2d/stu', student)
        .then(fetchStudents) 
        .catch(error => console.error(error));
}

function updateStudent(student, studentId) {
    axios.put(`https://crudcrud.com/api/60f053e5ae4a49369b83b21660be3b2d/stu/${studentId}`, student)
        .then(fetchStudents) 
        .catch(error => console.error('Error updating student:', error));
}

function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');
        studentDiv.innerHTML = `
             <p>Name: ${student.name} - 
                Mobile: ${student.mobile} - 
                Address: ${student.address} - 
                <button onclick="editStudent(${index})">Edit</button> |
                <button onclick="deleteStudent('${student._id}')">Delete</button>
             </p>
        `;

        studentList.appendChild(studentDiv);
    });
}

function deleteStudent(studentId) {
    axios.delete(`https://crudcrud.com/api/60f053e5ae4a49369b83b21660be3b2d/stu/${studentId}`)
        .then(fetchStudents) // Fetch the latest data after deleting
        .catch(error => console.error(error));
}

function editStudent(index) {
    const student = students[index];
    if (student) {
        document.getElementById('nameInput').value = student.name;
        document.getElementById('mobileInput').value = student.mobile;
        document.getElementById('addressInput').value = student.address;
    }
}

function updateStudentCount() {
    const count = students.length;
    document.getElementById('studentCount').textContent = count;
}

function clearInputs() {
    document.getElementById('nameInput').value = '';
    document.getElementById('mobileInput').value = '';
    document.getElementById('addressInput').value = '';
}

function findStudentIndex(name) {
    return students.findIndex(student => student.name === name);
}
