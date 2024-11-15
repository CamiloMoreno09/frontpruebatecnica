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

  // Método para enviar el formulario de login
  onSubmit(): void {
    if (this.email && this.password) {
      // Llama al servicio ApiService para hacer el login
      this.apiService.login(this.email, this.password).subscribe(
        (response) => {
          
          this.router.navigate(['/blog']);  // Redirige a la página de Blog
        },
        (error) => {
          // En caso de error, muestra el mensaje de error
          console.error('Error en el login:', error);
          this.errorMessages.push('Las credenciales no coinciden con nuestros registros.');
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
