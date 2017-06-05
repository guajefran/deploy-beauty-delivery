import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { environment }  from '../../environments/environment';

const BASEURL:string= environment.BASE_URL+"/profiles/";

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
