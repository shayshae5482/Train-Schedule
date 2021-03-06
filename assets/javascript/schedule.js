
    $(document).ready(function () {

        var time = moment();

        $('#time').html("The current time is: " + moment(time).format("hh:mm"));

    

        var destination
        var firstTrainTime
        var frequency
        var trainName



        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDRNIDzLyEPiiB9Bxpp8xOddhsdvdinlDk",
            authDomain: "test-da62d.firebaseapp.com",
            databaseURL: "https://test-da62d.firebaseio.com",
            projectId: "test-da62d",
            storageBucket: "test-da62d.appspot.com",
            messagingSenderId: "230769758471"
        };
        firebase.initializeApp(config);



        var database = firebase.database()

        // Create a variable to reference the database



        // On click event for submit button
        $("#user-input").on("click", function () {
            // Don't refresh the page!
            event.preventDefault();

            trainName = $("#tname").val().trim();
            destination = $("#des").val().trim();
            firstTrainTime = $("#first-train-time").val().trim();
            frequency = $("#minutes").val().trim();


//create a temp object//
var newTrain = {

    trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency
};

//pushes to Firebase
database.ref().push(newTrain);

console.log(trainName);
console.log(destination);

           

           

        });

        // Add each new entry to the root of the firebase as a function//
        database.ref().on("child_added", function (childSnapshot) {

//make sure code is working correctly
            console.log(childSnapshot.key);

            //new variables to help store new data in the database

            var tname = childSnapshot.val().trainName;
            var destination = childSnapshot.val().destination;
            var frequency = parseInt(childSnapshot.val().frequency);
            var time = parseInt(childSnapshot.val().firstTrainTime);

            //create a new row of inputs in firebase root
            var removeData = "<button class='delete-button' id='removeData' data-delete="+ childSnapshot.key +" value= 'delete'>Delete?</button>"


//Begin the time conversion stuff here!//

            var trainTimeConverted = moment(time, "hh:mm").subtract(1, "years");
            var trainTimeDiff = moment().diff(moment(trainTimeConverted), "minutes");
            //Calculates how often the train arrives

            var timeLeft = trainTimeDiff % frequency;

            var minutesToNxtTrain = frequency - timeLeft;

            var nextTrainMin = moment().add(minutesToNxtTrain, "minutes");
            var nextTrainArrives = moment(nextTrainMin).format("hh:mm");


//Use jquery to add the calculations to the html//

 $('#entry > tbody').append("<tr><td>" + tname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrainArrives + "</td><td>" + minutesToNxtTrain + "</td><td>" + removeData + "</td></tr>");

$(".delete-button").on("click", function () {

 $(this).closest("tr").remove();
var survey = database.ref();
survey.child($(this).attr("data-delete")).remove();

});

});

});   