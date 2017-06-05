import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Rx'
import { SessionService } from '../../session.service'
import { ServiceDetailsService } from '../../services/service-details.service'
import { ServicesToDetailsService } from '../../services/services-to-details.service'
import { ProfessionalProfileService  } from '../../services/professional-profile.service'

@Component({
  selector: 'app-service-details-form',
  templateUrl: './service-details-form.component.html',
  styleUrls: ['./service-details-form.component.css']
})
export class ServiceDetailsFormComponent implements OnInit {
  serviceDetailsForm: FormGroup
  loggedUser
  constructor(
    private fb: FormBuilder,
    private session: SessionService,
    private sds: ServiceDetailsService,
    private s2d: ServicesToDetailsService,
    private pps: ProfessionalProfileService
  ) {
    this._createForm()
  }

  ngOnInit() {
    this.session.isLoggedIn().subscribe()
    this.session.getLoginEmitter().subscribe(user => {
      this.loggedUser = user
    })
  }

  _createForm(){
    this.serviceDetailsForm = this.fb.group({
      price: '',
      time: '',
      description: ''
    })
  }

  onSubmit(value: any):void{
    value.service = this.s2d.getActiveService()
    value.professional = this.session.loggedUser._id
    this.pps.getProfileFromProfessional(this.session.loggedUser._id).subscribe(profile => {
      value.profile = profile._id
      this.sds.createServiceDetails(value).subscribe()
    })
  }
}
