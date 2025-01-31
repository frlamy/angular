import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class MoviesKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = 'api_key=3177a77ee4212df1a956dd222659115c&language=fr-FR';
    // Il faut gérer si on a déjà des paramètres ou non //
    const request = req.clone({
      url: req.url + (req.url.includes('?') ? `&${params}` : `?${params}`)
    });

    return next.handle(request);
  }
}
