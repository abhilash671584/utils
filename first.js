var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  
  var q = url.parse(req.url, true).query;
  var filename = q.filename;
  fs.readFile(filename, function(error,data){
    if(error){
      res.writeHead(503, {'Content-Type': 'text/plain'});
      res.write('Error while reading the file');
    }else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      var dataArr = data.toString().split("\n");
      var retData = '';
      for( var i=0; i<dataArr.length; i++){
        retData = retData + dataArr[i] + "\n";
      } 
      res.write(retData);
    }
    res.end();
  });
}).listen(8080);