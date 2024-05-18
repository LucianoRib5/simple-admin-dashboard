import { Router } from "express";
import { EmployeeController } from "../EmployeeController";

export const employeeRouter = Router();

const employeeController = new EmployeeController()

employeeRouter.post('/employees', employeeController.createNewEmployee);
employeeRouter.delete('/employees/:id', employeeController.deleteEmployee);