import { Component, OnInit } from '@angular/core'
import { ServiceDetailsService } from '../../services/service-details.service'
import { ServicesToDetailsService } from '../../services/services-to-details.service'

@Component({
  selector: 'app-user-results',
  templateUrl: './user-results.component.html',
  styleUrls: ['./user-results.component.css']
})
export class UserResultsComponent implements OnInit {
  products: Array<any>
  activeService

  constructor(
    private sds: ServiceDetailsService,
    private s2d: ServicesToDetailsService
  ) { }

  ngOnInit() {
    this.sds.getAllDetails().subscribe( products => {
      this.products = products
    })
    this.s2d.getActiveServiceObservable().subscribe( service => {
      this.activeService = service
    })
  }
}
