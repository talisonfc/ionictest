var fs = require('fs')

const path = './src/pages'

var input = process.argv[2]
if (input != undefined) {

    if (input == 'comment' || input == 'uncomment') {
        fs.readdir(path, function (err, pages) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i] != 'testes') {
                    var pathdir = `${path}/${pages[i]}`
                    configTest(pathdir, pages[i], input).then(res => { })
                }
            }
        });
    }
    else {
        if(input == 'verify'){
            console.log("Verificando testes e desabilitando-os")     
            fs.readdir(path, function (err, pages) {
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i] != 'testes') {
                        var pathdir = `${path}/${pages[i]}`
                        checkAndComment(pathdir, pages[i]).then(res => {})
                    }
                }
            });   
        }
        else{
            console.log("Entrada inalida: opções validas [comment, uncomment]")
        }
    }
}
else {
    console.log("Verificando testes")
    fs.readdir(path, function (err, pages) {
        for (var i = 0; i < pages.length; i++) {
            if (pages[i] != 'testes') {
                var pathdir = `${path}/${pages[i]}`
                check(pathdir, pages[i]).then(res => {})
            }
        }
    });
}

function check(pathdir, page) {
    return new Promise((resolve, reject) => {
        var itens = fs.readdirSync(pathdir)
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i]
            if (item.match(`${page}.spec.ts`)) {
                var content = JSON.stringify(fs.readFileSync(`${pathdir}/${page}.ts`, 'utf8'))
                if (content.match("//test")) {
                    console.log(pathdir+" - "+page+" - commented")
                    // resolve({ status: 'commented' })
                }
                else {
                    console.log(pathdir+" - "+page+" - uncommented")
                    // resolve({ status: 'uncommented' })
                }
            }
        }
        resolve(undefined)
    })
}

function checkAndComment(pathdir, page) {
    return new Promise((resolve, reject) => {
        var itens = fs.readdirSync(pathdir)
        for (var i = 0; i < itens.length; i++) {
            var item = itens[i]
            if (item.match(`${page}.spec.ts`)) {
                var content = JSON.stringify(fs.readFileSync(`${pathdir}/${page}.ts`, 'utf8'))
                if (content.match("//test")) {
                    console.log(pathdir+" - "+page+" - commented")
                }
                else {
                    console.log(pathdir+" - "+page+" - uncommented")
                    commentTest(pathdir, page).then(() => { })
                }
            }
        }
        resolve(undefined)
    })
}

function configTest(pathdir, page, action) {
    return new Promise((resolve, reject) => {
        fs.readdir(pathdir, function (err, itens) {
            for (var k = 0; k < itens.length; k++) {
                if (itens[k].match(`${page}.spec.ts`)) {
                    console.log(`${pathdir}/${page}.ts`)
                    // console.log(itens[k])
                    switch (action) {
                        case 'uncomment': {
                            unCommentTest(pathdir, page).then(() => { })
                            break
                        }
                        case 'comment': {
                            commentTest(pathdir, page).then(() => { })
                            break
                        }
                    }
                }
            }
            resolve()
        })
    })
}

function commentTest(pathdir, page) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${pathdir}/${page}.ts`, 'utf8', function (err, data) {
            var temp = JSON.stringify(data)
            temp = temp.replace('test:', '//test:')
            temp = temp.replace('this.test', '//this.test')
            temp = temp.replace('this.test.run()', '//this.test.run()')

            fs.writeFile(`${pathdir}/${page}.ts`, JSON.parse(temp), (err) => {
                if (err) {
                    console.error(err)
                }
                else {
                    resolve()
                }
            })
        })
    })
}

function unCommentTest(pathdir, page) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${pathdir}/${page}.ts`, 'utf8', function (err, data) {
            var temp = JSON.stringify(data)
            temp = temp.replace('//test:', 'test:')
            temp = temp.replace('//this.test', 'this.test')
            temp = temp.replace('//this.test.run()', 'this.test.run()')

            fs.writeFile(`${pathdir}/${page}.ts`, JSON.parse(temp), (err) => {
                if (err) {
                    console.error(err)
                }
                else {
                    resolve()
                }
            })
        })
    })
}