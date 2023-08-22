import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeUrl = environment.backend.baseURL + '/api/employee';
  private employeesData: Employee[] = [];
  private employees$ = new ReplaySubject<Employee[]>(1);
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  get employees(): Observable<Employee[]> {
    if (this.employeesData.length === 0) {
      this.fetchEmployees();
    }
    return this.employees$.asObservable();
  }

  private fetchEmployees(): void {
    this.http
      .get<Employee[]>(this.employeeUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.employeesData = [...data];
        this.employees$.next(this.employeesData);
      });
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.http
      .get<Employee>(`${this.employeeUrl}/${employeeId}`)
      .pipe(takeUntil(this.destroy$));
  }

  addEmployee(payload: Employee): void {
    this.http
      .post<Employee>(this.employeeUrl, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.employeesData = [...this.employeesData, data];
        this.employees$.next(this.employeesData);
      });
  }

  updateEmployee(employee: Employee): void {
    this.http
      .put<Employee>(`${this.employeeUrl}/${employee.id}`, employee)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.employeesData = this.employeesData.map((emp) =>
          emp.id === data.id ? data : emp
        );
        this.employees$.next(this.employeesData);
      });
  }

  deleteEmployee(employeeId: string): void {
    this.http
      .delete(`${this.employeeUrl}/${employeeId}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.employeesData = this.employeesData.filter(
          (emp) => emp.id !== employeeId
        );
        this.employees$.next(this.employeesData);
      });
  }

  searchEmployees(
    query: string,
    excludeLoader: boolean = false
  ): Observable<Employee[]> {
    const options = {
      headers: excludeLoader
        ? new HttpHeaders({ excludeLoader: 'true' })
        : undefined,
    };
    return this.http
      .get<Employee[]>(`${this.employeeUrl}/search?q=${query}`, options)
      .pipe(takeUntil(this.destroy$));
  }
}
