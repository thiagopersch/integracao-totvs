import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clients } from 'app/types/Clients';
import { environment } from 'environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private api = `${environment.apiUrl}/clients`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.api);
  }

  findById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(client: Clients): Observable<Clients> {
    return this.http.post<Clients>(this.api, client);
  }

  update(id: string, clientData: Partial<Clients>): Observable<Clients> {
    return this.http.put<Clients>(`${this.api}/${id}`, clientData);
  }

  delete(client: Clients): Observable<Clients> {
    return this.http.delete<Clients>(`${this.api}/${client.id}`);
  }

  updateStatus(id: string, status: boolean): Observable<Clients> {
    const statusData = { status };
    return this.http.put<Clients>(`${this.api}/${id}`, statusData);
  }
}
