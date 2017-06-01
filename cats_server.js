var http = require('http');
var fs = require('fs');


//create a server on my computer
var server = http.createServer(function(req, res) {
	console.log(req.url);
		var count = 0;
//dealing with incoming requests
	if (req.url === "/") {
		cats('./cat_page.html',res);
		countCatVisits('./count_cat_visits.html',res);
	} else if (req.url === "/count") {
		res.write(countCatVisits());
		res.end();
	} else {
		res.write("404 not found");
		res.end();
	}
});

//counts the number of visits to my cat webpage
	function countCatVisits(fileName, res){
// read count_cat_visits and count the visits
		fs.readFile(fileName, function(err, data){
			var count= parseInt(data);
			if(isNaN(count)){
				count=0;
			}
			if(err){
				console.log("Couldn't read file");
				return;
			}else {
				count = count +1;
			}
// write to the count_cat_visits
			fs.writeFile(fileName, count, function(err){
				if (err){
					console.log("couldn't write file");
				}
			});
		});
		
	}	

// to deal with the cat page when called 
	function cats(fileName, res){
		fs.readFile(fileName,function(err, data){
			if(err){
				console.log("Couldn't read file.");
				return;
			}
			res.write(data);
			res.end();
		});
	}

server.listen(8080);

console.log("Server started http://localhost:8080");

