import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient) {
    
  }

  get(){
    return this.http.get('assets/dados.json')
  }

}
