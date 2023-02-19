import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) {}

  initAuthListener() {
    this.auth.authState.subscribe((firebaseUser) => {
      console.log(firebaseUser);
      console.log(firebaseUser?.email);
      console.log(firebaseUser?.uid);
    });
  }

  createUser(name: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new User(
          user?.uid,
          name,
          user?.email
        );
        this.firestore.doc(`${user?.uid}/user`)
        .set({...newUser});
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map((firebaseUser) => firebaseUser !== null)
    );
  }
}
