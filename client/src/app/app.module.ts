import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule, Routes } from "@angular/router"
// Common components
import { AppComponent } from './app.component'
import { MyHomeComponent } from './my-home/my-home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { PanelProfComponent } from './panel-prof/panel-prof.component'
import { SearchServicesComponent } from './search-services/search-services.component'
import { ViewProfesionalComponent } from './view-profesional/view-profesional.component'
import { PageReserveComponent } from './page-reserve/page-reserve.component'

// Shared components
import { ListServicesComponent } from './shared/list-services/list-services.component'
import { ServiceDetailsFormComponent } from './shared/service-details-form/service-details-form.component'
import { ProfileFormComponent } from './shared/profile-form/profile-form.component'
import { AddressFormComponent } from './shared/address-form/address-form.component'

// Services
import { SessionService } from "./session.service"
import { ServicesService } from './services/services.service'
import { ServiceDetailsService } from './services/service-details.service'
import { AddressesService } from './services/addresses.service'
import { ProfilesService } from './services/profiles.service'
import { ServicesToDetailsService } from './services/services-to-details.service'
import { ProfessionalProfileService  } from './services/professional-profile.service'
// External components
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ProfessionalServicesComponent } from './shared/professional-services/professional-services.component';
import { UserResultsComponent } from './shared/user-results/user-results.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: MyHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'panel-prof', component: PanelProfComponent },
  { path: 'search-services', component: SearchServicesComponent },
  { path: 'list-services', component: ListServicesComponent },
  { path: 'view-profesional', component: ViewProfesionalComponent },
  { path: 'page-reserve', component: PageReserveComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PanelProfComponent,
    SearchServicesComponent,
    ListServicesComponent,
    ViewProfesionalComponent,
    PageReserveComponent,
    MyHomeComponent,
    ServiceDetailsFormComponent,
    ProfileFormComponent,
    AddressFormComponent,
    ProfessionalServicesComponent,
    UserResultsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({apiKey: "AIzaSyDH6LyXrfjtl1PX7GfhVIQjTZT4fyPz4Rw",libraries: ["places"]})
  ],
  providers: [
    SessionService,
    ServicesService,
    ServiceDetailsService,
    AddressesService,
    ProfilesService,
    ServicesToDetailsService,
    ProfessionalProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
