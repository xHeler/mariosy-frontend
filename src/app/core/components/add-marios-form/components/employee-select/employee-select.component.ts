import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Employee,
  EmployeeWithFullName,
} from '../../../../models/employee.model';
import { EmployeeService } from '../../../../services/employee.service';

import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.scss'],
})
export class EmployeeSelectComponent {
  @Input() control: FormControl | any;
  employees$ = new ReplaySubject<EmployeeWithFullName[]>(1);
  selected: EmployeeWithFullName[] = [];

  constructor(private employeeService: EmployeeService) {}

  onSearchChange(event: { term: string; items: any[] }) {
    this.employeeService.searchEmployees(event.term, true).subscribe(
      (data: Employee[]) => {
        let employees: EmployeeWithFullName[] = data.map((employee) => ({
          ...employee,
          fullName: `${employee.firstName} ${employee.lastName}`,
        }));

        employees = employees.filter(
          (employee) => !this.existsInSelected(employee)
        );

        this.employees$.next(employees);
      },
      (error) => {
        console.error('Error while fetching data:', error);
      }
    );
  }

  private existsInSelected(employee: EmployeeWithFullName): boolean {
    return this.selected.some((e) => e.id === employee.id);
  }
}
