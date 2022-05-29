const fs = require('fs')
const { dbConf } = require('../config/database')
module.exports = {
    getData: (req, res) => {
        // Get data dari mysql

        dbConf.query('Select * FROM users;', (error, results) => {
            if (error) {
                console.log("Error MYSQL", error)
                res.status(500).send(error)
            }
            
            //  results itu berisikan data user yg sudah di get
            console.log(results)
            // res.status(200).send(results)
            
            dbConf.query('Select * FROM cart;',(errorCart,resultsCart)=>{
                if(errorCart){
                    res.status(500).send(errorCart)
                }

                console.log(resultsCart)

            })

        })

        // Get data dari file db.json
        // let dataUsers = JSON.parse(fs.readFileSync('./data/db.json').toString()).users
        // // Mengetahui req.query ada atau tidak
        // if (JSON.stringify(req.query) == "{}") {
        //     // Jika object req.query kosong
        //     res.status(200).send(dataUsers);
        // } else {
        //     let filterData = dataUsers.filter((val) => {
        //         let truthly = [];
        //         for (let prop in req.query) {
        //             truthly.push(val[prop] == req.query[prop]);
        //         }
        //         if (!truthly.includes(false)) {
        //             return val
        //         }
        //     })
        //     res.status(200).send(filterData);
        // }
    },
    addUsers: (req, res) => {
        // Membaca data menggunakan fs
        let data = JSON.parse(fs.readFileSync('./data/db.json'))

        console.log(req.body)
        data.users.push({
            id: data.users[data.users.length - 1].id + 1,
            ...req.body
        });

        // menulis ulang file
        fs.writeFileSync('./data/db.json', JSON.stringify(data));
        res.status(201).send(JSON.parse(fs.readFileSync('./data/db.json')).users)
    },
    update: (req, res) => {
        let data = JSON.parse(fs.readFileSync('./data/db.json'))

        // mencari data yg akan dirubah
        let idx = data.users.findIndex(val => val.id == req.params.id)

        for (const propBody in req.body) {
            data.users[idx][propBody] = req.body[propBody]
        }

        // menulis ulang file
        fs.writeFileSync('./data/db.json', JSON.stringify(data));
        res.status(201).send(JSON.parse(fs.readFileSync('./data/db.json')).users[idx])
    },
    delete: (req, res) => {
        let data = JSON.parse(fs.readFileSync('./data/db.json'))

        // mencari data yg akan dirubah
        let idx = data.users.findIndex(val => val.id == req.params.id)

        data.users.splice(idx, 1);

        // menulis ulang file
        fs.writeFileSync('./data/db.json', JSON.stringify(data));
        res.status(201).send(JSON.parse(fs.readFileSync('./data/db.json')).users)
    }
}