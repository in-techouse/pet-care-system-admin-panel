var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.get("/", function(req, res) {
  res.render("pages/index");
});

router.get("/addFood", function(req, res) {
  res.render("pages/addFood");
});

router.post("/addFood", function(req, res) {
  // res.render("pages/addFood")
  // res.json(req.body);
  let id = firebase
    .database()
    .ref()
    .child("Foods")
    .push().key;
  let food = {
    id: id,
    name: req.body.foodName,
    quantity: req.body.foodQuantity,
    type: req.body.foodType,
    price: req.body.foodPrice
  };
  firebase
    .database()
    .ref()
    .child("Foods")
    .child(food.id)
    .set(food)
    .then(d => {
      res.redirect("/admin/allFoods");
    })
    .catch(er => {
      res.render("pages/addFood");
    });
});

router.get("/allFoods", function(req, res) {
  firebase
    .database()
    .ref()
    .child("Foods")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/allFoods", { data: d });
    })
    .catch(e => {
      res.render("pages/allFoods", { data: [] });
    });
});

router.get("/editfood", function(req, res) {

  let id = 0;
  let d = [];
  id = req.query.id;
  firebase.database().ref().child('Foods').child(id).once('value')
  .then(data=>{
    d = data;
    res.render("pages/editfood", {d : d});
  })
  .catch(eror=>{
    res.json(error);
  })

});

router.post("/editfood", function(req,res){

  let food = {
    id: req.body.id,
    name: req.body.foodName,
    quantity: req.body.foodQuantity,
    type: req.body.foodType,
    price: req.body.foodPrice
  };

  firebase
    .database()
    .ref()
    .child("Foods")
    .child(food.id)
    .set(food)
    .then(function() {
      res.redirect("/admin/allFoods");
    })
    .catch(er => {
      res.render("pages/addFood");
    });
});

router.get("/fooddetail", function(req, res) {
  let id = 0;
  let d = [];
  id = req.query.id;
  firebase.database().ref().child('Foods').child(id).once('value')
  .then(data=>{
    d = data;
    // res.json(d);
    res.render("pages/foodDetail", {d : d});
  })
  .catch(eror=>{
    res.json(error);
  })
});

router.get("/allOrders", function(req, res) {
  res.render("pages/allOrders");
});

router.get("/orderDetail", function(req, res) {
  res.render("pages/orderDetail");
});

router.get("/allAppointments", function(req, res) {
  res.render("pages/allAppointments");
});

router.get("/appointmentDetails", function(req, res) {
  res.render("pages/appointmentDetails");
});

router.get("/allusers", function(req,res){

  firebase
    .database()
    .ref()
    .child("Users")
    .orderByKey()
    .once("value")
    .then(d => {
      // res.json(d);
      res.render("pages/allusers", { d : d });
    })
    .catch(e => {
      res.render("pages/allusers", { data: [] });
    });

});


router.get("/addClinic", function(req, res) {
  res.render("pages/addClinic");
});

router.post("/addClinic", function(req, res) {
  // res.render("pages/addClinic")
  // res.json(req.body);
  let id = firebase
    .database()
    .ref()
    .child("Clinics")
    .push().key;
  let clinic = {
    id: id,
    name: req.body.clinicName,
    address: req.body.clinicAddress,
    startTiming: req.body.clinicStartTimings,
    endTiming: req.body.clinicEndTimings,
    fee: req.body.clinicFee,
    number: req.body.clinicPhoneNumber
  };
  firebase
  .database()
  .ref()
  .child("Clinics")
  .child(clinic.id)
  .set(clinic)
  .then(d => {
    res.redirect("/admin/allClinics");
  })
  .catch(er => {
    res.render("pages/addClinc");
  });
});

router.get("/allClinics", function(req, res) {
firebase
  .database()
  .ref()
  .child("Clinics")
  .orderByKey()
  .once("value")
  .then(d => {
    res.render("pages/allClinics", { data: d });
  })
  .catch(e => {
    res.render("pages/allClinics", { data: [] });
  });
});

module.exports = router;