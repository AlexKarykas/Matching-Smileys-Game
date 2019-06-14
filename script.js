//Variable declarations
var numberOfFaces, theLeftSide, theRightSide, theBody, lvl, lvlAudio, gameOverAudio;
lvl = 1;
numberOfFaces = 5;
//Set the element in which the face will be generated
theLeftSide = document.getElementById("leftSide");
theRightSide = document.getElementById("rightSide");
theBody = document.getElementsByTagName("body")[0];
//Audio Elements
lvlAudio = document.getElementById("lvlaudio");
gameOverAudio = document.getElementById("gameOverAudio");

generateFaces(numberOfFaces, theLeftSide);
copyToRightSide();

function generateFaces(faces, leftSideImg) {

    var face, topRandNum, leftRandNum;

    for (var i = 1; i <= faces; i++) {
        //Create an image object
        face = document.createElement("IMG");
        //Create 2 random numbers for the top and left position of the faces
        topRandNum = Math.floor(Math.random() * 400);
        leftRandNum = Math.floor(Math.random() * 400);
        //Set the source of the image
        face.src = "smiley100.png";
        //Set the position of the image
        face.style.position = "relative";
        face.style.top = topRandNum + "px";
        face.style.left = leftRandNum = "px";

        //Add the image on the screen
        leftSideImg.appendChild(face);
    }
}


//Function that copies the images to the right side
function copyToRightSide() {
    //Copy the left side images
    var leftSideImages = theLeftSide.cloneNode(true);
    //Remove the last image generated
    leftSideImages.removeChild(leftSideImages.lastChild);
    //Add images to the right side
    theRightSide.appendChild(leftSideImages);
}

//Click event that goes to the next level
theLeftSide.lastChild.addEventListener("click", nextLevel);

//Function that excecutes when the click event is fired
function nextLevel(event) {
    //Delete all the previous faces
    while (theLeftSide.firstChild) {
        theLeftSide.removeChild(theLeftSide.firstChild);
    }
    while (theRightSide.firstChild) {
        theRightSide.removeChild(theRightSide.firstChild);
    }
    //Generate new faces
    event.stopPropagation();
    lvl++;
    numberOfFaces += 1;
    generateFaces(numberOfFaces, theLeftSide);
    copyToRightSide();
    //Play sound each time the right face is clicked
    lvlAudio.play();
    //Display the current level on the page
    document.getElementById("level").innerHTML = "LEVEL " + lvl;
    theLeftSide.lastChild.addEventListener("click", nextLevel);
};


//Add a Game over message when the user does not click on the right face
theBody.onclick = function gameOver() {
    //Play game over sound
    gameOverAudio.play();
    alert(`Game Over! You reached level ${lvl}!`);
    //making sure nothing happens after the game over 
    theBody.onclick = null;
    theLeftSide.lastChild.onclick = null;
};