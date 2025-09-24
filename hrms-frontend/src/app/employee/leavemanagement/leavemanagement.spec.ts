import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leavemanagement } from './leavemanagement';

describe('Leavemanagement', () => {
  let component: Leavemanagement;
  let fixture: ComponentFixture<Leavemanagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leavemanagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leavemanagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
