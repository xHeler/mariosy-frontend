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
    this.form
      .get('receiversId')
      ?.valueChanges.subscribe((value) => (this.selected = value));
  }

  private createForm() {
    this.form = this.formBuilder.group({
      receiversId: [''],
      reaction: '',
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(128),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ],
      ],
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
      this.mariosService.addMarios(this.form.value).subscribe(
        () => {
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error while adding Marios:', error);
        }
      );
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  ngOnDestroy() {
    this.employees$.complete();
  }
}
