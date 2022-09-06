export class UI {
  constructor() {
    this.employees = document.querySelector("#employees");
    this.nameInput = document.querySelector("#name");
    this.departmentInput = document.querySelector("#department");
    this.salaryInput = document.querySelector("#salary");
  }

  showEmployeesToUI(employeeList) {
    employeeList.forEach(employee => (
      this.employees.innerHTML += `
      <tr>                                       
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
        <td>${employee.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
      </tr>
      `
    ))
  }

  clearInputs() {
    this.nameInput.value = "";
    this.salaryInput.value = "";
    this.departmentInput.value = "";
  }

  addEmployeeToUI(emp) {
    this.employees.innerHTML += `
      <tr>                                       
        <td>${emp.name}</td>
        <td>${emp.department}</td>
        <td>${emp.salary}</td>
        <td>${emp.id}</td>
        <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
        <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
      </tr>
    `
  }

  clearEmployeeFromUI(element) {
    element.parentElement.parentElement.remove()
  }
}