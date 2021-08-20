const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let gravity = 1;
let friction = 0.85;
let numberOfParticles = 100;
const colors = [
  "#00b4d8",
  "#219ebc",
  "#2a9d8f",
  "#0077b6",
  "#264653",
  "#b5179e",
  "#ff006e",
  "#bfd200",
  "#ffff3f",
  "#ff006e",
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

function getRandomNumber(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function getRandomColor(colors) {
  return colors[getRandomInt(0, colors.length - 1)];
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
    this.speed = 0.1;
    this.radians = getRandomNumber(0, 2 * Math.PI);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.radians += this.speed;
    this.x += Math.cos(this.radians) * 10;
    this.y += Math.sin(this.radians) * 10;
    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        3,
        getRandomColor(colors)
      )
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(10, 10, 10, 0.1)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  particles.forEach((ptcl) => {
    ptcl.update(); //animation of every "particle (ptcl) in the particlesArray"
  });

  ctx.restore();
}

init();
animate();
