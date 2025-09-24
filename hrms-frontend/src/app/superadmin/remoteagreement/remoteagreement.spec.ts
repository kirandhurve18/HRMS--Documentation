import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Remoteagreement } from './remoteagreement';

describe('Remoteagreement', () => {
  let component: Remoteagreement;
  let fixture: ComponentFixture<Remoteagreement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Remoteagreement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Remoteagreement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
