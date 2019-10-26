import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { JWTAuthServicesService } from 'src/app/_services/jwtauth-services.service';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorJwtAuthService {
  constructor(
    private jwtAuthenticationService : JWTAuthServicesService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    // let username = 'in28minutes'
    // let password = 'dummy'
    //let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    let basicAuthHeaderString = this.jwtAuthenticationService.getAuthenticatedToken();
    let username = this.jwtAuthenticationService.getAuthenticatedUser()

    if(basicAuthHeaderString && username) { 
      request = request.clone({
        setHeaders : {
            Authorization : basicAuthHeaderString
          }
        }) 
    }
    return next.handle(request);
  }
}
