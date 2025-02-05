import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from 'app/types/Users';
import { environment } from 'environments/environments';
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

  getUserById(id: string): Observable<Users> {
    return this.http.get<Users>(`${this.api}/${id}`);
  }

  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.api, user);
  }

  updateUser(userId: string, userData: Partial<Users>): Observable<Users> {
    return this.http.patch<Users>(`${this.api}/${userId}`, userData);
  }

  updatedStatus(id: string, status: boolean): Observable<Users> {
    const statusData = { status };
    return this.http.put<Users>(`${this.api}/${id}`, statusData);
  }

  deleteUser(users: Users): Observable<Users> {
    return this.http.delete<Users>(`${this.api}/${users.id}`);
  }
}
