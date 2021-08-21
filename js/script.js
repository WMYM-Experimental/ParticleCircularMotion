const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let middleX = canvas.width / 2;
let middleY = canvas.height / 2;

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

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
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
    this.radians = getRandomNumber(0, 2 * Math.PI);
    this.speed = 0.05;
    this.locationFromCenter = {
      x: getRandomInt(1, 4) * 1.5,
      y: getRandomInt(1, 4) * 1.5,
    };
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

  updateW() {
    this.radians += this.speed + 0.01;
    this.x += Math.cos(this.radians) * 1.5;
    this.y += Math.sin(this.radians) * 1.5;
    this.draw();
  }
  updateXl() {
    this.radians += this.speed;
    this.x += Math.cos(this.radians) * this.locationFromCenter.x;
    this.y += Math.sin(this.radians) * this.locationFromCenter.y;
    this.draw();
  }
  updateXr() {
    this.radians += this.speed;
    this.x += Math.cos(this.radians) * this.locationFromCenter.x;
    this.y -= Math.sin(this.radians) * this.locationFromCenter.y;
    this.draw();
  }
}

// Implementation
let particlesW, particlesX;
function init() {
  particlesW = [];
  particlesXl = [];
  particlesXr = [];
  for (let i = 0; i < getRandomInt(5, 10); i++) {
    particlesW.push(new Particle(middleX, middleY, 1.5, "#ffffff"));
  }

  for (let i = 0; i < 30; i++) {
    particlesXl.push(
      new Particle(
        middleX,
        middleY,
        getRandomNumber(1, 2),
        getRandomColor(colors)
      )
    );
    particlesXr.push(
      new Particle(
        middleX,
        middleY,
        getRandomNumber(1, 2),
        getRandomColor(colors)
      )
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillstyle = `rgba(255,255,255,0.1)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  particlesW.forEach((ptclw) => {
    ptclw.updateW(); //animation of every "particle (ptcl) in the particlesArray"
  });

  particlesXl.forEach((ptclXl) => {
    ptclXl.updateXl(); //animation of every "particle (ptcl) in the particlesArray"
  });
  particlesXr.forEach((ptclXr) => {
    ptclXr.updateXr(); //animation of every "particle (ptcl) in the particlesArray"
  });
  ctx.restore();
}

init();
animate();
