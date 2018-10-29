var socket = io.connect();

socket.on('connect', function(data){
  console.log("we connected to the server as" + socket.id)

})

//this sets the stage initially when someone connects.
socket.on('init', function(storedBlocks){

  //tick through each block one by one.
  for( let block in storedBlocks){
    console.log(storedBlocks[block]);

    //append each block to the body, move it to it's stored location and make it draggable.
    var $element = $(storedBlocks[block].thing)
    $('body').append($element)

    $element.css({
      "position":"absolute",
      "top":storedBlocks[block].posy,
      "left":storedBlocks[block].posx,
    });

    $element.draggable({
      snap: true,
      containment: "background",
      scroll: false

     });


  } //end the for loop
  $($element).mousedown(function(){
           $('.mycursor').css({
              "background" : "url(images/asset_2.svg) no-repeat left top"
           });
         })

   $($element).mouseup(function(){
            $('.mycursor').css({
              "background" : "url(images/asset_1.svg) no-repeat left top"
                  });
                })
})

$( document ).ready(function(){
     $('message').fadeIn('slow', function(){
        $('message').delay(6000).fadeOut();
     });
 });

 $( "instruc").click(function(){
      $('message').fadeIn('slow', function(){
         $('message').delay(6000).fadeOut();
      });
  });

  $(document).ready(function(){
      	// $('#test-area').mouseout(function(){
        //    	$('#mycursor').hide();
        //    	return >false;
      	// });
      	// $('#test-area').mouseenter(function(){
        //    	$('#mycursor').show();
        //    	return >false;
      	// });
      	$('body').mousemove(function(e){
           	$('.mycursor').css({
              'left' : e.pageX - 14,
              'top' : e.pageY + 1,
              'display' : 'block'
            });
      	});

        $('background, instruc').mousedown(function(e){
           	$('.mycursor').css({
              'background' : 'url(images/asset_3.svg) no-repeat left top'

            });
      	});

        $('background, instruc').mouseup(function(e){
            $('.mycursor').css({
              'background' : 'url(images/asset_1.svg) no-repeat left top'

            });
        });



	});

//GENERATE WHAT THE THING IS GOING OT BE
// collect information about divs that are to be created when button is clicked
$(document).click(function(event){
  if (event.shiftKey) {


// console.log( "pageX: " + event.clientX + ", pageY: " + event.clientY);
// add one to count everytime the button is clicked

//call the guid function at the bottom to generate a 16bit unique indetifier
let uuid = guid()

//create a function which selects a random letter everytime the button is clicked * note: this function takes in an id*
  function getLetter(id) {
    var letter = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789AEIOU&?!";

    for (var i = 0; i < 1; i++)
      letter = possible.charAt(Math.floor(Math.random() * possible.length));

    return '<div id="'+ id +'">'+ '<div2>'+ letter + '</div2>' + '</div>';
  }


//create a function that selects a random image everytime the button is clicked
function getImage(id){
  var description = [
    "images/iso-01.svg",
    "images/iso-02.svg",
    "images/iso-03.svg",
    "images/iso-04.svg",
    "images/iso-05.svg",
    "images/iso-06.svg",
    "images/iso-07.svg",
    "images/iso-08.svg",
    "images/iso-09.svg",
    "images/iso-10.svg",
    "images/iso-11.svg",
    "images/iso-12.svg",
    "images/iso-13.svg",
    "images/iso-14.svg",
    "images/iso-15.svg",
    "images/iso-16.svg",
    "images/iso-17.svg",
    "images/iso-18.svg",
    "images/iso-19.svg",
    "images/iso-20.svg",
    "images/iso-21.svg",
    "images/iso-22.svg",
    "images/iso-23.svg",
    "images/iso-24.svg",
    "images/iso-25.svg",
    "images/iso-26.svg",
    "images/iso-27.svg",
    "images/iso-28.svg",
    "images/iso-29.svg",
    "images/iso-30.svg",
    "images/iso-31.svg",
    "images/iso-32.svg",
    "images/iso-33.svg",
    "images/iso-34.svg",
    "images/iso-35.svg",
    "images/iso-36.svg",
    "images/iso-37.svg",
    "images/iso-38.svg",
    "images/iso-39.svg",
    "images/iso-40.svg",
    "images/iso-41.svg",
    "images/iso-42.svg",
    "images/iso-43.svg",
    "images/iso-44.svg",
    "images/iso-45.svg"



  ];
  var size = description.length
  var x = Math.floor(size*Math.random())
  var randomImage = description[x]

  return '<div id="'+ id +'"><img src="' + randomImage + '"/></div>';
}

//create a function that randomly selects whether to display the random image
//or the random text
function getThing(id){
  var thing = [
    getImage(id),
    getLetter(id)

  ];
  var sizeThing = thing.length
  var thingx = Math.floor(sizeThing*Math.random())
  var randomThing = thing[thingx]

  return randomThing

}
//*note: gets the id from the uuid variable above which stores our guid() *
let randomThing = {
  "id": uuid,
   "thing": getThing(uuid),
   "posx": event.pageX,
   "posy": event.pageY

}
console.log(randomThing)

//send the data up to the server for it to deal with it!
socket.emit('sendThing',randomThing);

  }
});


//APPEND THE INCOMING THING TO THE SCREEN
//wait for incoming message and do something with the data
socket.on("sendThing",function(randomThing){

  //do something with the incoming mouse Data from everyone else.
console.log("it's back", randomThing);
console.log("heres the thing", randomThing.thing);
  //create an element

// count = count + 1;
// abc = abc + 1;

  var $element = $(randomThing.thing);


  //append it to the DOM
  $("body").append($($element).css({
    "position": "absolute",
    "left": randomThing.posx,
    "top": randomThing.posy
  }));

  //make it "draggable"
  $element.draggable({
    snap: true,
    containment: "background",
    scroll: false


  });

  $($element).mousedown(function(){
           $('.mycursor').css({
              "background" : "url(images/asset_2.svg) no-repeat left top"
           });
         })

   $($element).mouseup(function(){
            $('.mycursor').css({
              "background" : "url(images/asset_1.svg) no-repeat left top"
                  });
                })
});

// make the body "droppable"
$('body').droppable({

  activate: function (event, ui) {

//get the id of the draggable that is "activated"
  var draggableId = ui.draggable.attr("id");


//send id to server
  console.log("draggable" + draggableId );
  // socket.emit("idtouse", draggableId)
var $this = $(draggableId);

//get the location of that draggable and send it to the server
$('#'+ draggableId).draggable({
  // get position of the draggable div
  drag: function(event, ui){

      //package up this data, make sure to include the ID so we can cross ref on the server and update the position for the persistance and initilization later on.
      let newData = {
          "id": draggableId,
            "x": ui.position.left,
            "y": ui.position.top,
          }
          console.log( 'Data for' + draggableId + ':' + newData)

          // send data to server
          socket.emit("boxDrop", newData)
        }


})
}

 });
// bring back position

// socket.on("idtouse", function(draggableId){
// });

socket.on("boxDropUpdate",function(newData){
  //do something with the incoming mouse Data from everyone else.

  $('#' + newData.id).css({
    'top': newData.y + "px",
    'left': newData.x + "px"

  });


});




// UUID GENERATOR
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
