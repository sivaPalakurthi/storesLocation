var https = require('https');

var inputs = '';
var key = 'AIzaSyCYrhSLicOCIp2FPVS4mlNmFeQhvUK6zTY';
var sensor = 'false';
var que = 'Nike+in+Delhi';

var getLocation = function getLocation (stor, query, callback) {
		var options = {
		  hostname: 'maps.googleapis.com',
		  port: 443,
		  path: '/maps/api/place/textsearch/json?key='+key+'&sensor=false&query='+query,
		  method: 'GET'
		};
		var data = '';
		var req = https.request(options, function(res) {
		  //console.log('STATUS: ' + res.statusCode);
		  //console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		//    console.log('BODY: ' + chunk);
		     data = data + chunk;
		   });
		res.on('end', function(){
		  console.log("EEEENNNDDD");
		  js = JSON.parse(data);
		  console.log('Store : ' + stor + " Location is : ");
		  console.log(js.results[0].geometry);
		  callback('done');
		});
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});
		req.end();
}

var stores = [];
var fs = require('fs'),
    readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('stores.txt'),
    output: process.stdout,
    terminal: false
});

rd.on('line', function(line) {
	console.log(line);
   stores.push(line);
});
getLocation('Nike in Delhi', 'Nike+in+Delhi', function(res){});
//var async = require('async');
//async.eachSeries(function(store) {
//	 getLocation(store, store+' in Delhi', function(result){ 
//     console.log('Success');
//   });
//}); 
