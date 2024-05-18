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

  public getAllEmployees = async () => {
    const response = await this.employeeRepository.getAllEmployees();

    const employees = response.map(employee => {
      const employeeDto: EmployeeResponseDto = {
        id: employee._id as string,
        name: employee.name,
        position: employee.position,
        department: employee.department,
        hireDate: employee.hireDate
      }

      return employeeDto
    })


    return employees;
  };

  public updateEmployee = async (employeeId: string, employeeDto: EmployeeDto) => {
    const response = await this.employeeRepository.updateEmployee(employeeId, employeeDto)

    const { name, position, department, hireDate, _id} = response

    const updatedEmployee: EmployeeResponseDto = {
      id: _id as string,
      name,
      position,
      department,
      hireDate
    }

    return updatedEmployee;
  };

  public deleteEmployee = async (employeeId: string) => {
    const response = await this.employeeRepository.deleteEmployee(employeeId);
    return response;
  };
}