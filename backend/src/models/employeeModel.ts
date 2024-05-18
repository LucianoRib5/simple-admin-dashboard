import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document{
  name: string;
  position: string;
  department: string;
  hireDate: Date;
}

const EmployeeModel: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    hireDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  }, 
  {timestamps: true}
);

const Employee = mongoose.model<IEmployee>('Employee', EmployeeModel);

export default Employee;
