const params = new URLSearchParams(window.location.search);

const employeeId = params.get("id");

loadEmployee();

async function loadEmployee() {

  const response = await fetch(

    `${BASE_URL}/employees`

  );

  const employees = await response.json();

  const employee = employees.find(e => e.id == employeeId);

  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("position").value = employee.position;
  document.getElementById("salary").value = employee.salary;

}

document.getElementById("updateBtn")
  .addEventListener("click", updateEmployee);

async function updateEmployee() {

  const employee = {

    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    position: document.getElementById("position").value,
    salary: document.getElementById("salary").value
  };

  const response = await fetch(

    `${BASE_URL}/employees/${employeeId}`,

    {


      method: "PATCH",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(employee)

    }

  );
  if (!response.ok) {
    const error = await response.json();
    alert(error.message);
    return;
  }

  alert("Updated");

}

document.getElementById("deleteBtn")
  .addEventListener("click", deleteEmployee);

async function deleteEmployee() {

  const deptId = prompt("Department Id");

  const response = await fetch(

    `${BASE_URL}/employees/departments/${deptId}/${employeeId}`,

    {

      method: "DELETE"

    }

  );


  if (!response.ok) {
    const error = await response.json();
    alert(error.message);
    return;
  }

  alert("Deleted");

  window.location = "index.html";

}