import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AuthUtils} from './auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private _authenticated: boolean = false;

  constructor() {}

  set accessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  get accessToken() {
    return localStorage.getItem('accessToken') ?? '';
  }

  // @ts-ignore
  check(): Observable<boolean>
  {
    // Check the access token availability
    if ( !this.accessToken )
    {
      return of(false);
    }

    // Check the access token expire date
    if ( AuthUtils.isTokenExpired(this.accessToken) )
    {
      return of(false);
    }else this._authenticated = true

    // Check if the user is logged in
    if ( this._authenticated )
    {
      return of(true);
    }



  }

}

