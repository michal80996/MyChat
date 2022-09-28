import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';
import { User } from '../models/User.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afs:AngularFirestore,
    private afAuth:AngularFireAuth
  ) { }

public signInWithGoogle(){
  this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
  
}

  private AuthLogin(provider:firebase.default.auth.AuthProvider){
    return this.afAuth.signInWithPopup(provider).then((res)=>{
    this.setUser(res.user as User)
    }); 
  }

  private setUser(user:User):Promise<void> | void{
    if(!user) return;
    const userRef:AngularFirestoreDocument<User>= this.afs.doc(
      `allUsers/${user.uid}`
    ) 
    const userData:User ={
      uid: user.uid,
      email:user.email,
      dispayName:user.dispayName,
      PhotoUrl:user.PhotoUrl
    }  
    
    return userRef.set(userData,
      {
        merge:true
      })
    
  }


}
