import {HttpClient} from '@angular/common/http';
import {ApiGenresResponse, ApiPopularResponse} from '../types';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';

@Injectable()
export class MoviesService {
  options: { method: string, headers: { accept: string, Authorization: string } } = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTc3YTc3ZWU0MjEyZGYxYTk1NmRkMjIyNjU5MTE1YyIsIm5iZiI6MTU3Mjk1OTg5NC4zMzMsInN1YiI6IjVkYzE3Njk2OWQ4OTM5MDAxMzMyNGMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UMrN1RabQpsv0xN5lHNRel27TKFxE9MAAzalLEkIRSk'
    }
  };

  constructor(private httpClient: HttpClient) {
  }

  getGenres() {
    return this.httpClient.get<ApiGenresResponse>('https://api.themoviedb.org/3/genre/movie/list', this.options).pipe(
      map((apiResponse) => apiResponse.genres));
  }

  getPopularMovies(page: number = 1) {

    // Js Native :
    // fetch('https://api.themoviedb.org/3/movie/popular?language=en-US', this.options)
    //   .then(res => res.json())
    //   .then((movies: any) => {
    //     this.movies = movies.results
    //   })
    //   .then(res => console.log(this.movies))
    //   .catch(err => console.error(err))
    // ;
    return this.httpClient.get<ApiPopularResponse>('https://api.themoviedb.org/3/movie/popular?page=' + page).pipe(
      map((response) => {
        return response.results.map(item => {
          return {
            id: item.id,
            description: item.overview,
            title: item.title,
            image: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
            rating: item.vote_average
          }
        })
      })
    );
  }
}
