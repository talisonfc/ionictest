import { HomePage } from './home';
import { AbstractTest, TYPE_RESULT } from '../testes/test.abstract';
import { RestPage } from '../rest/rest';

export class HomeTest extends AbstractTest{

    constructor(page: HomePage){
        super(page)
    }

    async run(){
        this.method(`Iniciando teste do metodo de calcular`)
        await this.exe(()=>{
            this.page.a = 2
            this.log(`adicionar ${2}`)
        },1000)
        await this.exe(()=>{
            this.page.b = 3
            this.log(`adicionar ${3}`)
        },1000)
        await this.exe(()=>{
            this.page.calc()
            if(this.page.result==4){
                this.sucess("resultado correto")
            }
            else{
                this.error("resultado incorreto")
            }
        },1000)
        await this.exe(()=>{
            this.page.navCtrl.push(RestPage)
        },1000)
    }

    unit() {
        console.log("sem teste unitario")
    }
}