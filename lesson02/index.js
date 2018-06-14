const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
/**
 *用Promise封装异步读取文件方法
 * @param {string} page html文件名称
 * @returns {promise} 
 */
function render(page) {
    return new Promise((res, rej) => {
        let viewUrl = `./view/${page}`
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                rej(err)
            } else {
                res(data)
            }
        })
    })
}

async function route(url){
    let view = '404.html'
    switch(url){
        case '/':
            view = 'index.html'
            break
        case '/index':
            view = 'index.html'
            break
        case '/todo':
            view = 'todo.html'
            break
        case '/404':
            view = '404.html'
            break
        default: 
            break
    }
    let html = await render(view)
    return html
}

app.use(async (ctx)=>{
    let url = ctx.req.url
    let html = await route(url)
    ctx.body = html
})
app.listen(3000)