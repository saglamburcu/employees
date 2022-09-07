import { Request } from "./request";
import { UI } from "./ui";

const form = document.querySelector("#employee-form");
const nameInput = document.querySelector("#name");
const departmentInput = document.querySelector("#department");
const salaryInput = document.querySelector("#salary");
const secondCard = document.querySelectorAll(".card-body")[1];
const updateBtn = document.querySelector("#update");

let employeeInfo = null;

const request = new Request("http://localhost:3000/employe");
const ui = new UI();

function eventListeners() {
  form.addEventListener("submit", addEmployeeToList);
  document.addEventListener("DOMContentLoaded", getAllEmployeesFromAPI);
  secondCard.addEventListener("click", updateOrDeleteEmployee);
  updateBtn.addEventListener("click", updateEmployee);
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

    ui.showInputArea(e.target.parentElement.parentElement);
    ui.showUpdateButton(updateBtn);

    if (employeeInfo === null) {
      employeeInfo = {
        empId: e.target.parentElement.parentElement.children[3].textContent,
        emp: e.target.parentElement.parentElement
      }
    } else {
      employeeInfo = null;
    }

  }
}

const updateEmployee = () => {
  request.put(employeeInfo.empId, {
    name: nameInput.value,
    department: departmentInput.value,
    salary: salaryInput.value

  }).then(resp => {
    console.log(employeeInfo, resp)
    ui.addUpdatedEmployeeToUI(employeeInfo.emp, resp);
    ui.hideUpdateButton(updateBtn);
  })
}

eventListeners();