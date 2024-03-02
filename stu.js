// Add event listener to window to fetch and display student details upon page refresh
window.addEventListener('DOMContentLoaded', () => {
    // fetchStudents();

    axios.get('https://crudcrud.com/api/ce748e7dd0a5451595ca497c62d288a8/stu')
        .then(response => {
            students = response.data;
            displayStudents();
            updateStudentCount();
        })
        .catch(error => console.error('Error fetching students:', error));
});

let students = [];

function addStudent() {
    const name = document.getElementById('nameInput').value;
    const mobile = document.getElementById('mobileInput').value;
    const address = document.getElementById('addressInput').value;
    
    if (name && mobile && address) {
        const student = { name, mobile, address };
        const index = findStudentIndex(name);
        if (index !== -1) {
            updateStudent(student, index);
        } else {
            createStudent(student);
        }
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
}

function createStudent(student) {
    axios.post('https://crudcrud.com/api/ce748e7dd0a5451595ca497c62d288a8/stu', student)
        .then(response => {
            students.push(response.data);
            displayStudents();
            updateStudentCount();
        })
        .catch(error => console.error('Error creating student:', error));
}

function updateStudent(student, index) {
    axios.put(`https://crudcrud.com/api/ce748e7dd0a5451595ca497c62d288a8/stu/${students[index]._id}`, student)
        .then(response => {
            students[index] = response.data;
            displayStudents();
        })
        .catch(error => console.error('Error updating student:', error));
}

function displayStudents() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const studentDiv = document.createElement('div');
        studentDiv.classList.add('student');
        studentDiv.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Mobile:</strong> ${student.mobile}</p>
            <p><strong>Address:</strong> ${student.address}</p>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent('${student._id}', ${index})">Delete</button>
        `;
        studentList.appendChild(studentDiv);
    });
}

function deleteStudent(studentId, index) {
    axios.delete(`https://crudcrud.com/api/ce748e7dd0a5451595ca497c62d288a8/stu/${studentId}`)
        .then(() => {
            students.splice(index, 1);
            displayStudents();
            updateStudentCount();
        })
        .catch(error => console.error('Error deleting student:', error));
}

function editStudent(index) {
    const student = students[index];
    if(student){
    document.getElementById('nameInput').value = student.name || "";
    document.getElementById('mobileInput').value = student.mobile || "";
    document.getElementById('addressInput').value = student.address || "";
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
    for (let i = 0; i < students.length; i++) {
        if (students[i].name === name) {
            return i;
        }
    }
    return -1;
}
