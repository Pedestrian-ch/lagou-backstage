var express = require('express');
var router = express.Router();
var fs = require('fs');
const users = require('../methods/users');
const job = require('../methods/job')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/', job.findinfo)

router.get('/manage', function (req, res, next) {
  fs.readFile('./public/manage.html', function (error, data) {
    if (error) throw error;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    res.write(data);
    res.end();
  })
});

router.post('/register', users.register);

router.post('/login', users.login);

router.post('/addinfo', job.add);

router.get('/delete', job.deleteinfo);

router.get('/updatainfo', job.updatainfo);

module.exports = router;