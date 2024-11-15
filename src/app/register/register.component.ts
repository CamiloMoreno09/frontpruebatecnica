// src/app/register/register.component.ts

import { Component } from '@angular/core';
import { ApiService } from '../api.service'; // Importa el ApiService
import { Router } from '@angular/router'; // Importa el Router para redirección
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessages: string[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  // Método para enviar el formulario de registro
  onSubmit(): void {
    if (this.name && this.email && this.password) {
      this.apiService.register(this.name, this.email, this.password).subscribe(
        (response) => {
          // Si el registro es exitoso, mostramos un mensaje y redirigimos al login
          Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso',
            text: 'Usuario creado exitosamente. Por favor inicie sesión.',
          }).then(() => {
            this.router.navigate(['/login']); // Redirigir al login
          });
        },
        (error) => {
          // Si hay un error, mostramos el mensaje correspondiente
          console.error('Error al registrar:', error);
          this.errorMessages.push('Hubo un error al registrar el usuario. Inténtalo nuevamente.');
        }
      );
    } else {
      this.errorMessages.push('Por favor, complete todos los campos.');
    }
  }
}
