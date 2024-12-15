import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/entityModels/status/Status';

const baseUrl = `${environment.api_url}/Status`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  listAll(): Observable<Status[]> {
    return this.http.get<Status[]>(`${baseUrl}`);
  }

  detail(id: string): Observable<Status> {
    return this.http.get<Status>(`${baseUrl}/${id}`);
  }

  create(status: Status): Observable<Status> {
    return this.http.post<Status>(`${baseUrl}`, status);
  }

  update(id: string, status: Status): Observable<Status> {
    return this.http.put<Status>(`${baseUrl}/${id}`, status);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${baseUrl}/${id}`);
  }
}
