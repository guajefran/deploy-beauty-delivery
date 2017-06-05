import { Component, OnInit } from '@angular/core'
import { SessionService } from "../session.service"
import { RouterModule, Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  user: any
   formInfo = {
     username: '',
     password: '',
     email: '',
     role: ''
   }
   error: string
   privateData: any = ''

  constructor(private session: SessionService, private router:Router) { }

   ngOnInit() {
    //  this.session.isLoggedIn()
    //    .subscribe(
    //      (user) => this.successCb(user)
    //    )
   }


   signup() {

     this.session.signup(this.formInfo)
       .subscribe(
         (user) => {this.successCb(user);
          if(this.formInfo.role==="professional"){
            this.router.navigate(['panel-prof']);
          } else if(this.formInfo.role === "user"){
            this.router.navigate(['list-services'])
          }
         },
         (err) => this.errorCb(err)
       )
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
   }
}
