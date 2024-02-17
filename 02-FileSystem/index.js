const fs = require('fs');
const internsJSON = require("./data/interns.json")


// var data = internsJSON.find(data => { return data.id === 2 })

// Create a file called person.txt which should hold the following information!
// 1. Create a folder call "Interns"
// 2. Esakki -> esakki.txt
// 3. Hello, My name is Esakki, I'm learning NodeJS in CyberDude Channel!


// Creating a folder call "Interns"
fs.mkdir("interns", (err) => {})

const data = internsJSON

for(let i=0; i < data.length; i++){
    // Writing the file!
    fs.writeFile(`interns/${data[i].name.toLocaleLowerCase()}.txt`, `Hello, My name is ${data[i].name},`, () => {
        console.log("File written succesfully!")
    })
    fs.appendFile(`interns/${data[i].name.toLocaleLowerCase()}.txt`, `\n\nI'm learning NodeJS in CyberDude Channel!`, () => {})

}
























// console.log(data)
// fs.mkdir('newFolder', err => {
//     if (err) {
//         console.log(err);
//     }
// })

// fs.writeFile('newFolder/first.Json', data, (err) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log("File written successfully!.")
// })

// fs.readFile('newFolder/firstFileUsingNodeJs.txt')