import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateinfo } from './updateinfo';

describe('Updateinfo', () => {
  let component: Updateinfo;
  let fixture: ComponentFixture<Updateinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
