import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MariosService } from '../../services/marios.service';
import { Router } from '@angular/router';

import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-marios-form',
  templateUrl: './add-marios-form.component.html',
  styleUrls: ['./add-marios-form.component.scss'],
})
export class AddMariosFormComponent implements OnInit {
  @Input() public maxTitleLength = 128;
  @Input() public maxMessageLength = 255;

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private mariosService: MariosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      receiversId: [''],
      reaction: '',
      title: this.createFormControlWithValidation('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(this.maxTitleLength),
      ]),
      message: this.createFormControlWithValidation('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(this.maxMessageLength),
      ]),
    });
  }

  private createFormControlWithValidation(initialValue: any, validators: any) {
    return this.formBuilder.control(initialValue, validators);
  }

  onSubmit() {
    this.extractEmployeeIds();
    if (this.form.valid) {
      this.addMarios();
    } else {
      this.markFormControlsAsTouched();
    }
  }

  private extractEmployeeIds() {
    this.form.value.receiversId = this.form.value.receiversId.map(
      (employee: Employee) => employee.id
    );
  }

  private addMarios() {
    this.mariosService.addMarios(this.form.value).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error while adding Marios:', error);
      }
    );
  }

  private markFormControlsAsTouched() {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsTouched();
    });
  }
}
