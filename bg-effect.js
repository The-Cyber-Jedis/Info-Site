// Lightweight void-particle background effect
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const mouseRadius = window.siteConfig?.particles?.mouseRadius || 150;
  let mouse = { x: 0, y: 0, radius: mouseRadius };
  
  // Color palette
  const colors = [
    '#ffbe0b', // Amber Gold
    '#fb5607', // Blaze Orange
    '#ff006e', // Neon Pink
    '#8338ec', // Blue Violet
    '#3a86ff'  // Azure Blue
  ];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 0.5;
      this.drift = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02
      };
      // Assign random color from palette
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      // Mouse interaction
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius;
        this.vx -= (dx / dist) * force * 0.3;
        this.vy -= (dy / dist) * force * 0.3;
      }

      // Continuous gentle drift to keep particles moving
      this.vx += this.drift.x + (Math.random() - 0.5) * 0.05;
      this.vy += this.drift.y + (Math.random() - 0.5) * 0.05;

      // Cap velocity to prevent particles from moving too fast
      const maxSpeed = 1.5;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
      
      // Natural drift
      this.x += this.vx;
      this.y += this.vy;
      
      // Boundary wrap
      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h;
      if (this.y > h) this.y = 0;
      
      // Lighter friction so particles don't slow down as much
      this.vx *= 0.985;
      this.vy *= 0.985;
    }

    draw() {
      // Use particle's assigned color with varying opacity
      ctx.fillStyle = this.color + Math.floor((0.3 + Math.random() * 0.3) * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    resize();
    // Load particle count from config if available
    const particleCount = window.siteConfig?.particles?.count || 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    // Use configurable fade speed (default 0.15 for ~5 second trails)
    const fadeSpeed = window.siteConfig?.particles?.trailFadeSpeed || 0.15;
    ctx.fillStyle = `rgba(255, 255, 255, ${fadeSpeed})`;
    ctx.fillRect(0, 0, w, h);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  init();
  animate();
})();
