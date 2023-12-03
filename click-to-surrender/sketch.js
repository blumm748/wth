const imageArray = [
  "img/1x.png",
  "img/2x.png",
  "img/3x.png",
  "img/4x.png",
  "img/1x.png",
];

let wrapper = document.querySelector(".wrapper");
let lastMouseX = 0, lastMouseY = 0;

window.addEventListener("mousemove", function(event){
  let newImg = document.createElement("img");
  newImg.classList.add("flower");
  var random = Math.floor(Math.random() * imageArray.length);
  newImg.src = imageArray[random];
  newImg.style.top = event.pageY - 60 + "px";
  newImg.style.left = event.pageX - 60 + "px";

  // Calculate mouse speed
  let speed = Math.max(Math.abs(lastMouseX - event.pageX), Math.abs(lastMouseY - event.pageY));
  lastMouseX = event.pageX;
  lastMouseY = event.pageY;

  // Set width based on mouse speed
  var randomWidth = Math.min(Math.max(3, speed / 10), 10) + "vw"; // Set a maximum value for the width
  newImg.style.width = randomWidth;

  // Set random rotation
  newImg.style.transform = "rotate(" + Math.random() * 360 + "deg)";

  // Add hover effect
  newImg.style.transition = "transform 0.2s";
  newImg.onmouseover = function() {
    this.style.transform = "scale(1.2) rotate(" + Math.random() * 360 + "deg)";
  };
  newImg.onmouseout = function() {
    this.style.transform = "scale(1) rotate(" + Math.random() * 360 + "deg)";
  };

  wrapper.appendChild(newImg);
});

window.addEventListener("keydown", function(event) {
  if (event.key === 'Backspace' || event.key === 'Delete') {
    clear();
  }
});

function clear() {
  let flowers = document.querySelectorAll('.flower');
  flowers.forEach(function(flower) {
    flower.remove();
  });
}
