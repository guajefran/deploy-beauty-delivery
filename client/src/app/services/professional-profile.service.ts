import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { environment }  from '../../environments/environment';

const BASEURL:string= environment.BASE_URL+"/profiles/";


@Injectable()
export class ProfessionalProfileService {
  options:any = {withCredentials:true}

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message)
  }

  getProfileFromProfessional(user_id){
    return this.http.get(`${BASEURL}/${user_id}`)
      .map( res => res.json())
      .catch(this.handleError)
  }

}
