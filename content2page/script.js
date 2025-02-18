// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
  
    const options = {
      root: null,
      threshold: 0.2,
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, options);
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  });
  