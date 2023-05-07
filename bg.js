let particles = [];
let numParticles = 500;

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("sketch-container");
  noStroke();
  colorMode(HSB, 360, 100, 100, 1);
  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle();
  }
  setInterval(createParticles, 99999); //每秒触发3次
  createParticles();
}

function createParticles() {
  for (let i = 0; i < numParticles; i++) {
    particles[i].activate(random(width), random(height));
  }
}

function draw() {
  background(0, 0, 0.1, 1);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.target = createVector(0, 0);
    this.maxSpeed = random(0.2, 0.5);
    this.maxForce = random(0.05, 0.2);
    this.hue = random(0, 360);
    this.saturation = random(50, 100);
    this.brightness = random(50, 100);
    this.alpha = random(0.2, 0.8);
    this.active = false;
  }

  activate(x, y) {
    this.pos.set(x, y);
    this.active = true;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steering = p5.Vector.sub(desired, this.vel);
    steering.limit(this.maxForce);
    this.applyForce(steering);
  }

  update() {
    if (this.active) {
      let target = createVector(width / 2, height / 2); // 屏幕中心点
      let desired = p5.Vector.sub(target, this.pos); // 粒子位置与屏幕中心的差向量
      this.seek(desired);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
      if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
        this.active = false;
      }
    }
  }
  

  draw() {
    if (this.active) {
      fill(this.hue, this.saturation, this.brightness, this.alpha);
      ellipse(this.pos.x, this.pos.y, 7);
    }
  }
}

function mouseClicked() {
  createParticles();
}
