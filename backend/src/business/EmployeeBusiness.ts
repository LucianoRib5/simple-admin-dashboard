import { EmployeeRepository } from '../repository/employeeRepository';
import { EmployeeDto, EmployeeResponseDto } from '../dtos/createEmployeeDto';
import { IEmployee } from '../models/employeeModel';

export class EmployeeBusiness {
  private employeeRepository = new EmployeeRepository()

  public createNewEmployee = async (employee: EmployeeDto) => {
    const response = await this.employeeRepository.createNewEmployee(employee)

    const { name, position, department, hireDate, _id} = response

    const newEmployee: EmployeeResponseDto = {
      id: _id as string,
      name,
      position,
      department,
      hireDate
    }

    return newEmployee;
  };
}