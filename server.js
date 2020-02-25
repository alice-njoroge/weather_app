const express = require('express')
const bodyParser = require('body-parser')
const request = require("request")
const app = express()
const port = 3000
const apiKey = "ff8ae350132e831d954cabdfa9257092"



app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.get('/', (req, res) => res.render('index', { error: null }))

app.post('/', function (req, res) {

    let cityVar = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVar}&appid=${apiKey}&units=metric`
    request(url, function (err, response, body) {
        if (err) {
            console.log(err)
            res.render('index', { error: err })

        } else {
            console.log('body:', body);
            let weather = JSON.parse(body);
            let message = `its ${weather.main.temp} in ${cityVar}`
            console.log(message);
        }
    });

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

