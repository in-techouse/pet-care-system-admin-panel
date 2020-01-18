var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/', function(req,res){
  res.render("pages/index") 
});

router.get('/addFood', function(req,res){
    res.render("pages/addFood") 
  });

  router.post('/addFood', function(req,res){
   // res.render("pages/addFood")
   // res.json(req.body); 
   let id = firebase.database().ref().child("Foods").push().key
   let food={
       id: id,
       name: req.body.foodName,
       quantity: req.body.foodQuantity,
       type: req.body.foodType,
       price: req.body.foodPrice,

   };
  });  

  router.get('/allFoods', function(req,res){
    res.render("pages/allFoods") 
  });

  router.get('/foodDetail', function(req,res){
    res.render("pages/foodDetail") 
  });

  router.get('/allOrders', function(req,res){
    res.render("pages/allOrders") 
  });

  router.get('/orderDetail', function(req,res){
    res.render("pages/orderDetail") 
  });

  router.get('/allAppointments', function(req,res){
    res.render("pages/allAppointments") 
  });

  router.get('/appointmentDetails', function(req,res){
    res.render("pages/appointmentDetails") 
  });

module.exports = router;