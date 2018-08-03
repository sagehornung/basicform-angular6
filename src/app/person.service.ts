import { Injectable } from '@angular/core';
import { Person } from './person';
import { Http, Response } from '@angular/http';

@Injectable()
export class PersonService {
  private personUrl = '/api/person';

  constructor (private http: Http) {}

  getPerson(): Promise<void | Person[]> {
    return this.http.get(this.personUrl)
      .toPromise()
      .then(response => response.json() as Person[])
      .catch(this.handleError);
  }


  createPerson(newPerson: Person): Promise<void | Person> {
    return this.http.post(this.personUrl, newPerson)
      .toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
