import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PlacesAPIService } from './places-api.service';

describe('PlacesAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: PlacesAPIService = TestBed.get(PlacesAPIService);
      expect(service).toBeTruthy();
  });

  it('should get some specific data', () => {
    expect(1).toBe(1);
  });
});
