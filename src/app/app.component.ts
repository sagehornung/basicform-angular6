import { Component, OnInit } from '@angular/core';
import { Person } from './person';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  messgae: string;
  model: Person;
  phErrorMsg: string;
  phErr: boolean;
  persons: Person[]

  constructor(private http: Http) { }
  ngOnInit(): void {
    this.model = new Person('', '', '', '', '');
    this.persons = [];
  }
  onSubmit(): void {
    console.log('Pre post', this.model);
    this.http.post('/api/person', this.model);
    //this.persons.push(new Person(this.model.firstName, this.model.lastName, this.model.address, this.model.email, this.model.phone));
    //this.model  = new Person('','','','','');
  }

}
