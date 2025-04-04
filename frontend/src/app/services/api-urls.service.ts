import { Injectable } from '@angular/core';
import {authBodyInterface} from '../interfaces/authBodyInterface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileInfo, ProfileInfoResponse} from '../interfaces/profileInfoResponse';
import {SettedUserInfoResponse} from '../interfaces/settedUserInfoResponse';

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
    },
    setUserData: (body: string): Observable<SettedUserInfoResponse> => {
      return this._httpClient.put<SettedUserInfoResponse>(`${this.BASE_URL}user-info/set-data`, body);
    }
  }

  createProject(projectData: any): Observable<any> {
    return this._httpClient.post(`${this.BASE_URL}api/projects/create`, projectData);
  }

}
