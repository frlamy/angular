import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MoviesService} from './movies.service';
import {ApiGenresResponse, ApiMovie} from '../types';
import {createHttpFactory, SpectatorHttp} from '@ngneat/spectator';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {MoviesKeyInterceptor} from './movies-key.interceptor';

const MOCK_POPULAR_MOVIES: ApiMovie[] = [
  {title: 'Movie 1', overview: 'MOCK_OVERVIEW', vote_average: 10,} as ApiMovie,
  {title: 'Movie 2', overview: 'MOCK_OVERVIEW2', vote_average: 7,} as ApiMovie
]

const MOCK_API_GENRES: ApiGenresResponse = {
  genres: [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Aventure'}
  ]
}
describe('MovieService (TestBed)', () => {
  it('should get transformed genres', (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MoviesKeyInterceptor,
          multi: true
        }
      ],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new MoviesService(http);

    service.getGenres().subscribe(genres => {
      expect(genres.length).toBe(2);
      done();
    });

    const request = httpController.expectOne('https://api.themoviedb.org/3/genre/movie/list?api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')

    request.flush(MOCK_API_GENRES);
  });

  it('should get transformed popular movies', (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    // Notre service à besoin du Httpclient pour fonctionner (Injection de dépendance)
    const service = new MoviesService(http);

    service.getPopularMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('Movie 1');
      expect(movies[0].description).toBe('MOCK_OVERVIEW');
      expect(movies[0].rating).toBe(10);
      done();
    });

    const request = httpController.expectOne('https://api.themoviedb.org/3/movie/popular?page=1')

    request.flush({results: MOCK_POPULAR_MOVIES});
  });
});

describe('MovieService (Spectator)', () => {
  // let spectator: SpectatorService<MoviesService>;
  // const createService = createServiceFactory({
  //   service: MoviesService,
  //   imports: [HttpClientTestingModule]
  // });

  let spectator: SpectatorHttp<MoviesService>
  const createService = createHttpFactory({
    service: MoviesService,
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MoviesKeyInterceptor,
        multi: true
      }
    ],
  });

  it('should get transformed genres', (done: DoneFn) => {

    spectator = createService();

    spectator.service.getGenres().subscribe(genres => {
      expect(genres.length).toBe(2);
      expect(genres[0].name).toBe('Action');
      done();
    });
    const request = spectator.controller.expectOne('https://api.themoviedb.org/3/genre/movie/list?api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')

    request.flush(MOCK_API_GENRES);
  });

  it('should get transformed popular movies (spectator)', (done: DoneFn) => {
    spectator = createService();

    // Le SpectatorHttp n'a pas besoin d'injection des services http
    // const http = spectator.inject(HttpClient);
    // const httpController = spectator.inject(HttpTestingController);

    spectator.service.getPopularMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0].title).toBe('Movie 1');
      expect(movies[0].description).toBe('MOCK_OVERVIEW');
      expect(movies[0].rating).toBe(10);
      done();
    });

    // const request = httpController.expectOne('https://api.themoviedb.org/3/movie/popular?page=1')
    const request = spectator.controller.expectOne('https://api.themoviedb.org/3/movie/popular?page=1&api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')

    request.flush({results: MOCK_POPULAR_MOVIES});
  });
});
