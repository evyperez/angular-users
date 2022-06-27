import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/app/models/result.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiEndpoint;
  }

  getResult(query: string, perPage: number, page: number) {
    let params = new HttpParams();
    params = params.append('per_page', perPage);
    params = params.append('page', page);
    params = params.append('q', `${query} in:login`);

    return this.http.get<Result>(`${this.baseUrl}/search/users`, { params });
  }
}
