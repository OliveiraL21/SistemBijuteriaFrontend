import { Cliente } from './../models/entityModels/cliente/Cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { CreateCliente } from '../models/entityModels/cliente/CreateCliente';

const baseUrl = `${environment.api_url}/Cliente`;

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  constructor(private http: HttpClient) {

  }

  create(cliente: CreateCliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${baseUrl}`, cliente);
  }

  update(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${baseUrl}/${id}`, cliente);
  }

  details(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${baseUrl}/${id}`);
  }

  listAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${baseUrl}`);
  }


}
