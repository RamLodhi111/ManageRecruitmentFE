import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { USER_ROLE } from './_services/jwtauth-services.service';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  showHead: any;
  username: string;
  options = ["Approvals", "Logout"];
  optionSelected: any;
  role: String;
  isAdmin:boolean=false;
  constructor(
    private router: Router,
    public aroute: ActivatedRoute
  ) {
    router.events.forEach((event) => {
      console.log(event);
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/login?returnUrl=%2F' ||event['url'] == '/register' ) {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
          this.username = sessionStorage.getItem('authenticaterUser');
        }
      }
    });
  }

  ngOnInit() {
    this.getUserAccess();
  }
  onOptionSelected(event) {
    console.log(event); //option value will be sent as event
  }

  getUserAccess(): void{
    this.isAdmin=false;
    this.role = sessionStorage.getItem(USER_ROLE);
    if(this.role==='ROLE_ADMIN')
         this.isAdmin=true;  
    }
  }
