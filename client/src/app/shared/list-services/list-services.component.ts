import { Component, OnInit } from '@angular/core'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { ServicesService } from '../../services/services.service'
import { ServicesToDetailsService } from '../../services/services-to-details.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {
  categories
  services
  activatedCategory
  isClassVisible: Boolean = false;
  constructor(private ss: ServicesService, private s2d: ServicesToDetailsService ) { }

  ngOnInit() {
    this.ss.getServices().subscribe(servicesArray => {
      this.services = servicesArray
      this._getCategories(this.services)
    })
  }

  _getCategories(services){
    this.categories = _.uniqBy(services, 'category')
  }

  showServices(category){
    this.isClassVisible = true;
    this.activatedCategory = category
  }

  setService(serviceId){
    this.s2d.setActiveService(serviceId)
  }

}
