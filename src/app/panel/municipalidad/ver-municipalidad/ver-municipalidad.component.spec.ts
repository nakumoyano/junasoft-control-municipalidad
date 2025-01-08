import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMunicipalidadComponent } from './ver-municipalidad.component';

describe('VerMunicipalidadComponent', () => {
  let component: VerMunicipalidadComponent;
  let fixture: ComponentFixture<VerMunicipalidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerMunicipalidadComponent]
    });
    fixture = TestBed.createComponent(VerMunicipalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
