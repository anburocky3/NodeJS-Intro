const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const SERVER_PORT = 4000;
const path = require("path")
const data = require("./data/interns.json")
const fs = require("fs")

const app = express();

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.get("/", (request, response) => {
//   response.send(data);
    response.sendFile(path.join(__dirname,"index.html"))
});

app.get("/interns", (req,res) => {
    res.send(data)
})

app.post("/addIntern", (req, res) => {
    data.push({
        id: data.length+1,
        name: req.body.name
    })
    fs.writeFile("data/interns.json", JSON.stringify(data, null, 4), (err) => {
        console.log("File written successfully")
        if (err) {
            console.log(err)
        }
    })
    res.send(data)
})

app.delete("/removeIntern", (req,res) => {
    let index = data.findIndex(e => e.id == req.body.id)
    if (index === -1) {
        res.status(404);
        let error = {
            errorMessage: "Intern not found with id: "+req.body.id,
            errorCode: 404
        }
        res.json(error)
        return
    }
    data.splice(index,1)
    fs.writeFile("data/interns.json", JSON.stringify(data), (err) => {
        if (err) {
            let error = {
                errorMessage: "Unable to delete the user with id:"+ req.body.id,
                errorCode: 500
            }
            res.json(error)
            return
        }
        res.status(200)
        res.json(data)
    })
})

app.put("/modifyIntern", (req,res) => {
    let internId = req.body.id
    let internName = req.body.name

    let index = data.findIndex(e => e.id == req.body.id)
    if (index === -1) {
        res.status(404);
        let error = {
            errorMessage: "Intern not found with id: "+req.body.id,
            errorCode: 404
        }
        res.json(error)
        return
    }

    // Edit Intern name
    data[index].name = internName

    fs.writeFile("data/interns.json", JSON.stringify(data), (err) => {
        if (err) {
            let error = {
                errorMessage: "Unable to edit the user with id:"+ req.body.id,
                errorCode: 500
            }
            res.json(error)
            return
        }
        res.status(200)
        res.json(data)
    })
    
})


app.get("*",(req,res) => {
    res.status(404)
    res.send("Page not found");
})

app.listen(SERVER_PORT, () => {
  console.log("Listening to Port : " + SERVER_PORT);
});
