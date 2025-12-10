/**
 * Free-Flow Plumbing Website - Interactive Features
 *
 * This script provides interactivity for:
 * - Mobile navigation menu toggle
 * - FAQ accordion functionality
 * - Smooth scrolling for anchor links
 * - Auto-close mobile menu when clicking links
 */

(function() {
  'use strict';

  /**
   * MOBILE MENU TOGGLE
   * Handles opening/closing the navigation menu on mobile devices
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    if (!menuToggle || !nav) return;

    // Toggle menu when hamburger button is clicked
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('active');

      // Update aria-expanded for accessibility
      const isExpanded = nav.classList.contains('active');
      this.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * FAQ ACCORDION
   * Handles expanding/collapsing FAQ items
   */
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (!faqQuestions.length) return;

    faqQuestions.forEach(function(question) {
      question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items (optional - comment out if you want multiple open at once)
        document.querySelectorAll('.faq-item').forEach(function(item) {
          if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current FAQ item
        faqItem.classList.toggle('active');
        this.setAttribute('aria-expanded', !isActive);
      });

      // Keyboard accessibility - allow Enter and Space to toggle
      question.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          this.click();
        }
      });
    });
  }

  /**
   * SMOOTH SCROLLING
   * Adds smooth scrolling behavior to all anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    if (!anchorLinks.length) return;

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');

        // Don't process empty anchors
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          event.preventDefault();

          // Calculate offset for sticky header
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px extra padding

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL hash without jumping
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }

          // Focus on target element for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
        }
      });
    });
  }

  /**
   * SCROLL TO TOP ON PAGE LOAD
   * Ensures page starts at top when loaded/refreshed
   */
  function scrollToTop() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

  /**
   * HEADER SCROLL EFFECT (Optional)
   * Adds shadow to header when scrolling down
   */
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Add extra shadow when scrolled
      if (scrollTop > 10) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      } else {
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
      }

      lastScrollTop = scrollTop;
    });
  }

  /**
   * INITIALIZE ALL FEATURES
   * Called when DOM is ready
   */
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        scrollToTop();
        initMobileMenu();
        initFAQ();
        initSmoothScroll();
        initHeaderScroll();
      });
    } else {
      // DOM already loaded
      scrollToTop();
      initMobileMenu();
      initFAQ();
      initSmoothScroll();
      initHeaderScroll();
    }
  }

  // Start the application
  init();

})();
