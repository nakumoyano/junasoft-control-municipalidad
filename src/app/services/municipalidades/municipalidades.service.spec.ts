import { TestBed } from '@angular/core/testing';

import { MunicipalidadesService } from './municipalidades.service';

describe('MunicipalidadesService', () => {
  let service: MunicipalidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
