import { Component, OnInit } from '@angular/core'
import { SessionService } from "../session.service"
import { RouterModule, Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: any
   formInfo = {
     username: '',
     password: ''

   }
   error: string
   privateData: any = ''

  constructor(private session: SessionService, private router: Router) { }

   ngOnInit() {
    //  this.session.isLoggedIn()
    //    .subscribe(
    //      (user) => this.successCb(user)
    //    );
   }

   login() {
     console.log(this.formInfo)
     this.session.login(this.formInfo)
       .subscribe(
         (user) => this.successCb(user),
         (err) => this.errorCb(err)
       )
   }


   logout() {
     this.session.logout()
       .subscribe(
         () => this.successCb(null),
         (err) => this.errorCb(err)
       )
   }

   logged() {
     this.session.isLoggedIn().subscribe(res => console.log(res));
   }

   getPrivateData() {
     this.session.getPrivateData()
       .subscribe(
         (data) => this.privateData = data,
         (err) => this.error = err
       )
   }

   errorCb(err) {
     this.error = err
     this.user = null
   }

   successCb(user) {
     this.user = user
     this.error = null
     console.log(user)
     if(user.role ==='professional'){
       this.router.navigate(['panel-prof']);
     } else if(user.role === "user"){
       this.router.navigate(['search-services'])
     }
   };
}
