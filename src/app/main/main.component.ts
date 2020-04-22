import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Movie } from '../models/Movies';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  movies: Movie[] = [];
  selectedMovie = null;
  editedMovie = null;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService,
    ) { }

  ngOnInit(): void {
    const mrToken = this.cookieService.get('mr-token');
    console.log('we have cookies', mrToken);
    if (!mrToken){
      this.router.navigate(['/auth']);
    }else{
      this.apiService.getMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
        },
        error => console.log(error)
      );
    }
  }
  logout(){
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth']);
  }

  selectMovie(movie: Movie){
    this.selectedMovie = movie;
    console.log('selectedMovie is ', this.selectedMovie);
    this.editedMovie = null;
  }
  editMovie(movie: Movie){
    this.editedMovie = movie;
    console.log('editing movie', movie.title);
    this.selectedMovie = null;
  }
  createNewMovie(){
    this.editedMovie = {title: '', description: ''};
    this.selectedMovie = null;
  }

  deletedMovie(movie: Movie){
  console.log('delete movie', movie.title);
  this.apiService.deleteMovie(movie.id).subscribe(
    data => {
      this.movies = this.movies.filter(mov => mov.id !== movie.id);
      this.editedMovie = null;
      this.selectedMovie = null;
    },
    error => console.log(error)
  );
  }
  movieCreated(movie: Movie){
    this.movies.push(movie);
    this.editedMovie = null;
  }
  movieUpdated(movie: Movie){
    const indx = this.movies.findIndex(mov => mov.id === movie.id);
    if (indx >= 0) {
      this.movies[indx] = movie;
    }
    this.editedMovie = null;
  }
}
