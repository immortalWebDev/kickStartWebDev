let students = [];

function addStudent() {
    const name = document.getElementById('nameInput').value;
    const mobile = document.getElementById('mobileInput').value;
    const address = document.getElementById('addressInput').value;
    
    if (name && mobile && address) {
        const student = { name, mobile, address };
        const index = findStudentIndex(name);
        if (index !== -1) {
            students.splice(index, 1, student);
        } else {
            students.push(student);
        }
        displayStudents();
        updateStudentCount();
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
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
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
        studentList.appendChild(studentDiv);
    });
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

function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
    updateStudentCount();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('nameInput').value = student.name;
    document.getElementById('mobileInput').value = student.mobile;
    document.getElementById('addressInput').value = student.address;
}
