import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (el) {
      // Trigger entrance animation
      requestAnimationFrame(() => el.classList.add('hero--visible'));
    }
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-pattern"></div>
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-center">
        <h1 className="hero-title">
          Your Trusted Source for
          <br /><span className="highlight">Premium Smart Tools</span>
        </h1>

        <p className="hero-description">
          At SmartToolsHubNg, we bring you a carefully curated collection of high-quality
          digital testing tools, precision meters, and smart gadgets — all sourced from
          top manufacturers and backed by warranty. Whether you're a technician, engineer,
          or home user, we have the right tool for you at the best price.
        </p>

        <div className="hero-actions">
          <a href="#products" className="btn btn-primary btn-lg btn-pulse">
            Browse Products <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
