import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Venda } from '../models/entityModels/Venda/Venda';

const baseUrl = `${environment.api_url}/Venda`

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private http: HttpClient) { }

  post(venda: Venda): Observable<Venda> {
    return this.http.post<Venda>(`${baseUrl}`, venda);
  }

  put(id: string, venda: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${baseUrl}/${id}`, venda);
  }

  detail(id: string): Observable<Venda> {
    return this.http.get<Venda>(`${baseUrl}/${id}`);
  }

  listAll(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${baseUrl}`);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/${id}`);
  }

  marcarAtraso(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/marcarAtraso${id}`, data);
  }

  FinalizarVenda(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/finalizarVenda/${id}`, data);
  }

  getNumberOfSellsByBriefcase(id: string): Observable<number> {
    return this.http.get<number>(`${baseUrl}/get-number-of-sells/${id}`);
  }

  getByMonth(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/get-by-month`);
  }

  getVendasEmAtraso(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${baseUrl}/vendas-em-atraso`);
  }

}
