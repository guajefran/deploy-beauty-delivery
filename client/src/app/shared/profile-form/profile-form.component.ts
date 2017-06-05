import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'
import { ProfilesService } from '../../services/profiles.service'
import { SessionService } from '../../session.service'

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  profileForm: FormGroup

  loggedUser
  constructor(
    private fb: FormBuilder,
    private ps: ProfilesService,
    private session: SessionService
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
    this.profileForm = this.fb.group({
      company: '',
      description: ''
    })
  }

  onSubmit(value: any):void{
    value.professional = this.session.loggedUser._id
    this.ps.createProfile(value).subscribe()
  }
}
