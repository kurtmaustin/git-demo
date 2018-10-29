var express = require('express'); //make express available
var app = express(); //invoke express
var server = require('http').Server( app ) // start the express server instance
var io = require('socket.io')(server) // use socket.io for real time connections aka. wesockets

let port = 3000 || process.env.PORT


//serve out any static files in our public HTML folder
app.use(express.static('public'))

//set up some persistant storage of the status of all of the blocks, including thing itself as a string, the uuid, the x & y position.
let storedBlocks = [];

//do something when someone connects to our page.
io.on('connection', function(socket){
  console.log(socket.id); // log out the unique ID of each person who connects

  //send out the stored blocks, right away when someone connects (but only to the person who connected).
  io.to(socket.id).emit('init', storedBlocks)
  console.log(storedBlocks);

  socket.on('sendThing', function(randomThing){
    //do something with the incoming mouse data
    console.log(randomThing);
    //this is an information relay. Get in the data from one client, and then use the server to send it out to all clients . (in a sense 'copying the data to everyone')

      //add the block to the array and store it (the id and the thing string).
      storedBlocks.push(randomThing)
      // for( let block in storedBlocks){ //block representes the index of each block, storedBlocks is an idexed list of all blocks
      //   // console.log("+++++++++: " + storedBlocks[block].id, newData.id);
      //   //look to see if the single block we are looking at is the same as the incoming data (aka. look up the incoming block in the list of all blocks ) <-- this is really only for the init / persistance to set the intial stage.
      //
      //     //when we find the block, update it.
      //     storedBlocks[block].x = randomThing.posx
      //     storedBlocks[block].y = randomThing.posy
      //     // console.log(storedBlocks[block]);
      //     break; //exit the loop and stop checking/updating.
      //   }

    //send the generated Thing that we recieved out to all connected clients
    io.emit('sendThing', randomThing)

  })


  socket.on('boxDrop', function(newData){
    //do something with the incoming mouse data
    console.log(newData);
    //this is an information relay. Get in the data from one client, and then use the server to send it out to all clients . (in a sense 'copying the data to everyone')

    //tick through the stored blocks one by one...
    for( let block in storedBlocks){ //block representes the index of each block, storedBlocks is an idexed list of all blocks
      // console.log("+++++++++: " + storedBlocks[block].id, newData.id);
      //look to see if the single block we are looking at is the same as the incoming data (aka. look up the incoming block in the list of all blocks ) <-- this is really only for the init / persistance to set the intial stage.
      if(storedBlocks[block].id === newData.id ){
        console.log('found it?');
        //when we find the block, update it.
        storedBlocks[block].posx = newData.x
        storedBlocks[block].posy = newData.y
        // console.log(storedBlocks[block]);
        break; //exit the loop and stop checking/updating.
      }
    }

    //send the actual position that we recieved out to all connected clients
    io.emit('boxDropUpdate', newData) //change this...


  })
}); //close socket


// listen for connections to the server :)
var listener = server.listen(port, function() {
  console.log('Your app is listening on port ' + port );
});


// // takes in 4 valuse of 2 points in 2d space and calcualtes the distance between them using tiganometry hypotonuse.
//
// /* you can use this fuynction to RETURN a value in its place
// eg.
// let coolNumber = dis(100,300,200,300)
// cool number will now become the distance between those points)
// */
//
// function dist(x,y,x1,y1) {
//     //subtract the x's from eachother and they's from eachother then calculat ethe hypotonuse
//     return Math.hypot(x1 - x, y1 - y)
// };
