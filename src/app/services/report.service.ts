import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = `${environment.api_url}/Report`;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }


  relatorioVenda(id: string): Observable<Blob> {
    return this.http.get(`${baseUrl}/relatorio-venda/${id}`, { responseType: 'blob' });
  }
}
