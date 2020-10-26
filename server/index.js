(async() => {
    const Koa = require('koa');
    const app = new Koa();
    const cors = require('koa2-cors');
    const routing = require('./routes');
    const mysql = require('mysql2/promise');
    const dbCfg = require('./config/db.cfg');
// const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);
// 处理跨域
    app.use(
        cors({
            origin: 'http://192.168.0.101:8085',
            maxAge: 5, //指定本次预检请求的有效期，单位为秒。
            credentials: true, //是否允许发送Cookie
            allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
            exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
        })
    );
    /*io.on('connection', socket => {
        console.log('connected');
        console.log(socket.id);
        socket.emit('test', 'ok');//通知客户端已连接
    });*/
// db连接
// 建立连接
// 挂载到db
    app.context.db = await mysql.createConnection(dbCfg).catch((err) => {
        console.log(err);
    });
    routing(app);
    app.listen(2333);
    console.log('server is start');

})();
