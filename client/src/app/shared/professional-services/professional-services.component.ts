import { Component, OnInit } from '@angular/core'
import { ServiceDetailsService } from '../../services/service-details.service'
import { SessionService } from '../../session.service'

@Component({
  selector: 'app-professional-services',
  templateUrl: './professional-services.component.html',
  styleUrls: ['./professional-services.component.css']
})
export class ProfessionalServicesComponent implements OnInit {
  loggedUser:any
  servicesWithDetails: Array<any> = []

  constructor(
    private session: SessionService,
    private sds: ServiceDetailsService
  ) {}

  ngOnInit() {
    this.session.loginEvent.subscribe( user => {
      this.loggedUser = user
      this.sds.getDetailsFromProfessional(user._id).subscribe( swd => {
        this.servicesWithDetails = swd
        console.log(this.servicesWithDetails)
      })
    })
  }
}
