var express = require("express");
var router = express.Router();
var firebase = require("firebase");

router.get("/", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  res.render("pages/admin/index", { action: "dashboard" });
});

router.get("/addFood", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  res.render("pages/admin/addFood", { action: "addFood", d: null });
});

router.post("/addFood", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  let id = firebase
    .database()
    .ref()
    .child("Foods")
    .push().key;
  let food = {
    id: id,
    name: req.body.foodName,
    quantity: parseInt(req.body.foodQuantity),
    type: req.body.foodType,
    price: parseInt(req.body.foodPrice),
    weight: req.body.foodWeight,
    image: req.body.imageURL
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
      res.render("pages/admin/addFood", { action: "addFood", d: null });
    });
});

router.get("/allFoods", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  firebase
    .database()
    .ref()
    .child("Foods")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/admin/allFoods", { data: d, action: "allFood" });
    })
    .catch(e => {
      res.render("pages/admin/allFoods", { data: [], action: "allFood" });
    });
});

router.get("/foodDetail", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  let id = req.query.id;
  firebase
    .database()
    .ref()
    .child("Foods")
    .child(id)
    .once("value")
    .then(data => {
      let d = data;
      res.render("pages/admin/foodDetail", { d: d, action: "foodDetail" });
    })
    .catch(eror => {
      res.redirect("/admin/allFood");
    });
});

router.get("/editFood", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  let id = req.query.id;
  firebase
    .database()
    .ref()
    .child("Foods")
    .child(id)
    .once("value")
    .then(data => {
      let d = data;
      res.render("pages/admin/editFood", { d: d, action: "editFood" });
    })
    .catch(eror => {
      res.redirect("/admin/allFoods");
    });
});

router.post("/editFood", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  let food = {
    id: req.body.id,
    name: req.body.foodName,
    quantity: parseInt(req.body.foodQuantity),
    type: req.body.foodType,
    price: parseInt(req.body.foodPrice),
    weight: req.body.foodWeight,
    image: req.body.imageURL
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
      res.redirect("/admin/allFoods");
    });
});

router.get("/addClinic", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }

  res.render("pages/admin/addClinic", { action: "addClinic", d: null });
});

router.post("/addClinic", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
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
    fee: parseInt(req.body.clinicFee),
    number: req.body.clinicPhoneNumber,
    image: req.body.imageURL
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
      res.render("pages/admin/addClinic", { action: "addClinic", d: null });
    });
});

router.get("/allClinics", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  firebase
    .database()
    .ref()
    .child("Clinics")
    .orderByKey()
    .once("value")
    .then(d => {
      res.render("pages/admin/allClinics", { data: d, action: "allClinics" });
    })
    .catch(e => {
      res.render("pages/admin/allClinics", { data: [], action: "allClinics" });
    });
});

router.get("/clinicDetail", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  firebase
    .database()
    .ref()
    .child("Clinics")
    .child(req.query.id)
    .once("value")
    .then(d => {
      res.render("pages/admin/clinicDetail", { d: d, action: "clinicDetail" });
    })
    .catch(e => {
      res.redirect("/admin/allClinics");
    });
});

router.get("/editClinic", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  firebase
    .database()
    .ref()
    .child("Clinics")
    .child(req.query.id)
    .once("value")
    .then(d => {
      res.render("pages/admin/editClinic", { d: d, action: "editClinic" });
    })
    .catch(e => {
      res.redirect("/admin/allClinics");
    });
});

router.post("/editClinic", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }
  let clinic = {
    id: req.body.id,
    name: req.body.clinicName,
    address: req.body.clinicAddress,
    startTiming: req.body.clinicStartTimings,
    endTiming: req.body.clinicEndTimings,
    fee: parseInt(req.body.clinicFee),
    number: req.body.clinicPhoneNumber,
    image: req.body.imageURL
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
    .catch(e => {
      res.redirect("/admin/allClinics");
    });
});

router.get("/allCustomers", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }

  firebase
    .database()
    .ref()
    .child("Users")
    .orderByChild("role")
    .equalTo(1)
    .once("value")
    .then(d => {
      res.render("pages/admin/allCustomers", {
        d: d,
        action: "allDCCcustomers"
      });
    })
    .catch(e => {
      res.render("pages/admin/allCustomers", {
        d: [],
        action: "allDCCcustomers"
      });
    });
});

router.get("/allDoctors", function(req, res) {
  // if (!req.session.isAdmin) {
  //   res.redirect("/");
  // }

  firebase
    .database()
    .ref()
    .child("Users")
    .orderByChild("role")
    .equalTo(2)
    .once("value")
    .then(d => {
      res.render("pages/admin/allDoctors", { d: d, action: "allDCDoctors" });
    })
    .catch(e => {
      res.render("pages/admin/allDoctors", { d: [], action: "allDCDoctors" });
    });
});
router.get("/allOrders", function(req, res) {
  res.render("pages/admin/allOrders", { action: "allOrders" });
});

router.get("/orderDetail", function(req, res) {
  res.render("pages/admin/orderDetail", { action: "" });
});

router.get("/allAppointments", function(req, res) {
  res.render("pages/admin/allAppointments", { action: "allAppointments" });
});

router.get("/appointmentDetail", function(req, res) {
  res.render("pages/admin/appointmentDetail", { action: "" });
});

module.exports = router;
