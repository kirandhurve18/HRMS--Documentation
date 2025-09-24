import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Festivalleave } from './festivalleave';

describe('Festivalleave', () => {
  let component: Festivalleave;
  let fixture: ComponentFixture<Festivalleave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Festivalleave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Festivalleave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
