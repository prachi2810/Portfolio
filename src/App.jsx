import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const navRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const burger = burgerRef.current;
    const nav = navRef.current;
    const navLinks = nav.querySelectorAll('li');

    const handleBurgerClick = () => {
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');

      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    };

    burger.addEventListener('click', handleBurgerClick);

    // Smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth',
          });
          // Close mobile nav
          if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => (link.style.animation = ''));
          }
        }
      });
    });

    // Scroll reveal
    const revealOnScroll = () => {
      const sections = document.querySelectorAll('section');
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - revealPoint) {
          section.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // initial

    return () => {
      burger.removeEventListener('click', handleBurgerClick);
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  return (
    <>
      
    </>
  );
}

export default App;
