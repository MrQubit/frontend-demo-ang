import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../api.service';
import { Movie } from '../../models/Movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;
  @Output() updateMovie = new EventEmitter<Movie>();
  faStar = faStar;
  rateHovered = 0;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }
  rateHover(rate){
    this.rateHovered = rate;
  }
  rateCliked(rate: number){
    this.apiService.rateMovies(rate, this.movie.id).subscribe(
      result => this.getDetails(),
      error => console.log(error)
    );
  }

  getDetails(){
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
      },
      error => console.log(error)
    );
  }

}
