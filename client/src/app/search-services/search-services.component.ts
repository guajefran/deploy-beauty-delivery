import { Component, OnInit } from '@angular/core'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { ServicesToDetailsService } from '../services/services-to-details.service'
import * as _ from 'lodash'

@Component({
  selector: 'app-search-services',
  templateUrl: './search-services.component.html',
  styleUrls: ['./search-services.component.css']
})
export class SearchServicesComponent implements OnInit {

  constructor(private s2d: ServicesToDetailsService ) { }

  ngOnInit() {}

}
