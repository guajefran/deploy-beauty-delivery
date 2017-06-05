import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { environment }  from '../../environments/environment';

const BASEURL:string= environment.BASE_URL+"/service-details/";


@Injectable()
export class ServiceDetailsService {
  options:any = {withCredentials:true}

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message)
  }

  createServiceDetails(details){
    return this.http.post(BASEURL, details,this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }

  getDetailsFromProfessional(user_id){
    return this.http.get(`${BASEURL}/${user_id}`,this.options)
      .map( res => res.json())
      .catch(this.handleError)
  }

  getAllDetails(){
    return this.http.get(BASEURL,this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
