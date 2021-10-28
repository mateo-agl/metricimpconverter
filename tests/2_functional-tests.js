const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test('1', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=10L')
      .end((err, res) => {
        if (err) return console.error(err);
        assert.equal(res.body.returnNum, '2.64172');
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });
  test('2', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=32g')
      .end((err, res) => {
        if (err) return console.error(err);
        assert.equal(res.text, 'invalid unit');
        done();
      });
  });
  test('3', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end((err, res) => {
        if (err) return console.error(err);
        assert.equal(res.text, 'invalid number');
        done();
      });
  });
  test('4', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end((err, res) => {
        if (err) return console.error(err);
        assert.equal(res.text, 'invalid number and unit');
        done();
      });
  });
  test('5', (done) => {
    chai
      .request(server)
      .get('/api/convert?input=kg')
      .end((err, res) => {
        if (err) return console.error(err);
        assert.equal(res.body.returnNum, '2.20462');
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});
