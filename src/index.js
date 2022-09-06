import { Request } from "./request";
import { UI } from "./ui";

const form = document.querySelector("#employee-form");
const employees = document.querySelector("#employees");
const nameInput = document.querySelector("#name");
const departmentInput = document.querySelector("#department");
const salaryInput = document.querySelector("#salary");

const request = new Request("http://localhost:3000/employe");
const ui = new UI();

function eventListeners() {
  form.addEventListener("submit", addEmployeeToList);
  document.addEventListener("DOMContentLoaded", getAllEmployeesFromAPI)
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

const addEmployee = () => {




}

eventListeners();