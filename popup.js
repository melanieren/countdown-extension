var myForm = document.getElementById("newEventForm");
var createEventBtn = document.getElementById("createEvent");
var submitBtn = document.getElementById("add");
var hideBtn = document.getElementById("hide");
var clearBtn = document.getElementById("clear");

createEventBtn.onclick = function showForm() {
  myForm.style.display = 'block';
  submitBtn.style.display = 'inline';
  hideBtn.style.display = 'inline';
  clearBtn.style.display = 'inline';
  createEventBtn.style.display = 'none';
}

hideBtn.onclick = function hideForm() {
  myForm.style.display = 'none';
  submitBtn.style.display = 'none';
  hideBtn.style.display = 'none';
  clearBtn.style.display = 'none';
  createEventBtn.style.display = 'block';
}

clearBtn.onclick = function clearForm() {
  myForm.reset();
}

document.getElementById("add").onclick = function() {
  var eventLine = document.createElement("p");
  var timerLine = document.createElement("p");
  var text = document.getElementById("evName").value;

  var hourInDay = 24;
  var minInHour = 60;
  var secInMin = 60;
  var millisecInSec = 1000;

  var countDownDate = document.getElementById("evDate").value;
  var countDownTime = Date.parse(countDownDate);
  var offset = new Date().getTimezoneOffset();
  var eventTime = document.getElementById("evTime").value;
  var timeSplit = eventTime.split(":");
  var timeMillisec = (timeSplit[0] * minInHour * secInMin * millisecInSec) + (timeSplit[1] * secInMin * millisecInSec);

  var now = new Date().getTime(); 
  var distance = countDownTime - now + (offset * secInMin * millisecInSec) + timeMillisec; 

  // Check for valid inputs

  if (text === "") { 
    document.getElementById("err").innerHTML = "Please enter a valid event name!";  
  } else if (distance < 0) { 
    document.getElementById("err").innerHTML = "The date entered is in the past. Please enter a date and time in the future!";
    return;
  } else if (isNaN(distance)) {
    document.getElementById("err").innerHTML = "Please enter a valid date and time!";
    return;
  } else {
    // Create the countdown timer

    var timer = setInterval(function() {
      var now = new Date().getTime(); 
      var distance = countDownTime - now + (offset * secInMin * millisecInSec) + timeMillisec; 

      if (distance <= 0) {
        clearInterval(timer);
        eventLine.innerHTML = "<li>" + text + ":" + "</li>";
        timerLine.innerHTML = "Made it!";
        return;
      } else {
        eventLine.innerHTML = "<li>" + text + ":" + "</li>";
        var days = Math.floor(distance / (hourInDay * minInHour * secInMin * millisecInSec));
        var hours = Math.floor((distance % (hourInDay * minInHour * secInMin * millisecInSec)) / (minInHour * secInMin * millisecInSec));
        var minutes = Math.floor((distance % (minInHour * secInMin * millisecInSec)) / (secInMin * millisecInSec));
        var seconds = Math.floor((distance % (secInMin * millisecInSec)) / millisecInSec);
        timerLine.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      }
    }, 1000);

    // Add new event to list

    document.getElementById("eventList").appendChild(eventLine);
    document.getElementById("eventList").appendChild(timerLine);
    document.getElementById("err").innerHTML = "";  
    document.getElementById("emptyList").innerHTML = "";  

    // Hide form

    myForm.style.display = 'none';
    submitBtn.style.display = 'none';
    hideBtn.style.display = 'none';
    clearBtn.style.display = 'none';
    createEventBtn.style.display = 'block';
    myForm.reset();
  }
};
