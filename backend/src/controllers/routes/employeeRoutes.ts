import { Router } from "express";
import { EmployeeController } from "../EmployeeController";

export const employeeRouter = Router();

const employeeController = new EmployeeController()

employeeRouter.post('/employees', employeeController.createNewEmployee);
employeeRouter.get('/employees', employeeController.getAllEmployees);
employeeRouter.get('/employees/:id', employeeController.getEmployeeById);
employeeRouter.put('/employees/:id', employeeController.updateEmployee);
employeeRouter.delete('/employees/:id', employeeController.deleteEmployee);