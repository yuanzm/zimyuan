var app     = require('../app'),
    pedding = require('pedding'),
    request = require('supertest')(app),
    should  = require("should"),
    tools   = require('../common/tools'),
    support = require("./support/support.js");

describe('upload/test', function() {
    var account   = 'yuanzm' + Math.random(1);
    var password  = 'password';
    var email     = Math.random(10) +  '1229084233@qq.com';
    var nick_name = 'zimyuan';

    describe('upload', function() {
        it('should get upload token', function(done) {
            request.post('/uptoken')
            .set('Cookie', support.normalUserCookie)
            .expect(200, function(err, res) {
                should.not.exist(err);
                done();
            });
        });      
    });
});