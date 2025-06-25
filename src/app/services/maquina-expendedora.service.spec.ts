import { TestBed } from '@angular/core/testing';

import { MaquinaExpendedoraService } from './maquina-expendedora.service';

describe('MaquinaExpendedoraService', () => {
  let service: MaquinaExpendedoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaquinaExpendedoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
