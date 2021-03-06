const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const routes = require('./app/route');

const mime = {
    "css": "text/css",
    "js": "text/javascript",
    "json": "application/json",
    "ico": "image/x-icon",
    "gif": "image/gif",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "pdf": "application/pdf",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let extname = path.extname(pathname);
    let type = extname.slice(1);
    if (extname === '') {
        let router = routes.find(item => {
            return item.router == pathname && item.method == req.method
        })
        if (!router) {
            console.log('status:' + 404);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end();
        } else {
            res.json = (data) => {
                res.writeHead(200, { 'Content-Type': "application/json" });
                res.write(JSON.stringify(data));
                res.end();
            }
            router.action(req, res);
        }
    } else {
        let filePath = 'src' + pathname;
        fs.exists(filePath, (exists) => {
            if (!exists) {
                console.log('status:' + 404);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end();
            } else {
                if (type == "html") {
                    fs.readFile(filePath, (err, data) => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                        res.end();
                    })
                } else {
                    fs.readFile(filePath, 'binary', (err, file) => {
                        if (err) {
                            console.log('status:' + 404);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end();
                        } else {
                            res.writeHead(200, { 'Content-Type': mime[type] });
                            res.write(file, 'binary');
                            res.end();
                        }
                    });
                }
            }
        })
    }
}).listen(3000, () => {
    console.log('server listening on port 3000');
});