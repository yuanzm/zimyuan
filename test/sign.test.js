var app = require('../app');
var request = require('supertest')(app);
var should = require("should"); 

describe('site/test.js', function() {
    var loginname = 'yuanzm' + Math.random(1);
    var email     =  Math.random(1) + '1229084233@qq.com';
    var password  = 'password';
    var nick_name = 'zimyuan';

    describe('sign up', function() {
        it('should not sign up an user when account is empty', function(done) {
            request.post('/signup')
            .send({
                account  : '',
                password : password,
                email    : email,
                nick_name: nick_name,
                rePassword: password
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('信息填写不完整');
                done();
            });
        });
    });
});