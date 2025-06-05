/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // === Dynamic Portfolio Details Logic ===
  if (window.location.pathname.includes('portfolio-details.html')) {
    // Project data
    const projects = {
      'bridgegame': {
        title: 'Bridge Game Mini Project',
        image: 'assets/img/portfolio/bridgegame.jpg',
        description: `<ul><li>Contributed to GitHub management, documentation, and binomial heap extraction.</li><li>Developed UI to enable interaction between different scenes.</li></ul>`,
        tech: 'Python, JavaScript, HTML, CSS',
        live: 'https://bridge-card-game.onrender.com',
        github: 'https://github.com/jayaraman2212066/BRIDGE_CARD_GAME'
      },
      'washwish': {
        title: 'WASH WISH-(W2)',
        image: 'assets/img/portfolio/washwish.png',
        description: `<ul><li>Developed a full-stack web application for managing laundry services, including user registration, service selection, and order tracking. The system streamlines operations for laundry service providers and customers, improving service efficiency and customer experience.</li><li>Key features: secure user sign-up/login, order placement, and real-time tracking. Admins manage users and orders through a dedicated panel. The system uses Django templates, static file handling, and Python-based backend logic, offering a clean, responsive design that works smoothly across devices with well-organized files and user-friendly interfaces.</li></ul>`,
        tech: 'Python, Django, HTML, CSS, JavaScript',
        live: 'https://washwish.web.app',
        backend: 'https://washwish.onrender.com',
        github: 'https://github.com/jayaraman2212066/WASHWISH'
      },
      'co2': {
        title: 'CO2 Emission Detection Using Deeplearning Project',
        image: 'assets/img/portfolio/co2-4767388_1920.jpg',
        description: `<ul><li>Developed and trained a deep learning model for CO concentration classification using time-series sensor data.</li><li>Performed data preprocessing, feature extraction, and model optimization for robust performance. Integrated the model into a Python-based software system for real-time CO level detection. Implemented modular code architecture for scalable and maintainable ML pipelines. Evaluated model accuracy using cross-validation and improved performance through hyperparameter tuning.</li></ul>`,
        tech: 'Python, JavaScript, HTML, CSS',
        live: 'https://co2-emission-detection-auto-generator.onrender.com',
        github: 'https://github.com/jayaraman2212066/CO2_EMISSION_DETECTION_AUTO_GENERATOR_LEVEL'
      },
      'roadanomaly': {
        title: 'ComputerVision-Road Anomaly Detection',
        image: 'assets/img/portfolio/roadanomaly.png',
        description: `<ul><li>GitHub management, documentation, ML model creation, labelling of model images to train.</li><li>Developed UI to enable interaction between different scenes.</li><li>Developed a machine learning-based road anomaly detection system utilizing the YOLOv8 Nano model. The model was trained to identify road surface anomalies such as potholes and speed bumps using a computer vision dataset. Integrated the system with a Flask-based web application for real-time detection. Focused on optimizing detection performance and streamlining the future integration of real-time updates for improved accuracy and efficiency. The project demonstrates proficiency in machine learning, computer vision, and web development.</li></ul>`,
        tech: 'Python, JavaScript, HTML, CSS, Flask',
        live: 'https://computervision-road-anomaly-detection.onrender.com',
        github: 'https://github.com/jayaraman2212066/COMPUTERVISION_ROAD_ANOMALY_DETECTION'
      },
      'snakegame': {
        title: 'DQN-Snake game (Reinforcement Learning)',
        image: 'assets/img/portfolio/snakegame.png',
        description: `<ul><li>Snake Game with Reinforcement Learning — Flutter, Dart. Developed a modular Snake Game in Flutter with both manual and AI gameplay modes. Integrated a Q-learning-based Reinforcement Learning agent to autonomously learn and play the game. Used simplified game state encoding and Q-table updates for real-time decision-making. Implemented persistent high scores and settings using shared_preferences. Focused on clean UI, sound effects, and theme switching for better user experience.</li></ul>`,
        tech: 'Flutter, Dart',
        live: 'https://snakegame-46ec9.web.app',
        github: ''
      }
    };

    // Get project key from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectKey = urlParams.get('project');
    const project = projects[projectKey];

    if (project) {
      // Update image
      const slider = document.querySelector('.portfolio-details-slider .swiper-wrapper');
      if (slider) {
        slider.innerHTML = `<div class='swiper-slide'><img src='${project.image}' alt='${project.title}'></div>`;
      }
      // Update info
      const info = document.querySelector('.portfolio-info');
      if (info) {
        info.innerHTML = `
          <h3>${project.title}</h3>
          <div>${project.description}</div>
          <div style='margin: 20px 0;'>
            ${project.live ? `<a href='${project.live}' target='_blank' class='btn btn-primary me-2 mb-2'>Live Demo</a>` : ''}
            ${project.backend ? `<a href='${project.backend}' target='_blank' class='btn btn-success me-2 mb-2'>Backend Demo</a>` : ''}
            ${project.github ? `<a href='${project.github}' target='_blank' class='btn btn-secondary mb-2'>GitHub</a>` : ''}
          </div>
          <p class='tech-stack'><b>${project.tech}</b></p>
        `;
      }
    } else {
      // Not found
      const info = document.querySelector('.portfolio-info');
      if (info) {
        info.innerHTML = `<h3>Project Not Found</h3><p>The project you are looking for does not exist.</p>`;
      }
    }
  }

  // Background Image Rotation
  const backgroundImages = [
    'assets/img/portfolio_jay.jpg',
    'assets/img/portfolio_jay1.jpg'
  ];

  let currentImageIndex = 0;

  function rotateBackgroundImage() {
    const hero = document.querySelector('.hero');
    if (hero) {
      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
      hero.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
    }
  }

  // Calculate and update age dynamically
  function updateAge() {
    const birthYear = 2003;
    const birthMonth = 3; // March
    const birthDay = 31;
    
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    
    // Check if birthday has occurred this year
    const hasBirthdayOccurred = 
      today.getMonth() > birthMonth - 1 || 
      (today.getMonth() === birthMonth - 1 && today.getDate() >= birthDay);
    
    if (!hasBirthdayOccurred) {
      age--;
    }
    
    const ageElement = document.getElementById('dynamic-age');
    if (ageElement) {
      ageElement.textContent = age;
    }
  }

  // Set up background rotation interval and update age
  document.addEventListener('DOMContentLoaded', function() {
    // Initial setup
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('background-transition');
    }
    
    // Rotate background every 5 seconds
    setInterval(rotateBackgroundImage, 5000);
    
    // Update age
    updateAge();
  });

})();