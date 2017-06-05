import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'
import { ListServicesComponent } from '../shared/list-services/list-services.component'

@Component({
  selector: 'app-panel-prof',
  templateUrl: './panel-prof.component.html',
  styleUrls: ['./panel-prof.component.css'],
})
export class PanelProfComponent implements OnInit {


  loggedUser: any;
  constructor(private session: SessionService) { }

  ngOnInit() {

  }

  updateImage(event){
     const file = event.target.files[0]
     const reader = new FileReader()
     const imgTag = event.target.parentNode.childNodes[1]

     console.log(imgTag)

     reader.onloadend = () => {
       imgTag.src = reader.result
     }

     reader.readAsDataURL(file)
  }

}
