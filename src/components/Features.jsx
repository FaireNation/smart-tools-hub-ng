import { FiTruck, FiShield, FiHeadphones, FiRefreshCw } from 'react-icons/fi';
import features from '../data/features.json';

const iconMap = {
  truck: FiTruck,
  shield: FiShield,
  headphones: FiHeadphones,
  refresh: FiRefreshCw,
};

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-tag">Why Choose Us</span>
          <h2>We've Got You Covered</h2>
          <p>Shop with confidence — here's what makes us different</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || FiShield;
            return (
              <div className="feature-card" key={feature.id} data-reveal>
                <div className="feature-icon">
                  <Icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
