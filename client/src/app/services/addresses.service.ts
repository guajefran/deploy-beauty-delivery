import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { environment }  from '../../environments/environment';

const BASEURL:string= environment.BASE_URL+"/addresses/";

@Injectable()
export class AddressesService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message)
  }

  createAddress(address): Observable<Response>{
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    return this.http.post(BASEURL+"/create", address, options)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
