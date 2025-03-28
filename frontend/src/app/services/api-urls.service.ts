import { Injectable } from '@angular/core';
import {authBodyInterface} from '../interfaces/authBodyInterface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileInfoResponse} from '../interfaces/profileInfoResponse';

@Injectable({
  providedIn: 'root'
})



export class ApiUrlsService {

  BASE_URL = 'http://127.0.0.1:8000/'
  basicHeader = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  tokenInHeader = {
    headers:{
      'Authorization': 'Bearer '+ localStorage.getItem('accessToken')
    }
  }



  constructor(private _httpClient: HttpClient) { }

  authApi = {
    authorizationApi: (body:authBodyInterface) => {
        return this._httpClient.post(`${this.BASE_URL}auth/`,body,this.basicHeader)
    }
  }

  profileApi = {
    getUserProfileInformation : () :Observable<ProfileInfoResponse> =>  {
      return this._httpClient.get<ProfileInfoResponse>(`${this.BASE_URL}user-info`,this.tokenInHeader)
    }
  }

}
