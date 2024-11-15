import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/'; 

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf8',
        'Accept': 'application/json',
      }),
      withCredentials: true 
    };
  }

  // Método para enviar la solicitud de login
  public login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    return this.http.post<any>(`${this.apiUrl}login`, loginData, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle) 
      );
  }

  // Método para registrar un nuevo usuario
  public register(name: string, email: string, password: string): Observable<any> {
    const registerData = { name, email, password };

    return this.http.post<any>(`${this.apiUrl}register`, registerData, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle)
      );
  }


  // Manejo de errores globales para las solicitudes
  private errorHandle(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        showConfirmButton: true
      });
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        showConfirmButton: true
      });
    }
    return throwError(errorMessage);
  }
}
