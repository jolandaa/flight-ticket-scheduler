import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    const currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    //check if we have logged user
    if(currentUser){
      //check if the route is restricted by role
      if(next.data['roles'] && next.data['roles'].indexOf(currentUser?.role) === -1){
        this.router.navigate(["/auth/login"])
        return false;
      }else{
        return true;
      }
    } else {
      this.router.navigate(["/auth/login"])
      return false;
    }
  }

}
