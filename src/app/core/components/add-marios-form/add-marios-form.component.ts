import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-marios-form',
  templateUrl: './add-marios-form.component.html',
  styleUrls: ['./add-marios-form.component.scss'],
})
export class AddMariosFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  staticChips: string[] = ['Chip 1', 'Chip 2', 'Chip 3'];

  constructor(private formBuilder: FormBuilder) {}

  employees: Employee[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@example.com',
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
    },
    {
      id: '5',
      firstName: 'Daniel',
      lastName: 'Williams',
      email: 'daniel.williams@example.com',
    },
  ];

  selected = [];

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      userSearch: [''],
      title: ['', Validators.required],
      comment: [''],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
