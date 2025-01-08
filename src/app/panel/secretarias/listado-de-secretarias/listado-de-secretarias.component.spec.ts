import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeSecretariasComponent } from './listado-de-secretarias.component';

describe('ListadoDeSecretariasComponent', () => {
  let component: ListadoDeSecretariasComponent;
  let fixture: ComponentFixture<ListadoDeSecretariasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoDeSecretariasComponent]
    });
    fixture = TestBed.createComponent(ListadoDeSecretariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
