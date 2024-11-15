// src/app/blog/blog.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: any[] = [];  // Lista de posts
  title: string = '';  // Título del post
  content: string = '';  // Contenido del post
  category: number = 0;  // ID de la categoría
  searchTerm: string = ''; 

  categories = [
    { id: 1, name: 'Tecnología' },
    { id: 2, name: 'Cultura' },
    { id: 3, name: 'Deportes' },
    { id: 4, name: 'Salud' },
    { id: 5, name: 'Negocios' }
  ];


  constructor(private apiService: ApiService, private router: Router) {}

  
  ngOnInit(): void {
    this.getPosts(); // Cargar posts al inicio
  }

  // Método para obtener todos los posts
  getPosts(): void {
    this.apiService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
      },
      (error) => {
        console.error('Error al obtener los posts', error);
      }
    );
  }

  onSearch(): void {
    this.apiService.searchPosts(this.searchTerm).subscribe(
      (posts) => {
        this.posts = posts; // Actualiza los posts mostrados
      },
      (error) => {
        console.error('Error al buscar posts', error);
      }
    );
  }

  // Función para enviar el formulario de creación de post
  onSubmit(): void {
    if (this.title && this.content && this.category) {
      // Llamamos al servicio para crear el post
      this.apiService.createPost(this.title, this.content, this.category).subscribe(
        (response) => {
          // Si el post es creado exitosamente, mostramos el mensaje y recargamos los posts
          Swal.fire({
            icon: 'success',
            title: 'Post creado',
            text: 'Tu post ha sido creado exitosamente.',
            showConfirmButton: true
          }).then(() => {
            this.title = '';
            this.content = '';
            this.category = 0;
          });
        },
        (error) => {
          console.error('Error al crear el post', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al crear el post. Intenta nuevamente.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
    }
  }

  logout() {
    this.apiService.logout().subscribe(
      (response) => {
        console.log(response.message); +

        // Eliminar el token del localStorage
        localStorage.removeItem('auth_token');

        // Redirigir al usuario a la página de login
        this.router.navigate(['/login']); 
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}
