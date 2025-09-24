import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAttendanceReport } from './individual-attendance-report';

describe('IndividualAttendanceReport', () => {
  let component: IndividualAttendanceReport;
  let fixture: ComponentFixture<IndividualAttendanceReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualAttendanceReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualAttendanceReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
