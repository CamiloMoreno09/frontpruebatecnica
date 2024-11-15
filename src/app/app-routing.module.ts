import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';  
import { RegisterComponent } from './register/register.component'; 


const routes: Routes = [
  { path: 'login', component: LoginComponent },   // Ruta para Login
  { path: 'blog', component: BlogComponent },     // Ruta para Blog
  { path: 'register', component: RegisterComponent }, //Ruta para Register
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige a Login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
