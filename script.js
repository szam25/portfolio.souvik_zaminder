// Portfolio Navigation and Tab Functionality

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeWorkTabs();
});

// Initialize Navigation
function initializeNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Get the tab name
      const tabName = link.getAttribute('data-tab');
      
      // Remove active class from all links and content
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      // Add active class to clicked link and corresponding content
      link.classList.add('active');
      document.querySelector(`[data-content="${tabName}"]`).classList.add('active');

      // Close hamburger menu
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

// Initialize Work Experience Tabs
function initializeWorkTabs() {
  const workTabBtns = document.querySelectorAll('.work-tab-btn');
  const workContents = document.querySelectorAll('.work-content');

  workTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const company = btn.getAttribute('data-company');

      // Remove active class from all buttons and contents
      workTabBtns.forEach(b => b.classList.remove('active'));
      workContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      btn.classList.add('active');
      document.querySelector(`[data-company="${company}"]`).classList.add('active');
    });
  });
}

// Smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add active class to nav link based on scroll position (optional enhancement)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.tab-content');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('data-content');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-tab') === current) {
      link.classList.add('active');
    }
  });
});
