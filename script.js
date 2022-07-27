const gameContainer = document.getElementById("game");
const feedBack = document.getElementById("feedback");
const attempt = document.getElementById("attemps");



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add('blank');
    newDiv.classList.add(color);
    

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
 // new variable to store all divs
const blocks = document.querySelectorAll('div')
// new array that will hold the value hidden behind each collection
let newArr = []
let tries = 0

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // if you click on a blank tile, it will turn off the class blank which just shows a black tile. Each tile has two classes so we will console log the remaining class to see what color we chose. Then we push that color into the new array
  if (event.target.classList.contains('blank')===true){
    event.target.classList.toggle('blank')
    console.log(event.target.className)
    newArr.push(event.target.className)
  }

  // Once we have 2 colors pushed into our new array, we will begin to compare the value. If they match, the classes stay the way they are 
  if (newArr.length == 2){
    if(newArr[0]==newArr[1]){
      feedBack.value = 'Match'
      newArr.splice(0,2)
      tries ++
      attempt.value = tries
    }
    // if they don't match, we have to retuen both of them back to blank. Since the class names are saved in the new array, we can search the document for the class names and save to the variable. att1 will be something like [blue blank.blue] since there are 2 tiles that have the class blue, the one we clicked on which is just blue and the tile still face down which is blank.blue and we want to select the one that has a class of blue. So we loop over that array until we find an element inside that doesn't contain blank, and run the funciton flip() on it which will toggle blank and turn it black. 
    else{
      let att1 = document.getElementsByClassName(newArr[0])
      let att2 = document.getElementsByClassName(newArr[1])
      stopClicks() // stops clicks on gameContainer 
      setTimeout(resumeClicks,1000) // Resumes clicks after 1s which is also the delay for the tiles to turn blank again
      for(let i =0; i <2; i++){
        if(att1[i].classList.contains('blank')==false){
          setTimeout(flip,1000,att1[i])

        }
      }
      for(let i =0; i <2; i++){
        if(att2[i].classList.contains('blank')==false){
          setTimeout(flip,1000,att2[i])
        }
      }
      newArr.splice(0,2)
      feedBack.value = 'Try Again'
      tries ++
      attempt.value = tries
    }
  
}
}

function flip(event) {
  event.classList.toggle('blank')
}

function stopClicks(){
  console.log('no more clicks')
  gameContainer.classList.toggle('preventClick')
}

function resumeClicks(){
  console.log('okay resume clicks')
  gameContainer.classList.toggle('preventClick')
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */