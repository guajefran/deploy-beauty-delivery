import { Injectable , EventEmitter} from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment }  from '../environments/environment';

const BASEURL:string= environment.BASE_URL;

@Injectable()
export class SessionService {
  loginEvent = new EventEmitter<any>();
  loggedUser:any;


  options = {withCredentials:true};
  constructor(private http: Http) { }

  getLoginEmitter(): EventEmitter<any>{
    return this.loginEvent;
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${BASEURL}/signup`, user,this.options)
    .map(res => res.json())
      .map(user => {
      this.loggedUser = user;
      this.loginEvent.emit(user);
      return user;
       })
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${BASEURL}/login`, user,this.options)
    .map(res => res.json())
    .map(user =>{
      this.loggedUser = user;
      this.loginEvent.emit(user);
      return user;
    })
    .catch(this.handleError);
  }

  logout() {
    return this.http.post(`${BASEURL}/logout`,{},this.options)
      .map(res => {
        this.loggedUser = null;
        this.loginEvent.emit(null);
        return res.json();
      })
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASEURL}/loggedin`,this.options)
      .map(res => res.json())
      .map(user => {this.loggedUser = user; this.loginEvent.emit(user); return this.loggedUser})
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(`${BASEURL}/private`,this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
