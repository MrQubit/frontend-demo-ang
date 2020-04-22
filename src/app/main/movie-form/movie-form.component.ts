import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/Movies';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';



@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movieForm;
  id = null;
  @Output() movieCreated = new EventEmitter<Movie>();
  @Output() movieUpdated = new EventEmitter<Movie>();

  @Input()  set movie(val: Movie){
    this.id = val.id;
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description)
    });
  }

  constructor(
    private apiService: ApiService) { }

  ngOnInit() {
  }
  formDisabled(){
    if (this.movieForm.value.title !== '' && this.movieForm.value.description !== ''){
      console.log('lenght of title', this.movieForm.value.title.lenght);
      console.log('lenght of description', this.movieForm.value.description.lenght);
      console.log('In disabled form false');
      return false;

    }
    else{
      console.log('lenght of title', this.movieForm.value.title.lenght);
      console.log('lenght of description', this.movieForm.value.description.lenght);
      console.log('scope', this.movieForm.value);
      console.log('scope1', this.movieForm.value.title);
      console.log('In disabled form true');
      return true;
    }

  }
  saveForm(){
    console.log(this.movieForm.value);
    if(this.id){
      this.apiService.updateMovie(
        this.id, this.movieForm.value.title, this.movieForm.value.description).subscribe(
        (result: Movie) => this.movieUpdated.emit(result),
        error => console.log(error)
        );
    }else{
      this.apiService.createMovie(
        this.movieForm.value.title, this.movieForm.value.description).subscribe(
        (result: Movie) => this.movieCreated.emit(result),
        error => console.log(error)
      );
    }
  }
}
