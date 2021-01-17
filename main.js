// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'


document.addEventListener("DOMContentLoaded", () => { //add to files to make sure that your DOM has loaded and that your HTML has been parsed. it helps avoid any bugs and errors
  const modal = document.querySelector('#modal')
  const hearts = document.getElementsByClassName("like-glyph")
  //have a collection of hearts
  //now add an event listener to each heart 
  likePost(hearts);

}) 

// Your JavaScript code goes here!

const likePost = (hearts) => {
  for (const heart of hearts){
    heart.addEventListener("click", (e) => {
      //now that we are listening for it 
      //we need to 1. make a server call
      mimicServerCall() //fetch does NOT want the semicolon because it will interrupt the next 2 calls!
      //this will return a promise. promises have the .then() - we use 2 .then()s one is to take the response and jsonify it. the seocnd is to take the jsonified response and do something with it. 
      .then(() => {
      //2. when successful, change the heart
      //3. if its empty, make it full, add new class
      if (heart.innerHTML == EMPTY_HEART){
        heart.innerHTML = FULL_HEART
        heart.className = "activated-heart"
      } else {       
        //4. if its full, make it empty
        heart.innerHTML = EMPTY_HEART
        heart.className = "like-glyph"
      }
      })
      .catch(error => {
        modal.hidden = false
        const modalMessage = document.querySelector("#modal-message")
        modalMessage.innerText = error
        setTimeout(() =>{
          //do this during the timeout 
          modal.hidden = true
        }, 5000)
      })

    })
  }
}


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}


//this is what it looks like when we make fetch requests: 
// fetch()      returns a promise
// .then(response => response.json())     returns another promise
// .then(data => {
    //do something with the data
// })

//you only want to jsonify objects so that is why we do not need the first .then in this lab. structured data will always be represented by an object.