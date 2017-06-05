import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from "./session.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Beauty Delivery';
  loggedUser:any;
  error:any;

constructor(private session: SessionService, private router: Router){ }

ngOnInit(){
  this.session.isLoggedIn().subscribe();
  this.session.getLoginEmitter().subscribe(user => {
    this.loggedUser=user;
    console.log(this.loggedUser)

  })
}

logout() {
  this.session.logout()
    .subscribe(
      () => this.successCb(null),
      (err) => this.errorCb(err)
    )
}

errorCb(err) {
  this.error = err
  this.loggedUser = null
}

successCb(user) {
  this.loggedUser = user
  this.error = null
  this.router.navigate(['/']);
};


}
