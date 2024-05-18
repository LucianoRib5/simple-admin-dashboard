import { EmployeeDto } from '../dtos/createEmployeeDto';
import { CustomError } from '../errors/CustomError';
import { IEmployee } from '../models/employeeModel';
import Employee from '../models/employeeModel';

export class EmployeeRepository {
    public createNewEmployee = async (employee: EmployeeDto): Promise<IEmployee> => {
        const { name, position, department, hireDate} = employee
        const newEmployee = new Employee({ name, position, department, hireDate })
        await newEmployee.save()
        return newEmployee
    };

    public getEmployeeById = async (employeeId: string): Promise<IEmployee> => {
        try {
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                throw new CustomError(
                    `Funcionário com id ${employeeId} não encontrado!`,
                    'EMPLOYEE_NOT_FOUND',
                    404
                );
            }
            return employee;
        } catch (err: any) {
            throw err
        }
    };

    public getAllEmployees = async (): Promise<IEmployee[]> => {
        try {
            const employees = await Employee.find();
            if (!employees || employees.length === 0) {
                throw new CustomError(
                    `Nenhum funcionário encontrado!`,
                    'EMPLOYEES_NOT_FOUND',
                    404
                );
            }
            return employees;
        } catch (err: any) {
            throw err;
        }
    };

    
    public updateEmployee = async (employeeId: string, employeeDto: EmployeeDto): Promise<IEmployee> => {
        const { name, position, department, hireDate } = employeeDto;
    
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            throw new CustomError(
                `Funcionário com id ${employeeId} não encontrado!`,
                'EMPLOYEE_NOT_FOUND',
                404
            );
        }
    
        employee.set({
            name,
            position,
            department,
            hireDate
        });
    
        await employee.save();
        return employee;
    };
    

    public deleteEmployee = async (employeeId: string): Promise<boolean> => {
        try {
            const employee = await Employee.findById(employeeId);
            if (!employee) {
                throw new CustomError(
                    `Funcionário com id ${employeeId} não encontrado!`,
                    'EMPLOYEE_NOT_FOUND',
                    404
                );
            }
            const result = await Employee.deleteOne({ _id: employeeId });
            return result.deletedCount === 1;
        } catch (err: any) {
            throw err
        }
    };
}