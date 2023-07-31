import { Employee } from "./employee.model";
import { Marios } from "./marios.model";

export interface MariosElement {
  marios: Marios,
  sender: Employee,
  receiver: Employee
}