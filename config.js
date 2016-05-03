/**
 * 项目配置文件
 */

var path = require("path");

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,
    
    host: "localhost",
    // mongodb配置
    db: "mongodb://127.0.0.1/zimyuan",
    
    session_secret: 'zimyuan', // 务必修改
    auth_cookie_name: 'zimyuan',

    port: 8888,
}

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/zimyuan_test';
}

module.exports = config;
