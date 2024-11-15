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
        // Mostrar el "Cargando..." mientras esperamos la respuesta del backend
        Swal.fire({
            icon: 'info',
            title: 'Cargando...',
            text: 'Estamos registrando tu cuenta.',
            showConfirmButton: false,
            allowOutsideClick: false,  // Evita que el usuario cierre el modal
            didOpen: () => {
                Swal.showLoading();  // Muestra el spinner de carga
            }
        });

        // Llama al servicio ApiService para hacer el registro
        this.apiService.register(this.name, this.email, this.password).subscribe(
            (response) => {
                // Cerrar el Swal de "Cargando..." cuando el registro es exitoso
                Swal.close();  // Cierra la alerta de carga

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
                // Si hay un error, cerramos el "Cargando..." y mostramos el mensaje de error
                Swal.close();  // Cierra la alerta de carga

                console.error('Error al registrar:', error);
                this.errorMessages.push('Hubo un error al registrar el usuario. Inténtalo nuevamente.');

                // Mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al registrar tu cuenta. Intenta nuevamente.',
                    showConfirmButton: true
                });
            }
        );
    } else {
        this.errorMessages.push('Por favor, complete todos los campos.');
    }
}

}
