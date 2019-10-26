import { TestBed } from '@angular/core/testing';

import { HttpInterceptorJwtAuthService } from './http-interceptor-jwt-auth.service';

describe('HttpInterceptorJwtAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorJwtAuthService = TestBed.get(HttpInterceptorJwtAuthService);
    expect(service).toBeTruthy();
  });
});
