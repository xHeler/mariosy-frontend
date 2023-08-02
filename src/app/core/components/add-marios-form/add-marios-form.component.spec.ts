import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMariosFormComponent } from './add-marios-form.component';

describe('AddMariosFormComponent', () => {
  let component: AddMariosFormComponent;
  let fixture: ComponentFixture<AddMariosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMariosFormComponent]
    });
    fixture = TestBed.createComponent(AddMariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
