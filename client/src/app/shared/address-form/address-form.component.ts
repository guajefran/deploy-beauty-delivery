import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, FormsModule } from '@angular/forms'
import { AddressesService } from '../../services/addresses.service'
import { SessionService } from '../../session.service'
import {} from '@types/googlemaps';
import { MapsAPILoader, AgmCoreModule } from 'angular2-google-maps/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup
  search:any;
  completeInfo: any;
  public adress: any;
  public city: any;
  public country: any;
  feedback: string;
  error: any;
  searchQuery: any;
  searchControl: FormControl;
  public latitude: number = 40.392516;
  public longitude: number = -3.697963;
  public zoom: number = 14;
  public query = '';
  public elementRef;
  locationUser: any;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  loggedUser;

  constructor(
    private fb: FormBuilder,
    private as: AddressesService,
    private session: SessionService,
    myElement: ElementRef,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this._createForm();
    this.elementRef = myElement;
  }

  ngOnInit() {
    this.session.isLoggedIn().subscribe()
    this.session.getLoginEmitter().subscribe(user => {
      this.loggedUser = user
    })
    this.searchControl = new FormControl();
    //load Places Autocomplete
    const instance = this;
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.setNewPosition({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
          //set new position
          this.getLocationData(place);
          instance.addLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          });
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 14;
        });
      });
    });
  }

  addLocation(location) {
    this.locationUser = location;
  }

  getLocationData(location) {
    this.completeInfo = location;
  }

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 14;
    });
  }
}

private setNewPosition(position) {
    this.latitude = position.lat;
    this.longitude = position.lon;
    this.zoom = 14;
}

  _createForm(){
    this.addressForm = this.fb.group({
      raw: ''
    })
  }

  onSubmit(value: any):void{
    value.user = this.session.loggedUser._id
    value.lat = this.latitude;
    value.lng = this.longitude;
    value.raw = this.completeInfo.formatted_address;
    this.as.createAddress(value).subscribe()
    console.log(value)
  }
}
