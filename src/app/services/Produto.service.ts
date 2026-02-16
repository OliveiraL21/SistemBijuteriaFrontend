import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Produto from '../models/entityModels/produtos/produto';
import CreateProduto from '../models/entityModels/produtos/CreateProduto';

const baseUrl = `${environment.api_url}/Produto`;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${baseUrl}`);
  }

  details(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${baseUrl}/${id}`);
  }

  getByCodigo(codigo: string): Observable<Produto> {
    return this.http.get<Produto>(`${baseUrl}/GetByCodigo/${codigo}`);
  }

  getByNome(produto: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${baseUrl}/SearchByName/${produto}`);
  }

  create(produto: CreateProduto): Observable<Produto> {
    return this.http.post<Produto>(`${baseUrl}`, produto);
  }

  update(id: string, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${baseUrl}/${id}`, produto);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/${id}`);
  }
}
