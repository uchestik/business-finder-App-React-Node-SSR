require('import-export')
require('babel-core/register')({ presets: ['es2015', 'react','react-app'] })


var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')

//db models
var Business = require('./models/business');
var Rating = require('./models/ratings');

//server-side rendering variables
const http = require('http')
const path = require('path')
const fs = require('fs')
const react = require('react')
const reactDomServer = require('react-dom/server')
const reactRouter = require('react-router')

const renderToString = reactDomServer.renderToString
const match = reactRouter.match
const RouterContext = reactRouter.RouterContext

const routes = require('./src/components/app').default()




//database url
mongoose.connect('mongodb://localhost/poetic');

app.server = http.createServer(app)
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


app.get('/api/business', function(req,res){
    Business.find({}, function(err, businesses){
        if (err){
            console.log(err);
        } else{
            res.json(businesses)
        }
    })
});

app.get('/api/business/:businessId', function(req,res){
    Business.findById(req.params.businessId, function(err, business){
        if (err){
            console.log(err);
        } else{
            res.json(business)
        }
    })
});

app.post('/api/business', function(req,res){
    var name = req.body.name;
    var description = req.body.description;
    var zipcode = req.body.zipcode;
    var rating = req.body.rating;

    var newBusiness = {name:name,description:description,zipcode:zipcode,rating:rating};

    Business.create(newBusiness, function(err, createdBusiness){
        if (err){
            console.log(err)
        } else{
            res.json(createdBusiness)
        }
    });
});

app.post('/api/business/:businessId/rating', function(req,res){
    var name = req.body.name;
    var rating = req.body.rating;
    var newRating = {name:name, rating:rating};
    
    Business.findById(req.params.businessId, function(err,foundBusiness){
        if(err){
            console.log(err)
        }else{
            Rating.create(newRating, function(err, registeredRating){
                if(err){
                    console.log(err)
                }else{
                    registeredRating.save();
                    foundBusiness.ratings.push(registeredRating);
                    foundBusiness.save();
                    res.json(registeredRating);
                }
            })
        }
    });
});


app.get('*', (req, res) => {
    
      const error = () => res.status(404).send('404')
      const htmlFilePath = path.join( __dirname, './build', 'index.html' )
    
      fs.readFile( htmlFilePath, 'utf8', (err, htmlData) => {
        if(err) {
          error()
        }
        else {
          match({ routes, location: req.url }, (err, redirect, ssrData) => {
            if(err) {
              error()
            }
            else if(redirect) {
              res.redirect(302, redirect.pathname + redirect.search)
            }
            else if(ssrData) {
              const ReactApp = renderToString( react.createElement(RouterContext, ssrData) )
              const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
              res.status(200).send(RenderedApp)
            }
            else {
              error()
            }
          })
        }
      })
    })







app.listen(3000);