# my-sql

A wrapper for the MySQL driver to use promises, connection pooling and nicer APIs all round

[![Build Status](https://travis-ci.org/ForbesLindesay/my-sql.png?branch=master)](https://travis-ci.org/ForbesLindesay/my-sql)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/my-sql.png)](https://gemnasium.com/ForbesLindesay/my-sql)
[![NPM version](https://badge.fury.io/js/my-sql.png)](http://badge.fury.io/js/my-sql)

## Installation

    npm install my-sql

## API

To construct a new connection pool, simply run:

```js
var pool = new MySql({
  host: 'localhost',
  user: 'me',
  passowrd: 'secret'
});

pool.query('SELECT 1 + 1 AS solution').done(function (result) {
  assert(result[0].solution === 2);
  pool.dispose().done();
});
```

## License

  MIT