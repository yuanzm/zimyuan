var app     = require('../app'),
	pedding = require('pedding'),
	request = require('supertest')(app),
	should  = require("should"),
    tools   = require('../common/tools'),
	support = require("./support/support.js");

describe('note/test', function() {
    var title   = '测试笔记' + tools.random(1, 100);
    var content = '测试笔记内容';
    var private = false;
    var tab     = 'life';

    before(function(done) {
        done = pedding(done, 1);
        support.ready(done);
    });

    describe('note create', function() {
        it('should not create an note when title is empty', function(done) {
            request.post('/note/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : '',
                content  : content,
                private  : private,
                author   : support.normalUser._id,
                notebook : support.notebook._id,
                tab      : tab
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('表单填写不完整');
                done();
            });
        });
        it('should not create an note when the notebook is not exist', function(done) {
            request.post('/note/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : title,
                content  : content,
                private  : private,
                author   : support.normalUser._id,
                notebook : support.normalUser._id,
                tab      : tab
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('笔记本不存在');
                done();
            });
        });

        it('should not create an note', function(done) {
            request.post('/note/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : title,
                content  : content,
                private  : private,
                author   : support.normalUser._id,
                notebook : support.notebook._id,
                tab      : tab
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('创建成功');
                done();
            });
        });  
    });
    describe('note update', function() {
        it('should not update an note when the note is not exist', function(done) {
            request.post('/note/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : title,
                content  : content,
                private  : private,
                tab      : tab,
                note_id  : support.normalUser._id
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('该笔记不存在');
                done();
            });
        });

        it('should not update an note', function(done) {
            request.post('/note/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : title,
                content  : content,
                private  : private,
                tab      : tab,
                note_id  : support.note._id
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('更新成功');
                done();
            });
        });        
    });  
    describe('note delete', function() {
        it('should not delete an note when the note is not exist', function(done) {
            request.post('/note/delete')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : title,
                content  : content,
                private  : private,
                tab      : tab,
                note_id  : support.normalUser._id
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('该笔记不存在');
                done();
            });
        });

        it('should not delete an note', function(done) {
            request.post('/note/delete')
            .set('Cookie', support.normalUserCookie)
            .send({
                title    : title,
                content  : content,
                private  : private,
                tab      : tab,
                note_id  : support.note._id
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('删除');
                done();
            });
        });        
    });
});