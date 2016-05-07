var app = require('../app');
var request = require('supertest')(app);
var should = require("should"); 

describe('sign/test.js', function() {
    var account   = 'yuanzm' + Math.random(1);
    var password  = 'password';
    var email     = Math.random(10) +  '1229084233@qq.com';
    var nick_name = 'zimyuan';

    describe('sign up', function() {
        it('should not sign up an user when loginname is empty', function(done) {
            request.post('/signup')
            .send({
                account: '',
                password: password,
                email  : email,
                nick_name: nick_name,
                rePassword: password
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('信息填写不完整');
                done();
            });
        });

        it('should not sign up an user when email is wrong', function(done) {
            request.post('/signup')
            .send({
                account    : account,
                password   : password,
                email      : 'wtf',
                nick_name  : nick_name,
                rePassword : password
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('邮箱不合法');
                done();
            });
        });

        it('should not sign up an user when the password and rePassword are not equal', function(done) {
            request.post('/signup')
            .send({
                account    : account,
                password   : password,
                email      : email,
                nick_name  : nick_name,
                rePassword : password + '1'
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('密码输入不一致');
                done();
            });
        }); 

        it('should sign up an user', function(done) {
            request.post('/signup')
            .send({
                account    : account,
                password   : password,
                email      : email,
                nick_name  : nick_name,
                rePassword : password
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('注册成功');
                done();
            });
        });        

        it('should not sign up an user when the account is occupied', function(done) {
            request.post('/signup')
            .send({
                account    : account,
                password   : password,
                email      : email,
                nick_name  : nick_name,
                rePassword : password
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('登录名或者邮箱被占用');
                done();
            });
        });         
    });

    describe('login', function() {
        it('should not login when the account is account or password is missing', function(done) {
            request.post('/signin')
            .send({
                // account    : account,
                password   : password,
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('信息填写不完整');
                done();
            });
        });  

        it('should not login when the user is not exist', function(done) {
            request.post('/signin')
            .send({
                account    : account + 'test',
                password   : password,
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('用户不存在');
                done();
            });
        }); 
        it('should not login when the password is wrong', function(done) {
            request.post('/signin')
            .send({
                account    : account,
                password   : password + 'test',
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('用户密码错误');
                done();
            });
        }); 

        it('should login', function(done) {
            request.post('/signin')
            .send({
                account    : account,
                password   : password,
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('登录成功');
                done();
            });
        });        
    });
});