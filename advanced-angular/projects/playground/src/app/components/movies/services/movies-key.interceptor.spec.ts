import {TestBed} from '@angular/core/testing';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {MoviesKeyInterceptor} from './movies-key.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {createHttpFactory, SpectatorHttp} from '@ngneat/spectator';

describe('MovieKeyInterceptor (TestBed)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Nous travaillons avec le faux HttpClient
      providers: [
        // Nous précisons bien à Angular que nous voulons utiliser notre intercepteur
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MoviesKeyInterceptor,
          multi: true,
        },
      ],
    });
  });

  it('should get url with the key and language params', (done: DoneFn) => {
    // Pour que cette requête soit envoyée il faut subscribe();
    TestBed.inject(HttpClient).get('https://mock.url')
      .subscribe(() => {
        expect(true).toBe(true);
        done();
      });

    TestBed.inject(HttpTestingController)
      .expectOne('https://mock.url?api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')
      .flush({});
  });

  it('should use & as separator', (done: DoneFn) => {
    // Pour que cette requête soit envoyée il faut subscribe();
    TestBed.inject(HttpClient).get('https://mock.url?page=1&toto=tata')
      .subscribe(() => {
        expect(true).toBe(true);
        done();
      });

    TestBed.inject(HttpTestingController)
      .expectOne('https://mock.url?page=1&toto=tata&api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')
      .flush({});
  });
});

describe('MovieKeyInterceptor (Spectator)', () => {
  let spectator: SpectatorHttp<MoviesKeyInterceptor>;
  const createSpectator = createHttpFactory({
    service: MoviesKeyInterceptor,
    providers: [
      // Nous précisons bien à Angular que nous voulons utiliser notre intercepteur
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MoviesKeyInterceptor,
        multi: true,
      },
    ],
  });

  it('should get url with the key and language params', () => {
    spectator = createSpectator();

    spectator.httpClient
      .get('https://mock.url')
      .subscribe(() => {
        expect(true).toBe(true);
      });

    spectator.controller
      .expectOne('https://mock.url?api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')
      .flush({});
  });

  it('should use & as separator', () => {
    spectator = createSpectator();

    spectator.httpClient
      .get('https://mock.url?page=1&toto=tata')
      .subscribe(() => {
        expect(true).toBe(true);
      });

    spectator.controller
      .expectOne('https://mock.url?page=1&toto=tata&api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR')
      .flush({});
  });
});
