import { TestBed } from '@angular/core/testing';

import { DepDiagramService } from './dep-diagram.service';

describe('DepDiagramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepDiagramService = TestBed.get(DepDiagramService);
    expect(service).toBeTruthy();
  });
});
