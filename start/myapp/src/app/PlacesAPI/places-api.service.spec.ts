import { TestBed } from '@angular/core/testing';

import { PlacesAPIService } from './places-api.service';

describe('PlacesAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlacesAPIService = TestBed.get(PlacesAPIService);
    expect(service).toBeTruthy();
  });
});
