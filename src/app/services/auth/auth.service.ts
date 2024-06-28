import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

import { TokenService } from './token.service';
import { ResponseLogin } from 'src/app/interfaces/auth.interface';
import { setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(username: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/auth/login`, { 
      username, 
      password
    })
    .pipe(
      tap(response => {
          this.tokenService.saveToken(response.token);
      })
    )
    ;
  }
}
