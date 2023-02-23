$(document).ready(function() {
  // Initialize the PubNub API connection.
  var pubnub = PUBNUB.init({
    publish_key: 'pub-c-4a0e7d18-a6fa-4ff8-b7cd-11eba926c6c1',
    subscribe_key: 'sub-c-2c34974e-7be0-4cb6-83f3-fbc7d7e1be0a'
  });

  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
    sendMessageButton = $('#sendMessageButton'),
    messageList = $('#messageList');

  // Handles all the messages coming in from pubnub.subscribe.
  function handleMessage(message) {
    var messageEl = $("<li class='message'>" +
      "<span class='username'>" + message.username + ": </span>" +
      message.text +
      "</li>");
    messageList.append(messageEl);
    messageList.listview('refresh');

    // Scroll to bottom of page
    //$("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
  };

  // Compose and send a message when the user clicks our send message button.
  sendMessageButton.click(function(event) {
    var message = messageContent.val();

    if (message != '') {
      pubnub.publish({
        channel: 'chat',
        message: {
          username: 'test',
          text: message
        }
      });

      messageContent.val("");
    }
  });

  // Also send a message when the user hits the enter button in the text area.
  messageContent.bind('keydown', function(event) {
    if ((event.keyCode || event.charCode) !== 13) return true;
    sendMessageButton.click();
    return false;
  });

  // Subscribe to messages coming in from the channel.
  pubnub.subscribe({
    channel: 'chat',
    message: handleMessage
  });
});

function gridmaker() {
  for (var i = 0; i < crossword.length; i++) {

     if (i != 0) $("#grid").append("<br>"); //$("#grid").append(i + 1  + " ")} else { $("#grid").append(i + 1 + " ")}

     for (var j = 0; j < crossword[i].length; j++) {
    //if (i == 0 && numbered ==false) {
    /*for (var x = 0; x < crossword[i].length; x++) {
              $("#grid").append(x + 1  + " ");
        numbered = true;
    }*/
    $("#grid").append("<br>");
    if (crossword[i][j] != 0) {
      idnum++;
      $("#grid").append("<input onkeyup='keyCode(event)' class='buttons001' type='text' id='names001' maxlength='1'/>");
      //document.getElementById('names001').placeholder = idnum;
      document.getElementById('names001').id = 'names00' + idnum;
      totalLetters++;
      //square[i][j] = crossword[i][j];
    } else {
      idnum++;
      $("#grid").append("<input onkeyup='keyCode(event)' class = 'buttons002' disabled='disabled' id='names001' maxlength = '1>");
      document.getElementById('names001').id = 'names00' + idnum;
    }
  }
}
$("#numCorrect").append(correct);
$("#totalLetters").append(totalLetters);

}
$(document).ready(function() {
  gridmaker();
});
var crossword = [
  [0, 0, "n", "e", "w", 0, 0, 0],
  ["e", "c", "o", "l", "e", 0, 0, 0],
  ["b", "o", "i", "s", "e", 0, 0, 0],
  ["b", "u", "s", "e", "d", 0, 0, 0],
  ["s", "p", "y", 0, 0, 0, 0, 0]
];
var square = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

var idnum = 0;
var totalLetters = 0;
var correct = 0;
var numbered = false;

function gridmaker() {
  for (var i = 0; i < crossword.length; i++) {

    if (i != 0) $("#grid").append("<br>"); //$("#grid").append(i + 1  + " ")} else { $("#grid").append(i + 1 + " ")}

    for (var j = 0; j < crossword[i].length; j++) {
      //if (i == 0 && numbered == false) {
       /* for (var x = 0; x < crossword[i].length; x++) {
          $("#grid").append(x + 1 + " ");
          numbered = true;
        }*/
       // $("#grid").append("<br>");
        if (crossword[i][j] != 0) {
          idnum++;
          $("#grid").append("<input onkeyup='keyCode(event)' class='buttons001' type='text' id='names001' maxlength='1'/>");
          //document.getElementById('names001').placeholder = idnum;
          document.getElementById('names001').id = 'names00' + idnum;
          totalLetters++;
          //square[i][j] = crossword[i][j];
        } else {
          idnum++;
          $("#grid").append("<input onkeyup='keyCode(event)' class = 'buttons002' disabled='disabled' id='names001' maxlength='1'/>");
          document.getElementById('names001').id = 'names00' + idnum;
        }
      }
    }
    $("#numCorrect").append(correct);
    $("#totalLetters").append(totalLetters);

  }

  function keyCode(event) {
    // check if j = 4 at i = 0 (input coordinates) is equal to the letter input.
    // if not we highlight the square red
    var numx = 0;
    var numy = 0;
    let idName = event.target.id;

    numx = idName.substring(idName.length - 1, idName.length) - 2;
    if (idName.length > 7) {
      numy = Math.trunc((idName.substring(idName.length - 2, idName.length) - 2) / 8);
      numx = idName.substring(idName.length - 2, idName.length) - 2 - (numy * 8);
    } else {
      numy = Math.trunc((idName.substring(idName.length - 1, idName.length) - 2) / 8);
    }
    console.log("numx: " + numx);
    console.log("numy: " + numy);

    //console.log(idName.substring(idName.length-1,idName.length) - 2);
    square[numy][numx] = document.getElementById(idName).value;

    var b = event.keyCode;
    //var back = "background-color"
    if (square[numy][numx].toUpperCase() == crossword[numy][numx].toUpperCase()) {
      document.getElementById(idName).style.backgroundColor = "lightblue";
      correct++;
      $("#numCorrect").empty();
      $("#numCorrect").append(correct);
      console.log("Success!");
      document.getElementById(idName).disabled = "disabled";
      if (correct == totalLetters) {
        alert("Congratulations on completing the Crossword!!!");
      }
    } else {
      document.getElementById(idName).style.backgroundColor = "red";
    }
  }