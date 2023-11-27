import { TestBed } from '@angular/core/testing';

import { RecipesHttpService } from './recipes-http.service';

describe('RecipesService', () => {
  let service: RecipesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
