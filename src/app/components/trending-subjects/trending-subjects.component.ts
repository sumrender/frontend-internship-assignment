import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BooksService } from '../../core/services/books.service';
import { Book, BookResponse } from 'src/app/core/models/book-response.model';
import { TrendingSubject } from 'src/app/core/models/misc';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {
  isLoading = true;
  subjectName = '';
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;
  allBooks: Book[] = [];

  trendingSubjects: Array<TrendingSubject> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.getAllBooks();
    });
  }

  getAllBooks() {
    this.errorMessage = '';
    this.isLoading = true;
    this.booksService
      .getAllBooks(this.subjectName, this.currentPage)
      .subscribe(
        (bookResponse: BookResponse) => {
        this.allBooks = bookResponse.works;
        this.totalPages =
          bookResponse.work_count % 10
            ? Math.trunc(bookResponse.work_count / 10) + 1
            : bookResponse.work_count / 10;
        this.isLoading = false;
      },
      (err) => {
        if (err.status === 404) {
          this.errorMessage = 'Resource not found';
        }
        this.errorMessage =
          'Request could not be completed! Please try again later.';
        this.isLoading = false;
        console.log(err);
      }
      );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.getAllBooks();
  }
}
