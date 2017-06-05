import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ServicesToDetailsService {
  private activeService: String
  private subject = new Subject()
  constructor(){}

  setActiveService(activeService: String): void {
    this.activeService = activeService
    this.subject.next(this.activeService)
  }

  getActiveService(): String {
    return this.activeService
  }

  getActiveServiceObservable(): Observable<any>{
    return this.subject.asObservable()
  }
}
