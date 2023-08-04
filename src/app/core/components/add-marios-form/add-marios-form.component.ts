import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { MariosReaction } from '../../enums/marios-reaction.enum';
import { Employee, EmployeeWithFullName } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MariosService } from '../../services/marios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-marios-form',
  templateUrl: './add-marios-form.component.html',
  styleUrls: ['./add-marios-form.component.scss'],
})
export class AddMariosFormComponent implements OnInit, OnDestroy {
  employeesData: EmployeeWithFullName[] = [];
  employees$ = new ReplaySubject<EmployeeWithFullName[]>(1);
  form: FormGroup = new FormGroup({});
  enumValues = Object.values(MariosReaction);
  characterCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private mariosService: MariosService,
    private router: Router
  ) {}

  selected: EmployeeWithFullName[] = [];

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

    this.form.get('message')?.valueChanges.subscribe((value: string) => {
      this.characterCount = value.length;
    });
  }

  onSubmit() {
    this.form.value.receiversId = this.form.value.receiversId.map(
      (employee: Employee) => employee.id
    );
    if (this.form.valid) {
      console.log(this.form.value);
      this.mariosService.addMarios(this.form.value).subscribe(
        (response) => {
          console.log('Marios added successfully:', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error while adding Marios:', error);
        }
      );
    }
  }

  onSearchChange(event: { term: string; items: any[] }) {
    this.employeeService.searchEmployees(event.term, true).subscribe(
      (data: Employee[]) => {
        const employees: EmployeeWithFullName[] = data.map(employee => ({
          ...employee,
          fullName: `${employee.firstName} ${employee.lastName}`
        }));
        this.employees$.next(employees);
      },
      (error) => {
        console.error('Error while fetching data:', error);
      }
    );
  }

  getBackgroundImage(value: MariosReaction): string {
    switch (value) {
      case MariosReaction.THANK_YOU:
        return '/assets/images/stars/THANK_YOU.svg';
      case MariosReaction.GOOD_JOB:
        return '/assets/images/stars/GOOD_JOB.svg';
      case MariosReaction.IMPRESSIVE:
        return '/assets/images/stars/IMPRESSIVE.svg';
      case MariosReaction.EXCEPTIONAL:
        return '/assets/images/stars/EXCEPTIONAL.svg';
      case MariosReaction.AWESOME:
        return '/assets/images/stars/AWESOME.svg';
      case MariosReaction.OUTSTANDING:
        return '/assets/images/stars/OUTSTANDING.svg';
      default:
        return '';
    }
  }

  getCharacterCount(): number {
    return this.characterCount;
  }

  ngOnDestroy() {
    this.employees$.complete();
  }
}
