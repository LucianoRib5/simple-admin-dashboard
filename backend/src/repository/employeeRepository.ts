import { EmployeeDto } from '../dtos/createEmployeeDto';
import { IEmployee } from '../models/employeeModel';
import Employee from '../models/employeeModel';

export class EmployeeRepository {
    public createNewEmployee = async (employee: EmployeeDto): Promise<IEmployee> => {
        const { name, position, department, hireDate} = employee
        const newEmployee = new Employee({ name, position, department, hireDate })
        await newEmployee.save()
        return newEmployee
    };
}