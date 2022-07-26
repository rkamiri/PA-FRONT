import { TestBed } from '@angular/core/testing';

import { CodeEditorService } from '../shared/services/code-editor.service';

describe('CodeEditorService', () => {
  let service: CodeEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
