/**Definimos la ruta a proteger*/
const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { userProfile: UserProfileResolver }
  }
];
/**
En este ejemplo, cuando se navega a la ruta /profile, Angular espera a que el resolver UserProfileResolver 
se complete antes de cargar el componente ProfileComponent. Una vez que el resolver se completa, los datos 
devueltos por el resolver se pasan al componente ProfileComponent a través del objeto data.
*/

/**Implementación de un Resolver:
Para implementar un resolver en Angular, necesitas crear una clase que implemente la interfaz Resolve<T>. 
Esta interfaz define un método llamado resolve() que devuelve un observable de los datos que deseas cargar.*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<User> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const userId = route.params.userId;
    return this.userService.getUserProfile(userId);
  }
}
/**En este ejemplo, UserProfileResolver es un resolver que carga el perfil de un usuario utilizando un servicio 
llamado UserService. El método resolve() obtiene el userId de los parámetros de la ruta y utiliza el servicio para 
cargar los datos del usuario.*/

/**Definiendo el Servicio-------------------------*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUserProfile(userId: number, userData: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, userData);
  }

  deleteUserProfile(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}

/**En este servicio, estamos utilizando Angular's HttpClient para realizar operaciones HTTP. 
El servicio proporciona métodos para obtener, actualizar y eliminar perfiles de usuario.

getUserProfile(userId: number): Método para obtener el perfil de un usuario dado su ID.
updateUserProfile(userId: number, userData: User): Método para actualizar el perfil de un 
usuario dado su ID y los nuevos datos del usuario.
deleteUserProfile(userId: number): Método para eliminar el perfil de un usuario dado su ID.
Este servicio se puede utilizar en el UserProfileResolver para cargar los datos del usuario 
antes de que se cargue la vista del perfil de usuario. Es importante tener en cuenta que este 
es solo un ejemplo básico y que en una aplicación real, el servicio puede tener más funcionalidades 
y características según las necesidades del proyecto.
*/
