import { Request, Response } from "express";
import { EmployeeBusiness } from "../business/EmployeeBusiness";
import { EmployeeDto } from "../dtos/createEmployeeDto";
import { validateBody } from "./utils/validateBody";

export class EmployeeController {
  private employeeBusiness = new EmployeeBusiness()

  public createNewEmployee = async (req: Request, res: Response) => {
    try {
      const { name, position, department, hireDate } = req.body

      const bodyDto: EmployeeDto = {
        name,
        position,
        department,
        hireDate: new Date(hireDate)  
      }

      const errors = await validateBody(EmployeeDto, bodyDto);
  
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newEmployee = await this.employeeBusiness.createNewEmployee(bodyDto);
      res.send(newEmployee);      
    } catch (err: any) {
      res.status(err.status || 400).send(err.message);
    };
  };

  public getEmployeeById = async (req: Request, res: Response) => {
    try {
      const employeeId: string = req.params.id
      const employee = await this.employeeBusiness.getEmployeeById(employeeId);
      res.send(employee);      
    } catch (err: any) {
      res.status(err.statusCode).send(err.errorHandler());
    };
  };

  public getAllEmployees = async (req: Request, res: Response) => {
    try {
      const employees = await this.employeeBusiness.getAllEmployees();
      res.send(employees);      
    } catch (err: any) {
      res.status(err.statusCode).send(err.errorHandler());
    };
  };

  public updateEmployee = async (req: Request, res: Response) => {
    try {
      const { name, position, department, hireDate } = req.body
      const employeeId: string = req.params.id

      const bodyDto: EmployeeDto = {
        name,
        position,
        department,
        hireDate: new Date(hireDate)  
      }

      const errors = await validateBody(EmployeeDto, bodyDto);
  
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const updatedEmployee = await this.employeeBusiness.updateEmployee(employeeId, bodyDto);
      res.send(updatedEmployee);      
    } catch (err: any) {
      res.status(err.status || 400).send(err.message);
    };
  };

  public deleteEmployee = async (req: Request, res: Response) => {
    try {
      const employeeId: string = req.params.id
      const response = await this.employeeBusiness.deleteEmployee(employeeId);
      res.send(response);      
    } catch (err: any) {
      res.status(err.statusCode).send(err.errorHandler());
    };
  };
}
