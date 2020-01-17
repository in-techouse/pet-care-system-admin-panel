var express = require('express');
var router = express.Router();
var firebase = require('firebase');

router.get('/', function(req,res){
  res.render("pages/index") 
});

router.get('/addFood', function(req,res){
    res.render("pages/addFood") 
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