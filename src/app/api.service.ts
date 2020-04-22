import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Movie } from './models/Movies';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  token = this.cookieService.get('mr-token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, {headers: this.getAutHeaders()});
  }
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseMovieUrl}${id}/`, {headers: this.getAutHeaders()});
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post<Movie>(`${this.baseMovieUrl}`, body, {headers: this.getAutHeaders()});
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.put<Movie>(`${this.baseMovieUrl}${id}/`, body, {headers: this.getAutHeaders()});
  }
  deleteMovie(id: number) {
    return this.httpClient.delete<Movie>(`${this.baseMovieUrl}${id}/`, {headers: this.getAutHeaders()});
  }

  rateMovies(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`, body, {headers: this.getAutHeaders()});
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});
  }

  registerUser(authData) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  getAutHeaders(){
    const token = this.cookieService.get('mr-token');
    console.log('mr token in get', token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: `Token ${token}`
    });
  }
}
