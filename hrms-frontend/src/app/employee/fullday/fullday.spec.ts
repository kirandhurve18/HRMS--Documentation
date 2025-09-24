import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fullday } from './fullday';

describe('Fullday', () => {
  let component: Fullday;
  let fixture: ComponentFixture<Fullday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fullday]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fullday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
