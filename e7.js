const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Shape constructor function
class Shape {
    constructor(x, y, size, alpha, fadeSpeed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.alpha = alpha;
        this.fadeSpeed = fadeSpeed;
        this.growing = true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 165, 0, ${this.alpha})`; // Orange color with alpha
        ctx.fill();
    }

    update() {
        if (this.growing) {
            this.size += 0.5;
            this.alpha += this.fadeSpeed;
            if (this.alpha >= 1) this.growing = false;
        } else {
            this.size -= 0.5;
            this.alpha -= this.fadeSpeed;
            if (this.alpha <= 0) {
                this.alpha = 0;
                this.growing = true; // Restart cycle
            }
        }
        this.draw();
    }
}

// Create multiple shapes
const shapes = [];
for (let i = 0; i < 10; i++) {
    shapes.push(new Shape(
        Math.random() * canvas.width, 
        Math.random() * canvas.height, 
        Math.random() * 20 + 10, 
        Math.random(), 
        0.02
    ));
}

// Animation loop
function animationLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => shape.update());

    requestAnimationFrame(animationLoop);
}

animationLoop();
