import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacao } from '../models/entityModels/notificacao/notificacao';
const baseUrl = `${environment.api_url}/api/Notificacao`;


@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(private http: HttpClient) { }

  pendentes(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${baseUrl}/pendentes`);
  }

  marcarComoLida(id: string): Observable<Notificacao> {
    return this.http.put<Notificacao>(`${baseUrl}/ler/${id}`, {});
  }
}
