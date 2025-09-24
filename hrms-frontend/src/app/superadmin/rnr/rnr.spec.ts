import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rnr } from './rnr';

describe('Rnr', () => {
  let component: Rnr;
  let fixture: ComponentFixture<Rnr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rnr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rnr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
