import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Teamhierarchy } from './teamhierarchy';

describe('Teamhierarchy', () => {
  let component: Teamhierarchy;
  let fixture: ComponentFixture<Teamhierarchy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Teamhierarchy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Teamhierarchy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
