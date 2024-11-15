import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api/'; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) { }

  // Obtiene las opciones del header con el token de autorización
  private getHttpOptions() {
    const token = localStorage.getItem('auth_token');  // Obtenemos el token almacenado en localStorage
    let headers = new HttpHeaders({
      'Content-Type': 'application/json;charset=utf8',
      'Accept': 'application/json',
    });

    // Si el token existe, lo agregamos a los headers
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return { headers: headers, withCredentials: true };
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

  // Método para obtener los datos del usuario (con autenticación)
  public getUserData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}user`, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle)
      );
  }

  // Método para cerrar sesión
  public logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}logout`, {}, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle)
      );
  }

  public getPostsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}posts/${categoryId}`, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle)
      );
  }
  
  // Método para crear un post
  public createPost(title: string, content: string, categoryId: number): Observable<any> {
    const postData = { title, content, category: categoryId };
  
    return this.http.post<any>(`${this.apiUrl}posts`, postData, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle)
      );
  }

  public getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}categories`, this.getHttpOptions())
      .pipe(
        catchError(this.errorHandle)
      );
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}posts`);
  }

  // Método para buscar posts
  searchPosts(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}posts/search?search=${searchTerm}`);
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
