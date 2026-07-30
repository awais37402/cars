// OurProcess.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurProcess.css';

gsap.registerPlugin(ScrollTrigger);

const OurProcess = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);
  const bgGradientRef = useRef(null);
  const parallaxElementsRef = useRef([]);

  const steps = [
    {
      id: '01',
      title: 'Search',
      description: 'Browse our curated collection of luxury vehicles',
      icon: '🔍',
    },
    {
      id: '02',
      title: 'Choose',
      description: 'Select your perfect car with expert guidance',
      icon: '✨',
    },
    {
      id: '03',
      title: 'Test Drive',
      description: 'Experience performance and luxury firsthand',
      icon: '🚗',
    },
    {
      id: '04',
      title: 'Payment',
      description: 'Flexible financing options tailored to you',
      icon: '💳',
    },
    {
      id: '05',
      title: 'Drive',
      description: 'Take delivery and enjoy your dream car',
      icon: '🏆',
    },
  ];

  useEffect(() => {
    const isMobile = window.innerWidth <= 767;
    const isTablet = window.innerWidth <= 1023 && window.innerWidth > 767;

    const ctx = gsap.context(() => {
      // Background parallax - responsive
      if (bgGradientRef.current) {
        const bgY = isMobile ? 40 : isTablet ? 60 : 100;
        const bgScale = isMobile ? 1.05 : isTablet ? 1.08 : 1.1;
        
        gsap.to(bgGradientRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
          y: bgY,
          scale: bgScale,
          ease: 'none',
        });
      }

      // Parallax for decorative elements
      parallaxElementsRef.current.forEach((el, index) => {
        if (!el) return;
        const speed = isMobile ? 0.3 : isTablet ? 0.5 : 0.7;
        const yOffset = isMobile ? 20 + (index * 10) : 40 + (index * 15);
        
        gsap.to(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: yOffset * (index % 2 === 0 ? 1 : -1),
          x: isMobile ? 5 * (index % 2 === 0 ? 1 : -1) : 10 * (index % 2 === 0 ? 1 : -1),
          ease: 'none',
        });
      });

      // Header animations - responsive
      const headerY = isMobile ? 30 : isTablet ? 40 : 60;
      
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 90%' : 'top 85%',
          end: isMobile ? 'top 60%' : 'top 50%',
          scrub: 1,
        },
        y: headerY,
        opacity: 0,
        ease: 'power3.out',
      });

      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 88%' : 'top 80%',
          end: isMobile ? 'top 55%' : 'top 45%',
          scrub: 1.2,
        },
        y: headerY + 20,
        opacity: 0,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 85%' : 'top 78%',
          end: isMobile ? 'top 50%' : 'top 40%',
          scrub: 1,
        },
        y: headerY + 10,
        opacity: 0,
        ease: 'power3.out',
      });

      // Main container entrance - responsive
      const containerY = isMobile ? 60 : isTablet ? 80 : 100;
      const containerScale = isMobile ? 0.98 : isTablet ? 0.97 : 0.96;
      
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? 'top 85%' : 'top 75%',
          end: isMobile ? 'top 45%' : 'top 35%',
          scrub: 1.3,
        },
        y: containerY,
        opacity: 0,
        scale: containerScale,
        ease: 'power3.out',
      });

      // Line animation - responsive
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isMobile ? 'top 80%' : 'top 70%',
            end: isMobile ? 'top 40%' : 'top 30%',
            scrub: 1.5,
          },
          scaleX: 0,
          transformOrigin: 'left center',
          ease: 'power2.inOut',
        });
      }

      // Steps staggered entrance - responsive
      const stepY = isMobile ? 50 : isTablet ? 60 : 80;
      const stepDelay = isMobile ? 0.08 : 0.1;
      
      stepsRef.current.forEach((step, index) => {
        if (!step) return;

        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: isMobile ? 'top 92%' : 'top 85%',
            end: isMobile ? 'top 55%' : 'top 45%',
            toggleActions: 'play none none reverse',
          },
          y: stepY,
          opacity: 0,
          scale: isMobile ? 0.95 : 0.9,
          duration: isMobile ? 0.7 : 0.9,
          delay: index * stepDelay,
          ease: 'power3.out',
        });

        // Icon hover - only on desktop
        const icon = step.querySelector('.step-icon');
        if (icon && !isMobile) {
          step.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              y: -10,
              scale: 1.2,
              duration: 0.4,
              ease: 'power2.out',
            });
          });

          step.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="our-process" ref={sectionRef} id="process">
      {/* Background - White */}
      <div className="process-bg">
        <div className="process-bg-gradient" ref={bgGradientRef}></div>
        <div className="process-bg-overlay"></div>
      </div>

      {/* Parallax Decorative Elements */}
      <div className="process-parallax-shapes">
        <div className="parallax-shape shape-1" ref={(el) => (parallaxElementsRef.current[0] = el)}></div>
        <div className="parallax-shape shape-2" ref={(el) => (parallaxElementsRef.current[1] = el)}></div>
        <div className="parallax-shape shape-3" ref={(el) => (parallaxElementsRef.current[2] = el)}></div>
        <div className="parallax-shape shape-4" ref={(el) => (parallaxElementsRef.current[3] = el)}></div>
      </div>

      <div className="process-container" ref={containerRef}>
        {/* Header */}
        <div className="process-header">
          <span className="process-badge" ref={badgeRef}>
            ✦ Our Process
          </span>
          <h2 className="process-title" ref={titleRef}>
            Simple. <span className="process-title-highlight">Transparent.</span> Fast.
          </h2>
          <p className="process-subtitle" ref={subtitleRef}>
            From selection to delivery, we make your journey seamless
          </p>
        </div>

        {/* Steps */}
        <div className="process-steps">
          {/* Connecting Line */}
          <div className="process-line" ref={lineRef}></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className="process-step"
              ref={(el) => (stepsRef.current[index] = el)}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-dot">
                <div className="step-dot-inner"></div>
              </div>
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="process-cta">
          <button className="process-cta-btn">
            <span>Start Your Journey</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;