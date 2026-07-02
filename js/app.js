const button = document.getElementById("searchBtn");

const report = document.getElementById("downloadReport");

button.addEventListener("click", loadEmployees);

report.addEventListener("click", downloadReport)

async function loadEmployees() {

    const deptId = document.getElementById("departmentId").value;

    if (!deptId) {
        alert("Enter Department ID");
        return;
    }

    const response = await fetch(
        `${BASE_URL}/employees/departments/${deptId}`
    );

    if (!response.ok) {
        const error = await response.json();
        alert(error.message);
        return;
    }

    const employees = await response.json();
    if (employees.length === 0) {
        alert("No employees in this department");
        document.querySelector("#employeeTable tbody").innerHTML = "";
        return;
    }

    const tbody = document.querySelector("#employeeTable tbody");

    tbody.innerHTML = "";

    employees.forEach(emp => {

        tbody.innerHTML += `

<tr onclick="openDetails(${emp.id})">

<td>${emp.id}</td>

<td>${emp.name}</td>

<td>${emp.email}</td>

<td>${emp.position}</td>

<td>${emp.salary}</td>

</tr>

`;

    });

}

async function downloadReport() {
    try {
        const response = await fetch(`${BASE_URL}/pdf/report`);

        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to download report.");
    }
}

function openDetails(id) {

    window.location.href = `details.html?id=${id}`;

}