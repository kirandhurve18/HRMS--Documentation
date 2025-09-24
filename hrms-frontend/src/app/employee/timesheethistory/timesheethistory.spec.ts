import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Timesheethistory } from './timesheethistory';

describe('Timesheethistory', () => {
  let component: Timesheethistory;
  let fixture: ComponentFixture<Timesheethistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timesheethistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Timesheethistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
