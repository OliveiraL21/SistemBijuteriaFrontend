import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

const baseUrl = `${environment.api_url}/api/Login`

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}`, data);
  }
}
