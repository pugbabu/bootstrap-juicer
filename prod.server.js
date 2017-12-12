var express = require('express');

var port = 80;

var app = express();

var router = express.Router();


router.get('/', function (req, res, next) {
	console.log('进来了')
	req.url = './web/pages/frame.htm';
	next();
});

app.use(router);

var appData = require('./data.json');

var apiRoutes = express.Router();

apiRoutes.get('/title', function (req, res) {

	res.json({
		data: appData
	});
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	console.log('title')
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});