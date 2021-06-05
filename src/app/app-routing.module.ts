import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { PersonPhoneComponent } from './person-phone/person-phone.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'person-phone/:idPerson', component: PersonPhoneComponent },
  { path: 'person-phone/:idPerson/form', component: FormComponent },
  { path: 'person-phone/:idPerson/form/:idPhone', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
