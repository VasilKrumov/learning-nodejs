const fs = require('fs')

function requestHandler(req, res) {
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write(
            '<body><form action="/message" method="POST"><input type="text" name="message" /><button type="submit">Send</button></form></body>'
        )
        res.write('</html>')
        return res.end()
    }
    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString() // we can call toString because it is a text
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                // res.writeHead(302, { Location: '/' }) -> same as below
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = {
    handler: requestHandler,
}
