import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Halfday } from './halfday';

describe('Halfday', () => {
  let component: Halfday;
  let fixture: ComponentFixture<Halfday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Halfday]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Halfday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
