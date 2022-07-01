const http = require('http');
const fs = require('fs');

//? membuat port manual
const port = 3000;

//? membuat web server
const server = http.createServer((req, res) => {
    const { method } = req;
    const urlPath = req.url;

    if (method !== 'GET') {
        res.statusCode = 405;
        res.end();
        return;
    }

    const renderHTML = (urlPath, response) => {
        const render = fs.readFile(urlPath, 'utf-8', (err, data) => {
            if (err) {
                response.statusCode = 405;
                response.end();
                return;
            }

            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write(data);
            response.end();
        });

        return render;
    }

    if (urlPath === '/about') {
        renderHTML('./about.html', res);

        // res.end(JSON.stringify({
        //     data: 'hello from about'
        // }));

        return;
    } else if (urlPath === '/contact') {
        renderHTML('./contact.html', res);

        return;
    }

    fs.readFile('./index.html', 'utf-8', (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.end();
            return;
        };

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    });

});

//? menjalankan server
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});