import { useEffect, useRef } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../config/site';

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
          SmartToolsHubNg is Nigeria's go-to store for premium digital testing instruments,
          precision measurement tools, and smart gadgets. <b/> If you will need to speak to a customer care representative for a big/bulk installation click the link below.
        </p>

        <div className="hero-actions">
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
            style={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#fff' }}
          >
            <FaWhatsapp /> Contact Us
          </a>

          <a href="#products" className="btn btn-primary btn-lg btn-pulse">
            Browse Products <FiArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
