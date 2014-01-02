'use strict';

var test = require('tape');
var MySql = require('../');

var config = require('./mock.js');

if (process.env.TRAVIS) {
  config = {
    host: '127.0.0.1',
    database: 'myapp_test',
    user: 'travis',
    password: ''
  };
  console.log('# using live database');
}

var connection = new MySql(config);

test('connection.query', function (t) {
  t.plan(1);
  connection.query('SELECT 1 + 1 AS solution').done(function (result) {
    t.assert(result[0].solution === 2, 'results are retrieved from the database');
  });
});

test('connection.call', function (t) {
  t.plan(1);
  connection.query('DELIMITER //\nCREATE PROCEDURE myproc()\nBEGIN\nSELECT 1 + 1 AS solution;\nEND//\nDELIMITER ;').then(function () {
    return connection.call('myproc');
  }).done(function (result) {
    t.assert(result[0].solution === 2, 'results are retrieved from the database');
  });
});

test('connection.queryStream', function (t) {
  t.plan(3);
  connection.queryStream('SELECT 1 + 1 AS solution')
  .on('fields', function (fields) {
    t.assert(Array.isArray(fields), 'The fields event is passed through');
  })
  .on('data', function (result) {
    t.assert(result.solution === 2, 'results are retrieved from the database');
  })
  .on('end', function () {
    t.assert(true, 'The end event is passed through');
  });
});

test('connection.dispose', function (t) {
  t.plan(1);
  connection.dispose().done(function () {
    t.assert(true, 'Disposed safely');
  });
});