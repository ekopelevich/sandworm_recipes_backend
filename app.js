var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();

var recipes = {
  1: {
  "id": 1,
  "title": "Spice Beer",
  "author": "Leto Atreides",
  "image": "http://bit.ly/1SoJYvb",
  "ingredients": ["hops", "spice", "sandworm", "sugar", "yeast"],
  "directions": ["Do a thing", "Do the next thing", "Finish up"],
  "cookTime": 24,
  "prepTime": 6,
  "comments": [{
    "author": "Duncan Idaho",
    "text": "delicious!"
  }, {
    "author": "Benegessirit Mother",
    "text": "gross!"
  }]},
  2: {
  "id": 2,
  "title": "Worm Roast",
  "author": "Vladamir Harkonnen",
  "image": "http://bit.ly/1P24cWY",
  "ingredients": ["potatoes", "yams", "sandworm", "sage", "salt"],
  "directions": ["Do a thing", "Do the next thing", "Finish up"],
  "cookTime": 12,
  "prepTime": 6,
  "comments": [{
    "author": "Duncan Idaho",
    "text": "delicious!"
  }, {
    "author": "Benegessirit Mother",
    "text": "gross!"
  }]
}};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.send('Welcome to Sandworm Connoisseur!');
});

app.route('/recipes')
  .get(function(req, res){
    res.json(recipes);
  })
  .post(function(req, res){
    var id = 2;
    id++;
    recipes[id] = {
      id: id,
      title: req.body.title,
      author: req.body.author,
      image: req.body.image,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      cookTime: req.body.cookTime,
      prepTime: req.body.prepTime,
    };
    res.json(recipes[id]);
  });

app.route('/recipes/:id')
  .get(function(req, res){
    var id = req.params.id;
    res.send(recipes[id]);
  });
  // .put(function(req, res){
  //   var update = req.body;
  //   if (update.id) {
  //     delete update.id;
  //   }
  //   var i = _.findIndex(recipes, {id: req.params.id});
  //   if (!recipes[i]) {
  //     res.send('The recipe you are looking for does not exist.');
  //   } else {
  //     var updatedRecipe = _.assign(recipe[i], update);
  //     res.json(updatedRecipe);
  //   }
  // })
  // .delete(function(req, res) {
  //   var i = _.findIndex(recipes, {id: req.params.id});
  //   if (!recipes[i]) {
  //     res.send('The recipe you are looking for does not exist.');
  //   } else {
  //     delete recipes[i];
  //     res.json('The recipe has been deleted.');
  //   }
  // });

app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port 3000');
});

module.exports = app;
