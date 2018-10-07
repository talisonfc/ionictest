import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeTest } from './home.test';
import { RestPage } from '../rest/rest';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  a: number
  b: number
  result: number

  teste: HomeTest

  constructor(
    private db: DatabaseProvider,
    public navCtrl: NavController) {
    this.teste = new HomeTest(this)
  }

  ionViewWillEnter(){
    this.a = undefined
    this.b = undefined
    this.result = undefined
    this.teste.run()
  }

  calc(){
    this.result = this.a+this.b;
  }

  open(){
    this.navCtrl.push(RestPage)
  }

  search(){
    this.db.get().subscribe(res=>{
      console.log(res)
    })
  }
  
}
