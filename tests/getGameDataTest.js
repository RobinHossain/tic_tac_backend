const should = require('should');
const request = require('supertest');
const app = require('../index');
const URI = require('./spec_helper').URI;
const mongoose = require('mongoose');

const validGameData = { history: [], browser_id: '15519217501903gv4f', step_number: 5, x_is_next: true };


describe('************* Get Game Data *************', () => {
    after((done) => {
        const colls = 'games';
        mongoose.connection.collections[colls].drop(() => done());
    });

    it('If browser data found then data will return', (done) => {
        request(app)
            .get('/api/get/' + '234234a9a8s7d9f98')
            .set('X-Real-IP', URI)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                done();
            });
    });

    it('If missing browser id/code', (done) => {
        request(app)
            .post('/api/save')
            .set('X-Real-IP', URI)
            .type('form')
            .send({ history: [], step_number: 5, x_is_next: true })
            .expect(422)
            .end((err, res) => {
                if (err) done(err);
                res.body.error.should.be.eql('Please input the require data');
                done();
            });
    });

    it('If missing history data', (done) => {
        request(app)
            .post('/api/save')
            .set('X-Real-IP', URI)
            .type('form')
            .send({ browser_id: '15519217501903gv4f', step_number: 5, x_is_next: true })
            .expect(422)
            .end((err, res) => {
                if (err) done(err);
                res.body.error.should.be.eql('Please input the require data');
                done();
            });
    });

    it('Save game data if found all required info', (done) => {
        request(app)
            .post('/api/save')
            .set('X-Real-IP', URI)
            .type('form')
            .send(validGameData)
            .expect(200)
            .end((err, res) => {
                done();
            });
    });

});
