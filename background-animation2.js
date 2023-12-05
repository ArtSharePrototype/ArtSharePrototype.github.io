const canvas = document.getElementById('animation-canvas');
const ctx = canvas.getContext('2d');

let gradientShift = 0;

function refreshAnimation() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight+100;

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //generate random particles
  const particles = [];
  const particleCount = 50; // increase the number of particles
  const particleSize = 16;

  for (let i = 0; i < particleCount; i++) {
    const particle = {
      x: i * (canvas.width / particleCount),
      y: canvas.height / 1.5,
      size: Math.random() * particleSize + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      shape: 'circle',
    };

    particles.push(particle);
  }

  //animate
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw partacle
    particles.forEach((particle, index) => {
      //set color
      const gradient = ctx.createLinearGradient(gradientShift, 0, gradientShift + canvas.width, 0);
      gradient.addColorStop(0, '#EDD700');
      gradient.addColorStop(0.5, '#0DDBCF');
      gradient.addColorStop(1, '#EDD700');
      ctx.fillStyle = gradient;

      // draw circle for each particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y + Math.sin((Date.now() + index * 300) / 1000) * 50, particle.size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    });

    // shift gradient
    gradientShift += 1;
    if (gradientShift > canvas.width) {
      gradientShift = -canvas.width;
    }

    //call next frame
    requestAnimationFrame(animate);
  }

  //begin to animate
  animate();
}

refreshAnimation();
window.addEventListener('resize', refreshAnimation);
