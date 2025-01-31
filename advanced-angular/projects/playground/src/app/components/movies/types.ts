export type Movie = {
  /** L'id unique du film */
  id: number;
  /** (string) Le titre du film */
  title: string;
  /** (string) La description du film */
  description: string;
  /** (string) L'url de l'image principale du film' */
  image: string;
  /** (number) La note du film */
  rating: number;
}

export type Movies = Movie[];

export type Genre = {
  id: number;
  name: string;
}

export type Genres = Genre[];

export type ApiGenresResponse = {
  genres: Genre[];
}

export type ApiPopularResponse = {
  /**
   * La page sur laquel on se trouve actuellement
   */
  page: number;

  /**
   * Un tableau de ApiMovie qui contient les attributs de Movie
   */
  results: ApiMovie[];

  /**
   * Le nombre total de pages
   */
  total_pages: number;

  /**
   * Le nombre total de films
   */
  total_results: number;
}

export type ApiMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
