const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const mime = {  
    "html" : "text/html",  
    "css"  : "text/css",  
    "js"   : "text/javascript",  
    "json" : "application/json",  
    "ico"  : "image/x-icon",  
    "gif"  : "image/gif",  
    "jpeg" : "image/jpeg",  
    "jpg"  : "image/jpeg",  
    "png"  : "image/png",  
    "pdf"  : "application/pdf",  
    "svg"  : "image/svg+xml",  
    "swf"  : "application/x-shockwave-flash",  
    "tiff" : "image/tiff",  
    "txt"  : "text/plain",  
    "wav"  : "audio/x-wav",  
    "wma"  : "audio/x-ms-wma",  
    "wmv"  : "video/x-ms-wmv",  
    "xml"  : "text/xml"  
}; 

// class router {
//     constructor() {
//         this.getUrl = {};
//     }
//     static get (url, callback) {
//         console.log(this)
//         //this.getUrl[url] = callback;
//     }
// }

// router.get('/name', (req, res) => {
//     console.log(111);
// })

let router = {
    '/name': (req, res) => {console.log(111, req.url)}
}

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let extname = path.extname(pathname);
    let type = extname.slice(1);
    
    if (extname === '') {
        router[req.url](req, res);
    } else {
        console.log(pathname);
        let filePath = 'src' + pathname;
        fs.exists(filePath, function(exists){    
            if ( !exists ) {    
                res.writeHead(404, {'Content-Type': 'text/plain'});     
                res.end();    
            } else {    
                fs.readFile(filePath, 'binary', function(err, file){    
                    if ( err ) {    
                        res.writeHead(500, {'Content-Type': 'text/plain'});      
                        res.end();    
                    } else {    
                        res.writeHead(200, {'Content-Type': mime[type]});    
                        res.write(file, 'binary');    
                        res.end();    
                    }    
                });    
            }    
        })    
    }

    fs.readFile('src/views/index.html', (err, data) => {
        res.writeHead(200, {'Content-Type':'text/html'});    
        res.write(data);    
        res.end();
    })
}).listen(3000, () => {
    console.log('server listening on port 3000');
});