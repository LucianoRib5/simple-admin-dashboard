import { Request, Response } from "express";
import { EmployeeBusiness } from "../business/EmployeeBusiness";
import { CreateEmployeeDto } from "../dtos/createEmployeeDto";
import { validateBody } from "./utils/validateBody";

export class EmployeeController {
  private employeeBusiness = new EmployeeBusiness()

  public createNewEmployee = async (req: Request, res: Response) => {
    try {
      const { name, position, department, hireDate } = req.body

      const bodyDto: CreateEmployeeDto = {
        name,
        position,
        department,
        hireDate: new Date(hireDate)  
      }

      const errors = await validateBody(CreateEmployeeDto, bodyDto);
  
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newEmployee = await this.employeeBusiness.createNewEmployee(bodyDto);
      res.send(newEmployee);      
    } catch (err: any) {
      res.status(err.status || 400).send(err.message);
    };
  };
}
