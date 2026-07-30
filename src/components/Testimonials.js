// src/components/Testimonials.js
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const glowRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Alexander Voss',
      role: 'CEO, Apex Holdings',
      text: 'The entire experience was flawless. From the first consultation to the final delivery, every detail was handled with precision and care.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    },
    {
      id: 2,
      name: 'Isabella Chen',
      role: 'Founder, Luxe Ventures',
      text: 'I have purchased multiple vehicles here. The team understands luxury and delivers an experience that matches the cars themselves.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    },
    {
      id: 3,
      name: 'Marcus Ellington',
      role: 'Private Collector',
      text: 'Finding rare and exclusive models has never been easier. Their curated selection is simply unmatched in the industry.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    },
    {
      id: 4,
      name: 'Sofia Ramirez',
      role: 'Creative Director',
      text: 'The test drive experience alone was worth it. Seamless process, transparent pricing, and genuine passion for automobiles.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    },
    {
      id: 5,
      name: 'Julian Park',
      role: 'Tech Entrepreneur',
      text: 'From financing to delivery, everything felt premium. This is how buying a dream car should feel — effortless and exciting.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      const track = trackRef.current;

      if (!track || cards.length === 0) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth + 80);
      };

      // Horizontal scroll
      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth * 0.75}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      // Card scale + opacity
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.92, opacity: 0.75 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 75%',
              end: 'left 25%',
              scrub: true,
            },
          }
        );

        gsap.to(card, {
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 80%',
            end: 'left 20%',
            scrub: true,
          },
        });
      });

      // Background glow parallax
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: -180,
          y: 60,
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${track.scrollWidth * 0.75}`,
            scrub: 2,
          },
        });
      }

      // Title entrance
      gsap.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="testimonials" ref={sectionRef} id="testimonials">
      <div className="testimonials-glow" ref={glowRef}></div>

      <div className="testimonials-header">
        <span className="testimonials-badge" ref={badgeRef}>
          ✦ Client Stories
        </span>
        <h2 className="testimonials-title" ref={titleRef}>
          What Clients <span className="highlight">Say</span>
        </h2>
      </div>

      <div className="testimonials-track-wrapper">
        <div className="testimonials-track" ref={trackRef}>
          {testimonials.map((item, index) => (
            <div
              className="testimonial-card"
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="testimonial-card-inner">
                <div className="testimonial-rating">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>

                <p className="testimonial-text">“{item.text}”</p>

                <div className="testimonial-author">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="author-avatar"
                    loading="lazy"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{item.name}</h4>
                    <span className="author-role">{item.role}</span>
                  </div>
                </div>

                <div className="quote-mark">”</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;