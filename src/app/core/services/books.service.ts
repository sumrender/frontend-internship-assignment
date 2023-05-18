import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  BookResponse,
  SearchResponse,
} from 'src/app/core/models/book-response.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly EXPIRY_DURATION = 10; // Expiration duration in minutes

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService
  ) {}

  getAllBooks(subjectName: string, page: number = 1): Observable<BookResponse> {
    const limit = 10;
    const offset = limit * (page - 1);
    const cacheKey = `books_${subjectName}_${page}`;
    const cachedResponse = this.cacheService.get<BookResponse>(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    const apiResponse = this.apiService.get<BookResponse>(
      `/subjects/${subjectName
        .toLowerCase()
        .split(' ')
        .join('_')}.json?limit=${limit}&&offset=${offset}`
    );

    this.cacheService.set(cacheKey, apiResponse, this.EXPIRY_DURATION);
    return apiResponse;
  }

  getSearchResults(
    query: string,
    page: number = 1
  ): Observable<SearchResponse> {
    const limit = 10;
    const cacheKey = `search_${query}_${page}`;
    const cachedResponse = this.cacheService.get<SearchResponse>(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    const apiResponse = this.apiService.get<SearchResponse>(
      `/search.json?q=${query
        .toLowerCase()
        .split(' ')
        .join('+')}&limit=${limit}&page=${page}`
    );

    this.cacheService.set(cacheKey, apiResponse, this.EXPIRY_DURATION);
    return apiResponse;
  }
}
