const express = require('express'); // library utama untuk membuat REST API
const App = express(); // mengaktifkan configurasi module express
const PORT = 5001;
const fs = require('fs');

App.use(express.json()); // untuk membaca data req.body

App.get('/', (req, res) => {
    res.status(200).send("<h1>Intro express API</h1>");
})

// Endpoint /users
const { usersRouter } = require('./routers');
App.use('/users',usersRouter)

App.listen(PORT, () => {
    let endpoint = JSON.parse(fs.readFileSync("./data/db.json"))

    let endpointURL = '';
    for (let prop in endpoint) {
        endpointURL += `http://localhost:${PORT}/${prop}\n`
    }
    console.log(`Home : 
http://localhost:${PORT} ✅
    
Resource :
${endpointURL}
    `)
})