import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Festival } from './festival';

describe('Festival', () => {
  let component: Festival;
  let fixture: ComponentFixture<Festival>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Festival]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Festival);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
