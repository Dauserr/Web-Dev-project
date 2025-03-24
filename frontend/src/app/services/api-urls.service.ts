import { Injectable } from '@angular/core';
import {authBodyInterface} from '../interfaces/authBodyInterface';
import {HttpClient} from '@angular/common/http';

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


  constructor(private _httpClient: HttpClient) { }

  authApi = {
    authorizationApi: (body:authBodyInterface) => {
        return this._httpClient.post(`${this.BASE_URL}auth/`,body,this.basicHeader)
    }
  }

}
