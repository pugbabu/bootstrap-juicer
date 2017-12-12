var express = require('express');

var port = 80;

var app = express();

var router = express.Router();




app.use(router);

var appData = require('./data.json');

router.get('/', function (req, res, next) {
    console.log('进来了')
    // req.url = './pages/login.htm';
    next();
});

router.get('/title', function (req, res) {  // 返回显示数据get
	setTimeout(() => {
        res.json({
            data: appData
        });
	},1000)
});

router.get('/login', function (req, res) {  // 登陆post

    console.log(req.query)
	if((req.query.pwd === 'admin') && (req.query.username === 'admin') ){
        setTimeout(() => {
            res.json({
                token: true,
                result: 'SUCCESS',
                resultMessage: ''
            })
        },1000)
	}else{
        setTimeout(() => {
            res.json({
                token: false,
                resultMessage: '用户名或者密码错误'
            })
        },1000)
	}
});


router.get('/logout', function (req, res) {  // 返回显示数据get
    setTimeout(() => {
        res.json({
            result: 'SUCCESS'
        });
    },1000)
});

app.use('/api', router);

app.use(express.static('./web'));

module.exports = app.listen(port, function (err) {
	console.log('title')
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});