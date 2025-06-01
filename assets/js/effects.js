// Initialize Three.js scene
let scene, camera, renderer, particles;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('particles-js').appendChild(renderer.domElement);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const particleCount = 2000;

    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * 2000 - 1000;
        const y = Math.random() * 2000 - 1000;
        const z = Math.random() * 2000 - 1000;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 1000;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize GSAP animations
function initAnimations() {
    // Hero section animations
    gsap.from('.hero-content h2', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.hero-content p', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power4.out'
    });

    // Skills animation
    gsap.from('.skill-progress', {
        duration: 1.5,
        width: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.skills',
            start: 'top center'
        }
    });

    // Portfolio items animation
    gsap.from('.portfolio-item', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'top center'
        }
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initAnimations();
}); 