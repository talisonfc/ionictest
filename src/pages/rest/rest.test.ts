import { RestPage } from "./rest";
import { AbstractTest, TYPE_RESULT } from "../testes/test.abstract";

export class RestTest extends AbstractTest{

    
    constructor(page: RestPage){
        super(page)
    }

    async run(){
        this.method("testanto carregamento de array")
        for(var i=0; i<10; i++){
            await this.exe(()=>{
                this.page.lista.push(i)
                this.log(`adicionado ${i} a lista`)
            },500)
        }
        this.sucess("lista carregada sucesso")
        await this.exe(()=>{
            this.page.navCtrl.pop()
        },1000)
    }

    unit() {
        console.log("sem teste unitario")
    }
}