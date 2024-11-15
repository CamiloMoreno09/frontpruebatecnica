// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { ApiService } from '../api.service'; 
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  errorMessages: string[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

onSubmit(): void {
  if (this.email && this.password) {
    Swal.fire({
      title: 'Cargando...',
      text: 'Estamos procesando tu solicitud...',
      icon: 'info',
      allowOutsideClick: false, 
      showConfirmButton: false, 
      willOpen: () => {
        Swal.showLoading();  
      }
    });

    // Llama al servicio ApiService para hacer el login
    this.apiService.login(this.email, this.password).subscribe(
      (response) => {
        // Guarda el token de acceso en localStorage
        if (response.token) {
          localStorage.setItem('auth_token', response.token); // Guarda el token de autenticación
        }

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Has iniciado sesión correctamente.',
          showConfirmButton: false,  
          timer: 3000,  
          timerProgressBar: true,  
        }).then(() => {
          this.router.navigate(['/blog']);  // Redirige a la página de Blog
        });
      },
      (error) => {
        // En caso de error, muestra el mensaje de error
        console.error('Error en el login:', error);
        this.errorMessages.push('Las credenciales no coinciden con nuestros registros.');

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Las credenciales no coinciden con nuestros registros.',
          showConfirmButton: true, 
        });
      }
    );
  } else {
    this.errorMessages.push('Por favor, complete todos los campos.');
  }
}


  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
