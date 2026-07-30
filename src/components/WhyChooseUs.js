// WhyChooseUs.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WhyChooseUs.css';

gsap.registerPlugin(ScrollTrigger);

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const carWrapperRef = useRef(null);
  const carImgRef = useRef(null);
  const benefitsRef = useRef([]);
  const bgGradientRef = useRef(null);
  const bgOverlayRef = useRef(null);

  const benefits = [
    {
      id: '01',
      title: 'Premium Cars',
      description: 'Curated fleet of luxury and high-performance vehicles',
      icon: 'fa-car',
    },
    {
      id: '02',
      title: 'Warranty',
      description: 'Comprehensive coverage for complete peace of mind',
      icon: 'fa-shield-halved',
    },
    {
      id: '03',
      title: 'Financing',
      description: 'Flexible plans tailored to your lifestyle',
      icon: 'fa-coins',
    },
    {
      id: '04',
      title: 'Support',
      description: 'Dedicated concierge service around the clock',
      icon: 'fa-headset',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== BACKGROUND PARALLAX =====
      if (bgGradientRef.current) {
        gsap.to(bgGradientRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.6,
          },
          y: 120,
          scale: 1.12,
          ease: 'none',
        });
      }

      if (bgOverlayRef.current) {
        gsap.to(bgOverlayRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
          y: 80,
          ease: 'none',
        });
      }

      // ===== HEADER ANIMATIONS =====
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
        y: 40,
        opacity: 0,
        ease: 'power3.out',
      });

      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1.2,
        },
        y: 80,
        opacity: 0,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 48%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        ease: 'power3.out',
      });

      // ===== MAIN CONTAINER ENTRANCE =====
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 1.3,
        },
        y: 100,
        opacity: 0,
        scale: 0.96,
        ease: 'power3.out',
      });

      // ===== CAR IMAGE PARALLAX =====
      if (carWrapperRef.current) {
        gsap.from(carWrapperRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1.4,
          },
          x: -80,
          opacity: 0,
          ease: 'power3.out',
        });
      }

      if (carImgRef.current) {
        gsap.to(carImgRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -50,
          scale: 1.08,
          ease: 'none',
        });
      }

      // ===== BENEFIT CARDS – staggered + parallax =====
      benefitsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 55%',
            toggleActions: 'play none none reverse',
          },
          y: 90,
          opacity: 0,
          scale: 0.92,
          duration: 0.9,
          delay: index * 0.12,
          ease: 'power3.out',
        });

        // Subtle continuous parallax on each card
        gsap.to(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8,
          },
          y: index % 2 === 0 ? -25 : -40,
          ease: 'none',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="why-choose-us-section" id="why-choose-us" ref={sectionRef}>
      {/* Background Layers */}
      <div className="why-bg">
        <div className="why-bg-gradient" ref={bgGradientRef}></div>
        <div className="why-bg-overlay" ref={bgOverlayRef}></div>
      </div>

      <div className="why-container" ref={containerRef}>
        {/* Header */}
        <div className="section-header">
          <span className="badge" ref={badgeRef}>
            ✦ Luxury beyond driving
          </span>
          <h2 ref={titleRef}>Why Choose Us</h2>
          <p className="sub" ref={subtitleRef}>
            Experience the pinnacle of automotive excellence
          </p>
        </div>

        <div className="grid-container">
          {/* Left - Car Image */}
          <div className="car-image-wrapper" ref={carWrapperRef}>
            <div className="car-image">
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury sports car"
                className="car-img"
                ref={carImgRef}
                draggable="false"
              />
              <span className="car-label">Exclusive Collection</span>
            </div>
          </div>

          {/* Right - Benefits Grid */}
          <div className="benefits-grid">
            {benefits.map((item, index) => (
              <div
                key={item.id}
                className="benefit-card"
                ref={(el) => (benefitsRef.current[index] = el)}
              >
                <div className="benefit-number">{item.id}</div>
                <div className="benefit-icon">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;