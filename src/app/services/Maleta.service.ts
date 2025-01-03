import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maleta } from '../models/entityModels/maleta/Maleta';
const baseUrl = `${environment.api_url}/Maleta`;

@Injectable({
  providedIn: 'root'
})
export class MaletaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Maleta[]> {
    return this.http.get<Maleta[]>(`${baseUrl}`);
  }

  detail(id: string): Observable<Maleta> {
    return this.http.get<Maleta>(`${baseUrl}/${id}`);
  }

  create(data: Maleta): Observable<Maleta> {
    return this.http.post<Maleta>(`${baseUrl}`, data);
  }

  update(id: string, data: Maleta): Observable<Maleta> {
    return this.http.put<Maleta>(`${baseUrl}/${id}`, data);
  }

  deletar(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/${id}`);
  }
}
