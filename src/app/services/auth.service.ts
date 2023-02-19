import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  createUser(nombre: string, correo: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(correo, password);
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
   return  this.auth.signOut();
  }
}
