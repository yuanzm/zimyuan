var app     = require('../app'),
	pedding = require('pedding'),
	request = require('supertest')(app),
	should  = require("should"),
    tools   = require('../common/tools'),
	support = require("./support/support.js");

describe('article/test', function() {
    var type    = 'blog';
    var title   = '测试文章' + tools.random(1, 100);
    var content = '测试内容';
    var private = false;
    var tab     = 'life';

    before(function(done) {
        done = pedding(done, 1);
        support.ready(done);
    });

    describe('article create', function() {
        it('should not create an article when title is empty', function(done) {
            request.post('/article/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                type     : type,
                title    : '',
                content  : content,
                private  : private,
                tab      : tab
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('表单字段填写不完整');
                done();
            });
        });
        it('should not create an article when the user is not exist', function(done) {
            request.post('/article/create')
            .set('Cookie', support.invalidUser)
            .send({
                type     : type,
                title    : title,
                content  : content,
                private  : private,
                tab      : tab
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('用户不存在');
                done();
            });
        });
        it('should create an article', function(done) {
            request.post('/article/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                type     : type,
                title    : title,
                content  : content,
                private  : private,
                tab      : tab
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('文章创建成功');
                done();
            });
        });
    });

    describe('article update', function() {
        it('should not update an article when title is empty', function(done) {
            request.post('/article/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title     : '',
                content   : content,
                private   : private,
                tab       : tab,
                article_id: support.blog._id 
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('表单字段填写不完整');
                done();
            });
        });

        it('should not update an article when the article is not exist', function(done) {
            request.post('/article/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title      : title,
                content    : content,
                private    : private,
                tab        : tab,
                article_id : support.normalUser._id 
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('文章不存在');
                done();
            });
        });        

        it('should update an article', function(done) {
            request.post('/article/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title      : title,
                content    : content,
                private    : private,
                tab        : tab,
                article_id : support.blog._id 
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('更新成功');
                done();
            });
        }); 
    });

    describe('article delete', function() {
        it('should delete an article when the article is not exist', function(done) {
            request.post('/article/delete')
            .set('Cookie', support.normalUserCookie)
            .send({
                article_id : support.normalUser._id 
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('文章不存在');
                done();
            });
        }); 
        it('should delete an article', function(done) {
            request.post('/article/delete')
            .set('Cookie', support.normalUserCookie)
            .send({
                article_id : support.blog._id 
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('删除');
                done();
            });
        }); 
    });
});