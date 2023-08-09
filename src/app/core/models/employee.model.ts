export interface Employee {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
}

export interface EmployeeWithFullName extends Employee {
  fullName: string;
}