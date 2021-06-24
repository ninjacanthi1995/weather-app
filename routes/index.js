var express = require('express');
var router = express.Router();
var request = require('sync-request');

const userModel = require('../models/users');

// const cityList = [];
let citites;

let message = '';

const url = 'http://api.openweathermap.org/data/2.5';
const apiKey = '12c6bb846f2e07dcb5707853ebe94821';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/weather', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    const user = await userModel.findOne({email: req.session.user.email});
    res.render('weather', { cities: user.cities, message });
  }
});

router.post('/add-city', async (req, res) => {
  let user = await userModel.findOne({email: req.session.user.email});
  cities = user.cities;
  const weatherRaw = await request('GET', `${url}/weather?q=${req.body.name}&lang=fr&units=metric&appid=${apiKey}`);
  const weather = await JSON.parse(weatherRaw.body);
  const index = cities.findIndex(city => weather.name === city.name);

  if (index === -1) {
    if (weather.cod === '404') {
      message = 'Ville introuvable';
    } else {
      const newCity = {
        name: weather.name,
        image: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        description: weather.weather[0].description,
        temp_max: weather.main.temp_max,
        temp_min: weather.main.temp_min,
        lon: weather.coord.lon,
        lat: weather.coord.lat,
      };
      await userModel.updateOne({
        email: req.session.user.email
      }, {
        cities: [...cities, newCity]
      });
      message = '';
      let user = await userModel.findOne({email: req.session.user.email});
      cities = user.cities;
    }
  }
  
  res.render('weather', { cities, message });
});

router.get('/delete-city', async (req, res) => {
  let user = await userModel.findOne({ email: req.session.user.email });
  await userModel.updateOne({
    email: req.session.user.email
  }, {
    cities: user.cities.filter(city => city.name !== req.query.name)
  });
  user = await userModel.findOne({ email: req.session.user.email });

  res.render('weather', { cities: user.cities, message });
});

router.get('/update-cities', async (req, res) => {
  let user = await userModel.findOne({email: req.session.user.email});
  cities = user.cities;
  cities.forEach(async (city, index) => {
    const weatherRaw = await request('GET', `${url}/weather?q=${city.name}&lang=fr&units=metric&appid=${apiKey}`);
    const weather = await JSON.parse(weatherRaw.body);

    const cityUpdate = {
      ...city,
      image: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
      description: weather.weather[0].description,
      temp_max: weather.main.temp_max,
      temp_min: weather.main.temp_min
    }
    await userModel.updateOne({
      email: req.session.user.email
    }, {
      cities: [...cities.slice(0, index), cityUpdate, ...cities.slice(index + 1)]
    });
  });
  setTimeout(async () => {
    user = await userModel.findOne({ email: req.session.user.email });
    res.render('weather', { cities: user.cities, message });
  }, 500);
});

module.exports = router;
