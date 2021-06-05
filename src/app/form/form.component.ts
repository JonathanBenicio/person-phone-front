import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Phone, TypePhone } from '../models/person';
import { PersonService } from '../person.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  phone: Phone = new Phone;
  typePhone: TypePhone[];

  formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private service: PersonService, private form: FormBuilder) {
    this.createForm();
  }
   createForm() {
    this.formGroup = this.form.group({
        id: [''],
        businessEntityID: [''],
        phoneNumber:['', [Validators.required, Validators.minLength(9)]],
        phoneNumberTypeID:['', Validators.required]
    });
  }

  submit() {
    if (this.formGroup.valid) {
      if (this.phone.id != null || this.phone.id != undefined) {

        this.service.alteraPhone(this.formGroup.getRawValue()).subscribe(x => {
          alert("Telefone Atualizado");
          this.router.navigateByUrl(`/person-phone/${this.phone.businessEntityID}`);
        });
      } else {
        this.service.addPhone(this.formGroup.getRawValue()).subscribe(data => {
          if (data.success) {
            alert("telefone Cadastrado");
          } else {
            data.errors.map(error => {
              console.error(error);
            });
          }
          this.router.navigateByUrl(`/person-phone/${this.phone.businessEntityID}`)
        });
      }
    }else{
      alert("Verifique se preencheu corretamente")
    }
  }

  back(){
    this.router.navigateByUrl(`/person-phone/${this.phone.businessEntityID}`)
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(data => {

      this.phone.businessEntityID = data["idPerson"];
      this.formGroup.get('businessEntityID').setValue(this.phone.businessEntityID);


      if (data["idPhone"] != null) {
        this.phone.id = data["idPhone"];
        this.formGroup.get('id').setValue(this.phone.id);

        this.activatedRoute.queryParams.subscribe(x => {
          this.phone.phoneNumber = x["phoneNumber"];
          this.phone.phoneNumberTypeID = x["phoneNumberTypeID"];
          this.formGroup.get('phoneNumber').setValue(this.phone.phoneNumber);
          this.formGroup.get('phoneNumberTypeID').setValue(this.phone.phoneNumberTypeID);
        });

      }

    })


    this.service.getTypePhone().subscribe(x => {
      if (x.success) {
        this.typePhone = x.data;
      } else {
        this.typePhone = [{
          phoneNumberTypeID: 0,
          name: "Nenhum"
        }]
      }
    });


  }

}
