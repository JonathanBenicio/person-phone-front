import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../models/person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  person: Person[];

  consultar(index: number) {
    const idPerson = this.person[index].businessEntityID;
    this.router.navigateByUrl(`person-phone/${idPerson}`);
  }


  constructor(private router: Router, private service: PersonService) { }

  ngOnInit() {
    this.service.getPerson().subscribe(x => {
      this.person = x.data;

    });

  }

}
