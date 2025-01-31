import {Component} from '@angular/core';
import {Genres, Movies} from './types';
import {MoviesService} from './services/movies.service';
import {combineLatest, distinctUntilChanged, filter, fromEvent, map, Subscription, switchMap} from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-movies',
  template: `
    <h3>Movie DB</h3>
    <div>
      <span class="badge bg-primary mx-1 my-2" *ngFor="let genre of genres">{{ genre.name }}</span>
    </div>
    <div class="row movies">
      <div class="col-4 movie" *ngFor="let movie of movies; let i = index">
        <div class="card mb-3">
          <img src="{{movie.image}}" alt="" class="card-img-top">
          <div class="card-body">
            <p class="card-title"><strong>{{ movie.title }}</strong></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MoviesComponent {
  movies: Movies = [];
  genres: Genres = [];

  page: number = 1;
  scrollSubscription?: Subscription;
  initSubscription?: Subscription;

  constructor(private service: MoviesService) {
  }

  ngOnInit() {
    // fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', this.options)
    //   .then(res => res.json())
    //   .then((movies: any) => {
    //     this.movies = movies.results
    //   })
    //   .then(res => console.log(this.movies))
    //   .catch(err => console.error(err))
    // ;

    // this.service.getPopularMovies().subscribe((movies: Movies) => (this.movies = movies));
    // this.service.getGenres().subscribe((genres: Genres) => (this.genres = genres));
    // Avec rx JS : Observables.

    this.initSubscription = combineLatest([
      this.service.getPopularMovies(),
      this.service.getGenres()
    ]).subscribe(([movies, genres]) => {
      this.movies = movies;
      this.genres = genres;
    });

    // Créer un scroll infini avec du rx JS et les observables :
    const scroll$ = fromEvent(window, 'scroll');

    this.scrollSubscription = scroll$.pipe(
      map((scrollEvent) => {
        return this.isBottomOfThePage();
      }),
      distinctUntilChanged(),
      filter(isBottom => isBottom === true),

      // tap(() => this.page++),
      // map(() => this.service.getPopularMovies(this.page)),
      switchMap(() => this.service.getPopularMovies(++this.page)),

      // le subscribe ne sera appelé que si isBottom est à true.
      // Le filtre permet donc de déclencher le subscribe selon la valeur renvoyée par le filter
    ).subscribe((movies) => {
      // On ajoute au tableau des movies, un nouveau tableau de movies avec de nouveaux params
      this.movies = [...this.movies, ...movies];
    });

    // Créer un scroll infini avec du JS native :
    // let bottom = false;
    // window.addEventListener('scroll', () => {
    //   const isBottom = document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 100;
    //   if (!isBottom) {
    //     bottom = false;
    //     return;
    //   }
    //
    //   if (bottom) {
    //     return;
    //   }
    //
    //   if (isBottom) {
    //     bottom = true;
    //     // Incrément de la page
    //     this.page++;
    //     // On ajoute au tableau des movies, un nouveau tableau de movies avec de nouveaux params
    //     this.service.getPopularMovies(this.page).subscribe(movies => {
    //       this.movies = [...this.movies, ...movies];
    //     });
    //
    //     console.log(this.page);
    //   }
    // });
  }

  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
    this.initSubscription?.unsubscribe();
  }

  isBottomOfThePage() {
    return document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 100;
  }
}
