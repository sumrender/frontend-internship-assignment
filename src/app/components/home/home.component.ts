import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Doc, SearchResponse } from 'src/app/core/models/book-response.model';
import { TrendingSubject } from 'src/app/core/models/misc';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  bookSearch: FormControl;
  isLoading = false;
  errorMessage = '';
  searchResults: Doc[] = [];
  currentPage = 1;
  totalPages = 1;

  constructor(private bookService: BooksService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<TrendingSubject> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  searchBook(): void {
    this.errorMessage = '';
    this.isLoading = true;
    if (!this.bookSearch.value) {
      this.errorMessage = 'Search field is empty.';
      this.isLoading = false;
      return;
    }
    this.bookService
      .getSearchResults(this.bookSearch.value, this.currentPage)
      .subscribe(
        (searchResponse: SearchResponse) => {
          this.searchResults = searchResponse?.docs;
          if (searchResponse.numFound === 0) {
            this.errorMessage = `No results found for '${this.bookSearch.value}'`;
          }
          this.totalPages = Math.floor(searchResponse.numFound / 10) + 1;
          this.isLoading = false;
        },
        (err) => {
          if (err.status === 404) {
            this.errorMessage = 'Resource not found';
          } else {
            this.errorMessage =
              'Request could not be completed! Please try again later.';
          }
          this.isLoading = false;
          console.log(err);
        }
      );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.searchBook();
  }

  clearSearch(): void {
    this.bookSearch.setValue('');
  }
}
