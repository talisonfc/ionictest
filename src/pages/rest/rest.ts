import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestTest } from './rest.test';

@IonicPage({name: "rest-page"})
@Component({
  selector: 'page-rest',
  templateUrl: 'rest.html',
})
export class RestPage {

  lista: Array<any>

  test: RestTest
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.lista = new Array<string>()
    this.test = new RestTest(this)
  }
  
  ionViewWillEnter(){
    this.test.run()
  }

}
