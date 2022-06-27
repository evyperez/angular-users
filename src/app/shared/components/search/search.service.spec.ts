import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('SearchService', () => {
  let service: SearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return success if getResult return ok', () => {
    const mockResponse = {
      total_count: 10,
      incomplete_results: false,
      items: [
        {
          login: 'login',
          id: 321,
          node_id: 'node_id',
          avatar_url: 'avatar_url',
          gravatar_id: 'gravatar_id',
          url: 'url',
          html_url: 'html_url',
          followers_url: 'followers_url',
          following_url: 'following_url',
          gists_url: 'gists_url',
          starred_url: 'starred_url',
          subscriptions_url: 'subscriptions_url',
          organizations_url: 'organizations_url',
          repos_url: 'repos_url',
          events_url: 'events_url',
          received_events_url: 'received_events_url',
          type: 'type',
          site_admin: false,
          score: 6,
        },
      ],
    };

    service.getResult('userSearch', 10, 1).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(response.total_count).toBeDefined();
      expect(response.total_count).toBe(mockResponse.total_count);
      expect(response.items).toBeDefined();
      expect(response.items.length).toBeGreaterThan(0);
      response.items.map((item) => {
        expect(item.login).toBeDefined();
        expect(item.avatar_url).toBeDefined();
        expect(item.type).toBeDefined();
      });
    });

    const req = httpTestingController.expectOne((request) => request.params.has('q'));
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should return error  if getResult fail', () => {
    const mockErrorMessage = 'field `q` must be a string';
    service.getResult('userSearch', 10, 1).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (err: HttpErrorResponse) => {
        expect(err.status).withContext('status').toEqual(400);
        expect(err.error).withContext('message').toEqual(mockErrorMessage);
      },
    });

    const req = httpTestingController.expectOne((request) => request.params.has('q'));
    expect(req.request.method).toEqual('GET');
    req.flush(mockErrorMessage, { status: 400, statusText: 'bad request' });
  });
});
