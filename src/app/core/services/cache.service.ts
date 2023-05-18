import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [key: string]: CacheItem<any> } = {};

  get<T>(key: string): Observable<T> | null {
    const cacheItem = this.cache[key];

    if (cacheItem && !this.isExpired(cacheItem)) {
      console.log('item found in cache');
      return cacheItem.observable as Observable<T>;
    }

    this.remove(key);
    return null;
  }

  set<T>(
    key: string,
    observable: Observable<T>,
    expiryMinutes: number
  ): Observable<T> {
    const expirationTime = new Date().getTime() + expiryMinutes * 60 * 1000;
    const cacheItem: CacheItem<T> = { observable, expirationTime };
    this.cache[key] = cacheItem;

    return cacheItem.observable;
  }

  remove(key: string): void {
    delete this.cache[key];
  }

  private isExpired(cacheItem: CacheItem<any>): boolean {
    return new Date().getTime() >= cacheItem.expirationTime;
  }
}

interface CacheItem<T> {
  observable: Observable<T>;
  expirationTime: number;
}
