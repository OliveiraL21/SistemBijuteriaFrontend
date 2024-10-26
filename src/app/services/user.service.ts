import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Usuario from '../models/entityModels/usuario/Usuario';
import CreateUsuario from '../models/entityModels/usuario/CreateUsuario';

const baseUrl = `${environment.api_url}/User`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${baseUrl}`);
  }

  detail(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/${id}`)
  }

  create(usuario: CreateUsuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${baseUrl}`, usuario);
  }

  update(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${baseUrl}/${id}`, usuario);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/${id}`);
  }
}
