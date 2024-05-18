import { EmployeeRepository } from '../repository/employeeRepository';
import { CreateEmployeeDto } from '../dtos/createEmployeeDto';
import { IEmployee } from '../models/employeeModel';

export class EmployeeBusiness {
  private employeeRepository = new EmployeeRepository()

  public createNewEmployee = async (employee: CreateEmployeeDto) => {
    const response = await this.employeeRepository.createNewEmployee(employee)

    const { name, position, department, hireDate} = response

    const newEmployee: IEmployee = {
      name,
      position,
      department,
      hireDate
    }

    return newEmployee;
  };
}