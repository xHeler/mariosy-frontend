import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariosListComponent } from './marios-list.component';

describe('MariosListComponent', () => {
  let component: MariosListComponent;
  let fixture: ComponentFixture<MariosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MariosListComponent]
    });
    fixture = TestBed.createComponent(MariosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
