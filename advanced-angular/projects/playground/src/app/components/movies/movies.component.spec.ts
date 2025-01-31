import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MoviesComponent} from './movies.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MoviesService} from './services/movies.service';
import {of} from 'rxjs';
import {createComponentFactory, Spectator} from '@ngneat/spectator';
import {ApiGenresResponse} from './types';

const MOCK_MOVIES = [
  {id: 1, title: 'Movie 1', description: '', rating: 10, image: ''},
  {id: 1, title: 'Movie 2', description: '', rating: 10, image: ''}
];

const MOCK_API_GENRES: ApiGenresResponse = {
  genres: [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Aventure'}
  ]
}

describe('MoviesComponent (TestBed)', () => {
  let fixture: ComponentFixture<MoviesComponent>;
  let component: MoviesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    }).compileComponents();

    const service = TestBed.inject(MoviesService);

    const popularSpy = spyOn(service, "getPopularMovies");
    popularSpy.and.returnValue(of(MOCK_MOVIES));

    const genreSpy = spyOn(service, "getGenres");
    genreSpy.and.returnValue(of([]));

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not load more movies if we are not at the bottom of the page', async () => {
    // On surcharge la fonction pour s'assurer de passer dans le subscribe et on déclenche l'event de scroll
    component.isBottomOfThePage = () => false;

    window.dispatchEvent(new Event('scroll'));

    expect(component.movies.length).toBe(2);
  });

  it('should load more movies if we are at the bottom of the page', async () => {
    component.isBottomOfThePage = () => true;

    window.dispatchEvent(new Event('scroll'));

    expect(component.movies.length).toBe(4);
  });

  it('should show movie list', async () => {
    // const httpController = TestBed.inject(HttpTestingController);
    // const request = httpController.expectOne('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
    // request.flush({
    //   results: [
    //     {title: "Movie 1"},
    //     {title: "Movie 2"}
    //   ]
    // });
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });
});

describe('MovieComponent (Spectator)', () => {
  let spectator: Spectator<MoviesComponent>;
  const createComponent = createComponentFactory({
    component: MoviesComponent,
    imports: [HttpClientTestingModule],
    // Le fait de déclarer MoviesService ici permet de mocker ses méthodes
    // Elles sont toutes DEJA des espions, on n'a pas créer nous même ces espions
    mocks: [MoviesService],
  });

  beforeEach(() => {
      spectator = createComponent({
        // On précise ici qu'on ne veut pas lancer la détection de changement
        // dès la création du composant, sinon le ngOnInit serait appelé
        // et on ne pourrait pas mocker les méthodes de MoviesService
        detectChanges: false,
      })
    
      spectator
        .inject(MoviesService)
        .getPopularMovies.and.returnValue(of(MOCK_MOVIES));

      spectator
        .inject(MoviesService)
        .getGenres.and.returnValue(of([]));

      spectator.detectChanges();
    }
  );

  it('should not load more movies if we are not at the bottom of the page', async () => {
    spectator.component.isBottomOfThePage = () => false;

    window.dispatchEvent(new Event('scroll'));

    expect(spectator.component.movies.length).toBe(2);
  });

  it('should load more movies if we are at the bottom of the page', async () => {
    spectator.component.isBottomOfThePage = () => true;

    window.dispatchEvent(new Event('scroll'));

    expect(spectator.component.movies.length).toBe(4);
  });

  it('should show movie list', () => {
    expect(spectator.queryAll('.movie').length).toBe(2);
  });
});
