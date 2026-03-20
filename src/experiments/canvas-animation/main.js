const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const PARTICLE_COUNT = 120;
const PARTICLE_RADIUS = 2.5;
const MAX_SPEED = 1.5;
const MOUSE_RADIUS = 150;
const MOUSE_FORCE = 0.08;

let width, height;
let mouse = { x: -1000, y: -1000 };

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * (width || window.innerWidth);
    this.y = Math.random() * (height || window.innerHeight);
    this.vx = (Math.random() - 0.5) * MAX_SPEED * 2;
    this.vy = (Math.random() - 0.5) * MAX_SPEED * 2;
    this.hue = Math.random() * 60 + 340; // reds/pinks matching the site theme
  }

  update() {
    // Mouse attraction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MOUSE_RADIUS && dist > 0) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      this.vx += (dx / dist) * force;
      this.vy += (dy / dist) * force;
    }

    // Clamp speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > MAX_SPEED) {
      this.vx = (this.vx / speed) * MAX_SPEED;
      this.vy = (this.vy / speed) * MAX_SPEED;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < PARTICLE_RADIUS) { this.x = PARTICLE_RADIUS; this.vx *= -1; }
    if (this.x > width - PARTICLE_RADIUS) { this.x = width - PARTICLE_RADIUS; this.vx *= -1; }
    if (this.y < PARTICLE_RADIUS) { this.y = PARTICLE_RADIUS; this.vy *= -1; }
    if (this.y > height - PARTICLE_RADIUS) { this.y = height - PARTICLE_RADIUS; this.vy *= -1; }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, PARTICLE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, 0.9)`;
    ctx.fill();
  }
}

resize();
const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

function drawConnections() {
  const CONNECTION_DIST = 100;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * 0.2;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(233, 69, 96, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  drawConnections();
  for (const p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}

// Events
window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
}, { passive: true });

window.addEventListener('mouseleave', () => {
  mouse.x = -1000;
  mouse.y = -1000;
});

animate();
