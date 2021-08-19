const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let gravity = 1;
let friction = 0.85;
let numberOfParticles = 100;
const colorArray = [
  "#457b9d",
  "#023047",
  "#219ebc",
  "#4895ef",
  "#2a9d8f",
  "#0077b6",
  "#264653",
];

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

//keydown spacebar event
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(colorsArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;
  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.speed = 0.05;
    this.velocity = {
      x: getRandomInt(0, 10),
      y: getRandomInt(0, 10),
    };
    this.radian = getRandomInt(0, 2 * Math.PI);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let particlesArray;
function init() {
  particlesArray = [];
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //refresh canvas
  particlesArray.forEach((ptcl) => {
    ptcl.update(particlesArray); //animation of every "particle (ptcl) in the particlesArray"
  });
}

init();
animate();
