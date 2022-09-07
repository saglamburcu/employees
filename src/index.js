import { Request } from "./request";
import { UI } from "./ui";

const form = document.querySelector("#employee-form");
const employees = document.querySelector("#employees");
const nameInput = document.querySelector("#name");
const departmentInput = document.querySelector("#department");
const salaryInput = document.querySelector("#salary");
const secondCard = document.querySelectorAll(".card-body")[1];
const updateBtn = document.querySelector("#update");

let employeeId;

const request = new Request("http://localhost:3000/employe");
const ui = new UI();

function eventListeners() {
  form.addEventListener("submit", addEmployeeToList);
  document.addEventListener("DOMContentLoaded", getAllEmployeesFromAPI);
  secondCard.addEventListener("click", updateOrDeleteEmployee);

}

const getAllEmployeesFromAPI = () => {
  request.get()
    .then(response => ui.showEmployeesToUI(response))
    .catch(err => console.log(err))
}

const addEmployeeToList = (e) => {

  if (nameInput.value !== "" && departmentInput.value !== "" && salaryInput.value !== "") {
    request.post({
      name: nameInput.value,
      department: departmentInput.value,
      salary: Number(salaryInput.value)
    }).then(resp => {
      ui.addEmployeeToUI(resp);
    })
      .catch(err => console.log(err))
  } else {
    //Hata
  }
  ui.clearInputs();

  e.preventDefault();
}

const updateOrDeleteEmployee = (e) => {
  if (e.target.id === "delete-employee") {
    request.delete(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
      .then(message => ui.clearEmployeeFromUI(e.target))
      .catch(err => console.log(err));

  } else if (e.target.id === "update-employee") {

    employeeId = e.target.parentElement.previousElementSibling.textContent;
    let employeeName = e.target.parentElement.parentElement.children[0].textContent;
    let employeeDepartment = e.target.parentElement.parentElement.children[1].textContent;
    let employeeSalary = e.target.parentElement.parentElement.children[2].textContent;

    nameInput.value = employeeName;
    departmentInput.value = employeeDepartment;
    salaryInput.value = employeeSalary;

    ui.showUpdateButton(updateBtn);
    updateEmployee(employeeName, employeeDepartment, employeeSalary)

  }
}

const updateEmployee = (empName, empDepartment, employeeSalary) => {
  updateBtn.addEventListener("click", () => {
    request.put(employeeId, {
      name: nameInput.value,
      department: departmentInput.value,
      salary: salaryInput.value

    }).then(resp => {

      empName = resp.name;
      empDepartment = resp.department;
      employeeSalary = resp.salary;

      ui.clearInputs();
      ui.hideUpdateButton(updateBtn);

    }).catch(err => console.log(err))
  });

}
eventListeners();