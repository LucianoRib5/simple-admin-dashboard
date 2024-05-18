import { EmployeeRepository } from '../repository/employeeRepository';
import { EmployeeDto, EmployeeResponseDto } from '../dtos/createEmployeeDto';
import { IEmployee } from '../models/employeeModel';
import { CustomError } from '../errors/CustomError';

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

  public getEmployeeById = async (employeeId: string) => {
    const response = await this.employeeRepository.getEmployeeById(employeeId);

    const { name, position, department, hireDate, _id} = response

    const employee: EmployeeResponseDto = {
      id: _id as string,
      name,
      position,
      department,
      hireDate
    }

    return employee;
  };

  public deleteEmployee = async (employeeId: string) => {
    const response = await this.employeeRepository.deleteEmployee(employeeId);
    return response;
  };
}