import { TestBed } from '@angular/core/testing';

import { RecipesDataStorageService } from './recipes-data-storage.service';

describe('RecipesDataStorageService', () => {
  let service: RecipesDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
