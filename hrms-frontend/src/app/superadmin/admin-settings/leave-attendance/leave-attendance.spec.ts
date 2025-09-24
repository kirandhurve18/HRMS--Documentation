import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAttendance } from './leave-attendance';

describe('LeaveAttendance', () => {
  let component: LeaveAttendance;
  let fixture: ComponentFixture<LeaveAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveAttendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
