import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Movie } from './models/Movies';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000/api/movies/';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token b82066b3256c4ee9a4a5ad5028e6f1d52ba907f7'
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  getMovies() {
    return this.httpClient.get<Movie[]>(this.baseUrl, {headers: this.headers});
  }
  getMovie(id: number) {
    return this.httpClient.get<Movie>(`${this.baseUrl}${id}/`, {headers: this.headers});
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({title, description});
    return this.httpClient.post<Movie>(`${this.baseUrl}`, body, {headers: this.headers});
  }

  rateMovies(rate: number, movieId: number) {
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseUrl}${movieId}/rate_movie/`, body, {headers: this.headers});
  }
}
