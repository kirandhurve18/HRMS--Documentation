import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSubmission } from './team-submission';

describe('TeamSubmission', () => {
  let component: TeamSubmission;
  let fixture: ComponentFixture<TeamSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
