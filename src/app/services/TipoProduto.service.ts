import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TipoProduto from '../models/entityModels/tipoProduto/tipoProduto';

const baseUrl = `${environment.api_url}/TipoProduto`

@Injectable({
  providedIn: 'root'
})
export class TipoProdutoService {

  constructor(private http: HttpClient) { }

  list(): Observable<TipoProduto[]> {
    return this.http.get<TipoProduto[]>(`${baseUrl}`);
  }
}
