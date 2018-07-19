    
            // firebase things.
    var config = {
        apiKey: "AIzaSyCJmYUctafbIipMb7P2w2koJpsbtZbcdes",
        authDomain: "myfirstdbproject-a54bd.firebaseapp.com",
        databaseURL: "https://myfirstdbproject-a54bd.firebaseio.com",
        projectId: "myfirstdbproject-a54bd",
        storageBucket: "",
        messagingSenderId: "909811177874"
      };
      firebase.initializeApp(config);

  var database = firebase.database();


        // grabbing the inputs and trimming the spacing
  $("#form-submit").on("click", function() {
      event.preventDefault();
      database.ref().push({
          name: $("#train-name").val().trim(),
          destination: $("#destination").val().trim(),
          time: $("#departure-time").val().trim(),
          frequency: $("#frequency").val().trim()
      });
  });


        // 
  database.ref().on("child_added", function(snapshot) {
        
        var trainName = snapshot.val().name;
        var trainDestination = snapshot.val().destination;    
        var trainDisembark = snapshot.val().time;
        var trainMin = snapshot.val().frequency;

            // time converting for when the train left, and when the next one will arrive.
        var timeConvert = moment(trainDisembark, "hh:mm");
        timeMinutes = moment().diff(moment(timeConvert), "minutes");
        remain = timeMinutes % trainMin;
        minUntil = trainMin - remain;
        nextTrain = moment().add(minUntil, "minutes");
        nextTrainFormatted = moment(nextTrain).format("hh:mm A");

        var newRow = 
        $("<tr>").append( 
          $("<td>").text(trainName),            //Train Name
          $("<td>").text(trainDestination),     //Destination
          $("<td>").text(trainMin),             //Frequencey Min
          $("<td>").text(nextTrainFormatted),   //Next Arrival HH:mm
          $("<td>").text(minUntil),            //Min away
        );

    $("table tbody").append(newRow);

        // error handler
  }, function(errorObject) {
      console.log("the read failed: " + errorObject.code);
  });