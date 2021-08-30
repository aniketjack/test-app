import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlGuard implements CanActivate, CanActivateChild {
  constructor(private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let url: any = route.data.url || route.params.url || route.params.state;
        // navigate to constructed URL
        const windowTarget: string = route.data.target || '_blank';
        window.open(url, windowTarget);

        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot): boolean {
        let url = window.history.state;
        return this.canActivate(route);
    }
  
}
