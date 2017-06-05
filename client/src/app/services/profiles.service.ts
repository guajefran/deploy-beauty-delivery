import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'

const BASEURL = "http://localhost:3000/profiles/"

@Injectable()
export class ProfilesService {
  options:any = {withCredentials:true}

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message)
  }

  createProfile(profile): Observable<Response>{
    return this.http.post(BASEURL+"/create", profile, this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
