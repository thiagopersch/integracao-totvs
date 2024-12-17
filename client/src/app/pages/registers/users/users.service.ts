import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'app/model/Users';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private api = `${environment.apiUrl}/users`;

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.api);
  }

  getUser(id: string): Observable<Users> {
    return this.http.get<Users>(`${this.api}/${id}`);
  }

  createUser(data: Users): Observable<Users> {
    return this.http.post<Users>(`${this.api}`, data);
  }

  updateUser(id: string, data: Partial<Users>): Observable<Users> {
    return this.http.put<Users>(`${this.api}/${id}`, data);
  }

  updatedStatusUser(id: string, status: boolean): Observable<Users> {
    const statusData = { status };
    return this.http.put<Users>(`${this.api}/${id}`, statusData);
  }

  deleteUser(user: Users): Observable<Users> {
    return this.http.delete<Users>(`${this.api}/${user.id}`);
  }
}
