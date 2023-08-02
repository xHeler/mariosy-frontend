import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MariosReaction } from '../../enums/marios-reaction.enum';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-marios-form',
  templateUrl: './add-marios-form.component.html',
  styleUrls: ['./add-marios-form.component.scss'],
})
export class AddMariosFormComponent implements OnInit {
  employeesData: Employee[] = [];
  employees$ = new ReplaySubject<Employee[]>(1);
  form: FormGroup = new FormGroup({});
  enumValues = Object.values(MariosReaction);

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  selected: Employee[] = [];

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      receiversId: [''],
      reaction: '',
      title: ['', Validators.required],
      message: [''],
    });
  }

  onSubmit() {
    this.form.value.receiversId = this.form.value.receiversId.map(
      (employee: Employee) => employee.id
    );
    console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  onSearchChange(event: { term: string; items: any[] }) {
    this.employeeService.searchEmployees(event.term, true).subscribe(
      (data) => {
        this.employeesData = [...data];
        this.employees$.next(this.employeesData);
      },
      (error) => {
        console.error('Error while fetching data:', error);
      }
    );
  }
}
