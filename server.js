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
            return res.render('index', { message: null, error: "we did not connect to the api please try again" })

        } else {
            console.log('body:', body);
            let weather = JSON.parse(body);

            if (weather.main == undefined) {
                return res.render('index', { message: null, error: "Please retry. Your city is non-existent" })
            } else {
                let message = `Its ${weather.main.temp} degrees  in ${cityVar}`
                return res.render('index', { message: message, error: null })

            }



        }
    });

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

