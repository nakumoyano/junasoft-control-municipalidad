import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarSecretariaComponent } from './agregar-editar-secretaria.component';

describe('AgregarEditarSecretariaComponent', () => {
  let component: AgregarEditarSecretariaComponent;
  let fixture: ComponentFixture<AgregarEditarSecretariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarSecretariaComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
