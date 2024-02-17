const http = require('http')
const internsData = require('./data/interns.json')

const PORT = "4545"

http.createServer(function (request, response) {
    console.log("Server is running on Port: " + PORT)
    response.write(JSON.stringify(internsData))
    response.end()
}).listen(PORT)