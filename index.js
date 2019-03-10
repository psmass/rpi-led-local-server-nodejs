var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');

var ledStatus = "Off";

gpio.setup(7, gpio.DIR_OUT);


app.set('view engine', 'ejs');

app.use(function(req, res, next) {
	console.log(`${req.method} request for '${req.url}'`);
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){ 
 	res.render('index',{status:"Press Button To change Status of Led !!"});
});

app.get('/led/toggle', function(req, res){
    var pin7State;
    
    if (ledStatus==="On") {
	ledStatus = "Off";
	pin7State = false;
    } else {
	ledStatus = "On";
	pin7State = true
    }
    gpio.write(7, pin7State, function(err) {
	if (err) throw err;
	console.log(path.join(__dirname, 'public-', ledStatus));
	return res.render('index', {status: ledStatus});
    });
});

app.listen(3000, function () {
  console.log('Simple LED Control Server Started on Port: 3000!')
})
