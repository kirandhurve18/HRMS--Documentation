import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RNR } from './rnr';

describe('RNR', () => {
  let component: RNR;
  let fixture: ComponentFixture<RNR>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RNR]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RNR);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
