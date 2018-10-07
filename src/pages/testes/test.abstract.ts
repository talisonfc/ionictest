
export enum TYPE_RESULT{
    LOG="log", 
    SUCESS="sucess", 
    ERROR="error", 
    METHOD="method",
    JSON="json"
}

enum SHOW_RESULT{
    LOG=1,
    SUCESS=1, 
    ERROR=1,
    METHOD=1
}

const TEST = true

export abstract class AbstractTest{

    page:any 
    results: Array<{type: TYPE_RESULT, value: string}>

    constructor(page){
        this.page = page
        this.results = new Array<any>()
    }

    abstract async run();

    abstract async unit();

    exe(callback, time?:number){
        if(TEST){
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    callback()
                    resolve()
                },time)
            })
        }
    }

    delay(time){
        setTimeout(()=>{},time)
    }

    exeUnit(callback, time?:number){
        setTimeout(()=>{
            callback()
        },time)
    }

    async cleanResults(){
        var n = this.results.length
        for(var i=0; i<n; i++){
            this.results.pop()
        }
    }

    method(msg: string){
        if(SHOW_RESULT.METHOD){
            this.results.push({type: TYPE_RESULT.METHOD, value: msg})
        }
    }

    log(msg: string){
        if(SHOW_RESULT.LOG){
            this.results.push({type: TYPE_RESULT.LOG, value: msg})
        }
    }
    
    sucess(msg: string){
        if(SHOW_RESULT.SUCESS){
            this.results.push({type: TYPE_RESULT.SUCESS, value: msg})
        }
    }

    json(msg: string){
        this.results.push({type: TYPE_RESULT.JSON, value: msg})
    }

    error(msg: string){
        if(SHOW_RESULT.ERROR){
            this.results.push({type: TYPE_RESULT.ERROR, value: msg})
        }
    }

    
}