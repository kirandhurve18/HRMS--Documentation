import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Employeeinfo } from './employeeinfo';

describe('Employeeinfo', () => {
  let component: Employeeinfo;
  let fixture: ComponentFixture<Employeeinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Employeeinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Employeeinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
