import http from "http"
import internsData from "./data/interns.json" assert { type: 'json'}

const SERVER_PORT = "3000";

const server = http.createServer((request, response) => {

    if(request.url === '/interns'){
        console.log("Server is running on Port: " + SERVER_PORT);
        response.write(JSON.stringify(internsData));
    }else {
        response.write(JSON.stringify({message: "Hello World!"}));
    }
    response.end();
});

server.listen(SERVER_PORT);
