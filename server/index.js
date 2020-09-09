const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const routing = require('./routes');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server, options);

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
io.on('connection', socket => {
    socket.emit('test', 'ok');//通知客户端已连接
    console.log('connected');
});
routing(app);
server.listen(2333);
console.log('server is start');
