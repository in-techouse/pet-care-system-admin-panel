// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCALyhxOfDWrAoZ_PD6NmNBJY235kRAM_I",
  authDomain: "pet-care-system-40fb6.firebaseapp.com",
  databaseURL: "https://pet-care-system-40fb6.firebaseio.com",
  projectId: "pet-care-system-40fb6",
  storageBucket: "pet-care-system-40fb6.appspot.com",
  messagingSenderId: "1052240541173",
  appId: "1:1052240541173:web:d8160d0b0cd31c29129cbc",
  measurementId: "G-G9GG9BDRN2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

$(document).ready(function() {
  console.log("Admin Main Doc is ready.");
  loadDashboarData();
  uploadImage();
});

function loadDashboarData() {
  firebase
    .database()
    .ref()
    .child("Users")
    .once("value")
    .then(users => {
      $("#users").html(users.numChildren());
      let doctors = 0;
      users.forEach(u => {
        if (u.val().role === 2) {
          doctors++;
        }
      });
      $("#customers").html(users.numChildren() - doctors);
      $("#doctors").html(doctors);
    });

  firebase
    .database()
    .ref()
    .child("Foods")
    .once("value")
    .then(foods => {
      $("#foods").html(foods.numChildren());
      let stocks = 0;
      foods.forEach(f => {
        stocks = stocks + f.val().quantity;
      });
      $("#stock").html(stocks);
    });
  firebase
    .database()
    .ref()
    .child("Clinics")
    .once("value")
    .then(clinics => {
      $("#clinics").html(clinics.numChildren());
    });
  firebase
    .database()
    .ref()
    .child("Appointments")
    .once("value")
    .then(appointments => {
      $("#appointments").html(appointments.numChildren());
    });
  firebase
    .database()
    .ref()
    .child("Orders")
    .once("value")
    .then(orders => {
      $("#orders").html(orders.numChildren());
    });
}

function uploadImage() {
  $("#upload").click(function() {
    $("#progress").show(100);
    $("#progressBar").html("0%");
    $("#progressBar").css("width", "0%");

    console.log("Image Upload Button Clicked");
    var file = document.getElementById("selectImage").files[0];
    let dateTime = new Date().getTime();
    var fileName = dateTime + file.name;

    var ref = firebase
      .storage()
      .ref("Admins")
      .child("Images")
      .child(fileName);
    var uploadTask = ref.put(file);

    uploadTask.on(
      "state_changed",
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = progress.toFixed(2);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            progress = progress.toFixed(2);
            $("#progressBar").html(progress + "%");
            $("#progressBar").css("width", progress + "%");
            break;
        }
      },
      function(error) {
        $("#progress").hide(100);
        $("#upload").hide(100);
        console.log("Upload Error: ", error);
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          $("#imageURL").val(downloadURL);
          $("#submit").prop("disabled", false);
          setTimeout(function() {
            $("#progress").hide(100);
            $("#upload").hide(100);
          }, 2000);
        });
      }
    );
  });
}
