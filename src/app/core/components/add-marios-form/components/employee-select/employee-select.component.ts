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
        const employees: EmployeeWithFullName[] = this.mapEmployees(data);
        const filteredEmployees = this.filterSelectedEmployees(employees);
        this.employees$.next(filteredEmployees);
      },
      (error) => {
        console.error('Error while fetching data:', error);
      }
    );
  }

  private mapEmployees(data: Employee[]): EmployeeWithFullName[] {
    return data.map((employee) => ({
      ...employee,
      fullName: `${employee.firstName} ${employee.lastName}`,
    }));
  }

  private filterSelectedEmployees(
    employees: EmployeeWithFullName[]
  ): EmployeeWithFullName[] {
    return employees.filter((employee) => !this.existsInSelected(employee));
  }

  private existsInSelected(employee: EmployeeWithFullName): boolean {
    return this.selected.some((e) => e.id === employee.id);
  }
}
