import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';

import { TokenService } from './token.service';
import { ResponseLogin } from 'src/app/interfaces/auth.interface';
import { StorageService } from '../storage.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(
    private tokenService: TokenService,
    private storageService: StorageService
  ) {}

  async login(username: string, password: string) {
    const data = (await axios.post(`${this.apiUrl}/auth/login`, {
      username,
      password
    })).data;
    this.tokenService.saveToken(data?.token);
    this.storageService.set("usuario", data?.usuario);
  }
}
