import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {AuthService} from '../auth.service';
import {Observable, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate,CanActivateChild{
    constructor(private _router: Router, private _authService: AuthService) {}

  authGuardNoNeedPaths = ['','about','help','blog','contact']

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return this._check();
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this._check();
  }


  /**
   * Check the authenticated status
   *
   * @private
   */
  private _check(): Observable<boolean>
  {
    // Check the authentication status
    return this._authService.check()
      .pipe(
        switchMap((authenticated) => {

          // If the user is authenticated...
          if ( authenticated )
          {
            // Redirect to the root
            this._router.navigate(['']);

            // Prevent the access
            return of(false);
          }

          // Allow the access
          return of(true);
        })
      );
  }

}
