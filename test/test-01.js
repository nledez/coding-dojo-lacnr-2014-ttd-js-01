var supertest = require('supertest');
var app = require('../index.js');
var expect = require('chai').expect;

describe('saucisson', function(){
    it("should return status 200 on /", function(done){
        supertest(app)
            .get('/')
            .expect(200)
            .end(function(err, res){
               if (err) throw err;
               expect(res.body.name).to.eql(null);
               done();
            });
    });

    it("should return a name list on /list", function(done){
        supertest(app)
            .get('/list')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                expect(res.body.names).to.length(0);
                done();
            });
    });
    
    it("should add a name to the list on /list", function(done){
        supertest(app)
        .post('/list')
        .send({name: "niko"})
        .expect(204)
        .end(function(err, res) {
            if (err) throw err;
            supertest(app)
            .get("/list")
            .expect(200)
            .end(function(err, res){
                if (err) throw err;
                expect(res.body).to.eql({
                    names: ['niko']
                });
                done();
            });
        });
    });

    describe("with names", function() {
        beforeEach(function(){
          app.NAMES = ['remy'];
        });
    });
});
