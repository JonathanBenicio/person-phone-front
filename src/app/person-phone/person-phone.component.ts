import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone } from '../models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-phone',
  templateUrl: './person-phone.component.html',
  styleUrls: ['./person-phone.component.css']
})
export class PersonPhoneComponent implements OnInit {
  phones: Phone[] = [];
  idPerson: number;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: PersonService) { }

  delete(index: number) {
    this.service.deletePhone(this.phones[index].id).subscribe(data => {
      location.reload();
    });
  }
  altera(index: number) {
    const phone = this.phones[index];
    localStorage.setItem('id', phone.id.toString());
    localStorage.setItem('phoneNumber', phone.phoneNumber);
    localStorage.setItem('phoneNumberTypeID', phone.phoneNumberTypeID.toString());
    this.router.navigate([`person-phone/${phone.businessEntityID}/form/${phone.id}`], { queryParams: { phoneNumber: phone.phoneNumber, phoneNumberTypeID: phone.phoneNumberTypeID } });

  }

  inserir() {
    this.router.navigate([`person-phone/${this.idPerson}/form`]);
  }

  back(){
    this.router.navigateByUrl(`/`)
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.idPerson = data["idPerson"];
      this.service.getPhones(data["idPerson"]).subscribe(x => {
        this.phones = x.data
      });
    })

  }

}
