import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarMunicipalidadComponent } from './cargar-municipalidad.component';

describe('CargarMunicipalidadComponent', () => {
  let component: CargarMunicipalidadComponent;
  let fixture: ComponentFixture<CargarMunicipalidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarMunicipalidadComponent]
    });
    fixture = TestBed.createComponent(CargarMunicipalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
