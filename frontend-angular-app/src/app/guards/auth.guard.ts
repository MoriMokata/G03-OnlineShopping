import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (role === 'Admin') {
      this.router.navigateByUrl('/admin');
      return false;
    }

    // if (role === 'Admin') {
    //   this.router.navigateByUrl('/add-product');
    //   localStorage.clear();
    //   return false;
    // }

    // if (role === 'Member') {
    //   this.router.navigateByUrl('/first');
    //   return false;
    // }
  
    return true;
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    const role = this.authService.getRole();

    if (token && role && role === 'Member') {    
      return true;
    }
  
    localStorage.clear();
    this.router.navigateByUrl('/login');
    return false;
  }
  
}
