// src/components/Hero.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';
import heroCar from '../assets/images/hero-car.png';

// GSAP is registered once in App.js, so we don't register here

const Hero = () => {
  const heroRef = useRef(null);
  const carWrapperRef = useRef(null);
  const carImageRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    if (
      !heroRef.current ||
      !carWrapperRef.current ||
      !carImageRef.current ||
      !headingRef.current ||
      !subtitleRef.current ||
      !descriptionRef.current ||
      !buttonsRef.current ||
      !contentWrapperRef.current
    ) {
      return;
    }

    const isMobile = window.innerWidth <= 767;
    const isTablet = window.innerWidth <= 1023 && window.innerWidth > 767;

    // Initial states
    gsap.set(carImageRef.current, {
      scale: isMobile ? 1.3 : 1.6,
      opacity: 1,
      y: '0%',
      x: '0%',
    });

    gsap.set(carWrapperRef.current, {
      opacity: 1,
      y: 0,
      x: 0,
    });

    gsap.set(contentWrapperRef.current, {
      opacity: 0,
      autoAlpha: 0,
    });
    gsap.set(headingRef.current, {
      opacity: 0,
      y: isMobile ? 40 : 80,
      autoAlpha: 0,
    });
    gsap.set(subtitleRef.current, {
      opacity: 0,
      y: isMobile ? 30 : 60,
      autoAlpha: 0,
    });
    gsap.set(descriptionRef.current, {
      opacity: 0,
      y: isMobile ? 25 : 50,
      autoAlpha: 0,
    });
    gsap.set(buttonsRef.current, {
      opacity: 0,
      y: isMobile ? 20 : 40,
      autoAlpha: 0,
    });
    gsap.set(scrollIndicatorRef.current, {
      opacity: 1,
    });

    const carY = isMobile ? '-5%' : isTablet ? '-8%' : '-10%';
    const carX = isMobile ? '3%' : isTablet ? '10%' : '18%';
    const carScale = isMobile ? 0.9 : isTablet ? 0.8 : 0.75;

    // MAIN TIMELINE - FIXED: Extended end for more scroll distance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=180%', // Extended for more scroll distance
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        markers: false,
      },
    });

    // PHASE 1: Car moves + content appears
    tl.to(
      carWrapperRef.current,
      {
        y: carY,
        x: carX,
        duration: 2.5,
        ease: 'power3.inOut',
      },
      0
    );

    tl.to(
      carImageRef.current,
      {
        scale: carScale,
        duration: 2.5,
        ease: 'power3.inOut',
      },
      0
    );

    tl.to(
      contentWrapperRef.current,
      {
        opacity: 1,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      },
      '-=1.5'
    );

    tl.to(
      headingRef.current,
      {
        opacity: 1,
        y: 0,
        autoAlpha: 1,
        duration: 1.4,
        ease: 'power3.out',
      },
      '-=0.8'
    );

    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.6'
    );

    tl.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        autoAlpha: 1,
        duration: 1.0,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    tl.to(
      buttonsRef.current,
      {
        opacity: 1,
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    tl.to(
      scrollIndicatorRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '-=0.2'
    );

    // PHASE 2: Soft pause
    tl.to({}, { duration: 1.8, ease: 'none' }, '-=0.3');

    // PHASE 3: Final subtle car movement
    tl.to(
      carWrapperRef.current,
      {
        x: isMobile ? '6%' : isTablet ? '14%' : '22%',
        duration: 1.5,
        ease: 'power2.inOut',
      },
      '+=0.5'
    );

    tl.to(
      carImageRef.current,
      {
        scale: isMobile ? 0.8 : isTablet ? 0.7 : 0.65,
        duration: 1.5,
        ease: 'power2.inOut',
      },
      '-=1.5'
    );

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup - No killing of all ScrollTriggers here
    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="hero-bg">
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="car-wrapper" ref={carWrapperRef}>
        <div className="car-container" ref={carImageRef}>
          <img
            src={heroCar}
            alt="Luxury Sports Car"
            className="car-image"
            loading="eager"
            draggable="false"
          />
        </div>
      </div>

      <div className="hero-content">
        <div className="content-wrapper" ref={contentWrapperRef}>
          <h1 className="hero-heading" ref={headingRef}>
            FIND YOUR
            <span className="hero-highlight">DREAM CAR</span>
          </h1>

          <p className="hero-subtitle" ref={subtitleRef}>
            Luxury Performance Collection
          </p>

          <p className="hero-description" ref={descriptionRef}>
            Experience the pinnacle of automotive engineering where
            performance meets artistry in perfect harmony
          </p>

          <div className="hero-buttons" ref={buttonsRef}>
            <button className="btn-primary-glass">
              <span>Explore Cars</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn-secondary-glass">
              <span>Contact</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollIndicatorRef}>
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;