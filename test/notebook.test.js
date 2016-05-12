var app     = require('../app'),
	pedding = require('pedding'),
	request = require('supertest')(app),
	should  = require("should"),
	support = require("./support/support.js");

describe('notebook/test', function() {
    var title   = 'test' + Math.random(100);
    var private = false;
    var desc    = '生活点滴'; 

    before(function(done) {
        done = pedding(done, 1);
        support.ready(done);
    });

    describe('notebook create', function() {
        it('should not create an notebook when title is empty', function(done) {
            request.post('/notebook/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                title   : '',
                private : private,
                desc    : desc
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('表单填写不完整');
                done();
            });
        });

        it('should create an notebook', function(done) {
            request.post('/notebook/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                title   : title,
                private : private,
                desc    : desc
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('创建成功');
                done();
            });
        });

        it('should not create an notebook when the notebook is exist', function(done) {
            request.post('/notebook/create')
            .set('Cookie', support.normalUserCookie)
            .send({
                title   : title,
                private : private,
                desc    : desc
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('笔记本已经存在');
                done();
            });
        });
    });

    describe('notebook update', function() {
        it('should not update an notebook when nid or title is missing', function(done) {
            request.post('/notebook/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title   : '',
                private : private,
                nid     : support.notebook._id,
                desc    : desc
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('表单填写不完整');
                done();
            });
        });

        it('should not update an notebook when the notebook is not exist', function(done) {
            request.post('/notebook/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title   : title,
                private : private,
                nid     : support.normalUser2._id,
                desc    : desc
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('笔记本不存在');
                done();
            });
        });        

        it('should update', function(done) {
            request.post('/notebook/update')
            .set('Cookie', support.normalUserCookie)
            .send({
                title   : title,
                private : private,
                nid     : support.notebook._id,
                desc    : desc
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('更新成功');
                done();
            });
        }); 
    });

    describe('notebook delete', function() {
        it('should not delete an notebook when the nid missing', function(done) {
            request.post('/notebook/delete')
            .set('Cookie', support.normalUserCookie)
            .send({
                // nid     : support.notebook._id
            })
            .expect(200, function(err, res) {
                should.not.exist(err);
                res.text.should.containEql('缺少nid字段');
                done();
            });
        });
        // it('should delete an notebook', function(done) {
        //     request.post('/notebook/delete')
        //     .set('Cookie', support.normalUserCookie)
        //     .send({
        //         nid     : support.notebook._id
        //     })
        //     .expect(200, function(err, res) {
        //         should.not.exist(err);
        //         res.text.should.containEql('删除成功');
        //         done();
        //     });
        // });
    });
});