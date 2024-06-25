import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

import { TokenService } from './token.service';
//import { StorageService } from '../storage.service';
import { ResponseLogin } from 'src/app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    //private storageService: StorageService
  ) {}

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/auth/login`, { 
      username, 
      password
    })
    .pipe(
      tap(response => {
          this.tokenService.saveToken(response.token);
          //this.storageService.set("token", response.token);
      })
    )
    ;
  }
}
