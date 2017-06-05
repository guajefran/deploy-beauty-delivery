import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { environment }  from '../../environments/environment';

const BASEURL:string= environment.BASE_URL+"/services/";


@Injectable()
export class ServicesService {
  options:any = {withCredentials:true}

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message)
  }

  getServices(): Observable<Response> {
    return this.http.get(`${BASEURL}`,this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
