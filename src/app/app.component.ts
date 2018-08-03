import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { Http, Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  messgae: string;
  model: Person;
  phErrorMsg: string;
  phErr: boolean;
  persons: Person[]
  //model: any = {};
  constructor() { }
  ngOnInit(): void {
    this.model  = new Person('','','','','');
    this.persons = [];
    // this.personService
    //   .getPerson()
    //   .then((persons: Person[]) => {
    //     this.persons = persons.map((person) => {
    //       return person;
    //     });
    //   });

    //this.phErr = false;
  }
  onSubmit(): void {
    console.log(this.model);
    //this.messgae = this.myValidate() ? 'Success' : 'Unable to submit form please fix errors';
    this.persons.push(this.model);

  }
  //myValidate(): boolean {
    //const phDigits = this.model.ph.replace(/\D/g,'' );
    // if(phDigits.length !== 10) {
    //   this.phErrorMsg = 'Invalid phone number';
    //   this.phErr = true;
    //   return false;
    // }
    // return true;
  //}

}
