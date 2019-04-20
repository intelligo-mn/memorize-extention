import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';

describe('WordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordService = TestBed.get(WordService);
    expect(service).toBeTruthy();
  });
});
