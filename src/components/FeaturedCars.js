// FeaturedCars.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturedCars.css';

gsap.registerPlugin(ScrollTrigger);

const FeaturedCars = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const carsRef = useRef([]);
  const glowRef = useRef(null);
  const ctaRef = useRef(null);

  const cars = [
    {
      id: 1,
      name: 'Phantom Elite',
      price: '$2.8M',
      speed: '0-60 2.5s',
      engine: 'V12 Hybrid',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
      color: '#d4af37',
    },
    {
      id: 2,
      name: 'Aventador SVJ',
      price: '$1.2M',
      speed: '0-60 2.8s',
      engine: 'V12 NA',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
      color: '#ff3366',
    },
    {
      id: 3,
      name: '911 Turbo S',
      price: '$850K',
      speed: '0-60 2.6s',
      engine: 'Flat-6 TT',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
      color: '#00b4d8',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== BACKGROUND GLOW PARALLAX =====
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -180,
          scale: 1.25,
          ease: 'none',
        });
      }

      // ===== HEADER ANIMATIONS =====
      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 45%',
          scrub: 1,
        },
        y: 60,
        opacity: 0,
        ease: 'power3.out',
      });

      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1.2,
        },
        y: 100,
        opacity: 0,
        ease: 'power3.out',
      });

      gsap.from(descriptionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: 1,
        },
        y: 70,
        opacity: 0,
        ease: 'power3.out',
      });

      // ===== CAR CARDS – staggered entrance + parallax =====
      carsRef.current.forEach((card, index) => {
        if (!card) return;

        // Entrance animation
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
          y: 140,
          opacity: 0,
          scale: 0.9,
          rotationX: 12,
          duration: 1.15,
          delay: index * 0.13,
          ease: 'power3.out',
        });

        // Subtle parallax on the image inside each card
        const image = card.querySelector('.car-card-image');
        if (image) {
          gsap.to(image, {
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
            y: -40,
            scale: 1.08,
            ease: 'none',
          });
        }

        // Hover effects (desktop)
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -16,
            scale: 1.03,
            duration: 0.45,
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          });
        });
      });

      // ===== CTA BUTTON =====
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="featured-cars" ref={sectionRef}>
      {/* Parallax background glow */}
      <div className="featured-bg-glow" ref={glowRef}></div>

      <div className="featured-container">
        {/* Header */}
        <div className="featured-header">
          <span className="featured-badge" ref={subtitleRef}>
            ✦ Premium Collection
          </span>

          <h2 className="featured-title" ref={titleRef}>
            Handpicked
            <span className="featured-title-highlight"> Masterpieces</span>
          </h2>

          <p className="featured-description" ref={descriptionRef}>
            Each vehicle represents the pinnacle of automotive artistry,
            meticulously curated for the discerning connoisseur.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="cars-grid">
          {cars.map((car, index) => (
            <div
              className="car-card"
              key={car.id}
              ref={(el) => (carsRef.current[index] = el)}
              style={{ '--car-color': car.color }}
            >
              <div
                className="car-card-glow"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${car.color}22, transparent 70%)`,
                }}
              ></div>

              <div className="car-card-image-wrapper">
                <div
                  className="car-card-image"
                  style={{ backgroundImage: `url(${car.image})` }}
                >
                  <div className="car-card-overlay"></div>
                </div>

                <div className="car-card-price-tag">
                  <span>{car.price}</span>
                </div>
              </div>

              <div className="car-card-content">
                <div className="car-card-name">
                  <h3>{car.name}</h3>
                  <div
                    className="car-card-line"
                    style={{ background: car.color }}
                  ></div>
                </div>

                <div className="car-card-specs">
                  <div className="spec-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{car.speed}</span>
                  </div>

                  <div className="spec-divider"></div>

                  <div className="spec-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                    <span>{car.engine}</span>
                  </div>
                </div>

                <button className="car-card-btn">
                  <span>View Details</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="car-card-number">0{index + 1}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="featured-cta" ref={ctaRef}>
          <button className="featured-cta-btn">
            <span>View All Vehicles</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;