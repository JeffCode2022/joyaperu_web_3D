import { Gem, Package, ShieldCheck, Sparkles } from "lucide-react";

const metrics = [
  { icon: Gem, value: "950", label: "Plata certificada" },
  { icon: Sparkles, value: "18k", label: "Oro a pedido" },
  { icon: Package, value: "700+", label: "Piezas catalogadas" },
  { icon: ShieldCheck, value: "12m", label: "Garantía disponible" },
];

export function JewelryTrustStrip() {
  return (
    <section className="reveal mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="trust-container">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="trust-item-wrapper">
            <div className="trust-item">
              {/* Gold Icon */}
              <div className="trust-icon-box">
                <metric.icon size={36} strokeWidth={1.2} className="trust-icon" />
              </div>
              
              {/* Text content */}
              <div className="trust-text">
                <span className="trust-value">{metric.value}</span>
                <span className="trust-label">{metric.label}</span>
              </div>
            </div>
            
            {/* Divider (only between items) */}
            {index < metrics.length - 1 && (
              <div className="trust-divider" aria-hidden="true">
                <span className="trust-divider-line"></span>
                <span className="trust-divider-diamond">♦</span>
                <span className="trust-divider-line"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .trust-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border: 1px solid rgba(201, 168, 76, 0.35);
          border-radius: 1.5rem;
          padding: 2rem 2.5rem;
          box-shadow: none;
        }

        .trust-item-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: space-around;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .trust-icon-box {
          color: #c9a84c; /* Gold color */
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trust-icon {
          filter: drop-shadow(0 2px 4px rgba(201, 168, 76, 0.15));
        }

        .trust-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .trust-value {
          font-family: "Cormorant Garamond", serif;
          font-size: 2.85rem;
          font-weight: 500;
          line-height: 0.9;
          color: var(--ink);
          letter-spacing: -0.02em;
        }

        .trust-label {
          font-family: "DM Sans", sans-serif;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #7c7267;
          margin-top: 0.25rem;
        }

        /* Divider */
        .trust-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 3.5rem;
          color: rgba(201, 168, 76, 0.4);
          font-size: 0.6rem;
          margin-inline: 1rem;
        }

        .trust-divider-line {
          width: 1px;
          height: 1.25rem;
          background: rgba(201, 168, 76, 0.25);
        }

        .trust-divider-diamond {
          margin: 0.2rem 0;
          color: #c9a84c;
          transform: scale(0.8);
        }

        /* Responsive Layout */
        @media (max-width: 1024px) {
          .trust-container {
            padding: 1.75rem 1.5rem;
          }
          .trust-value {
            font-size: 2.25rem;
          }
          .trust-divider {
            margin-inline: 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .trust-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            padding: 2.25rem 2rem;
            border-radius: 1.25rem;
          }
          .trust-item-wrapper {
            justify-content: flex-start;
          }
          .trust-item {
            width: 100%;
          }
          .trust-divider {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .trust-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.75rem 1.5rem;
          }
          .trust-item {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
