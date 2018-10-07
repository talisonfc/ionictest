import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AbstractTest } from './test.abstract';
import { DatabaseProvider } from '../../providers/database/database';
import { HomeTest } from '../home/home.test';
import { RestTest } from '../rest/rest.test';
import { HomePage } from '../home/home';
import { RestPage } from '../rest/rest';

@IonicPage()
@Component({
  selector: 'page-testes',
  templateUrl: 'testes.html',
})
export class TestesPage implements OnInit{

  tests: Array<{nameClass: string, test: AbstractTest}>

  constructor(
    public db: DatabaseProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.tests = new Array<any>()

    this.tests.push({nameClass: "HomePage", test: new HomeTest(new HomePage(db,navCtrl))})
    this.tests.push({nameClass: "RestPage", test: new RestTest(new RestPage(navCtrl, navParams))})
  }

  ngOnInit(){

  }

  async run(test){
    await test.test.cleanResults()
    test.test.unit()
  }
  
  runAll(){
    this.tests.forEach(test=>{
      this.run(test)
    })
  }
}
