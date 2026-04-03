import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [fleet, setFleet] = useState([]);

  useEffect(() => {
    // Fetch fleet data from backend
    fetch('http://localhost:5000/api/fleet')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setFleet(data.data);
        }
      })
      .catch(err => console.error("Error fetching fleet:", err));
  }, []);

  return (
    <div className="app-container">
      {/* Navigation */}
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        padding: isScrolled ? '15px 5%' : '25px 5%',
        backgroundColor: isScrolled ? 'rgba(244, 245, 247, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        borderBottom: isScrolled ? '1px solid rgba(100, 116, 139, 0.1)' : 'none'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary-dark)' }} className="serif">
          Lux Rentals
        </div>
        <nav style={{ display: 'flex', gap: '30px', fontWeight: 500, color: 'var(--color-primary-dark)' }}>
          <a href="#home">Home</a>
          <a href="#process">Booking Process</a>
          <a href="#fleet">Our Fleet</a>
          <a href="#about">About</a>
        </nav>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="btn btn-outline" style={{ borderColor: 'var(--color-primary-dark)', color: 'var(--color-primary-dark)' }}>Sign Up</button>
          <button className="btn btn-primary" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-accent-gold)' }}>Sign In</button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute',
          top: '-20%', right: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, var(--color-accent-gold) 0%, transparent 60%)',
          opacity: 0.1, zIndex: -1
        }}></div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">Exotic & Premium</span>
            <h1 style={{ fontSize: '4rem', color: 'var(--color-primary-dark)', marginBottom: '20px' }} className="serif">
              Elevate Your Journey.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '40px', maxWidth: '450px' }}>
              Experience uncompromised luxury with our curated selection of high-end vehicles. Perfect for business, pleasure, and unforgettable moments.
            </p>
            
            {/* Booking Form Widget */}
            <div className="card" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '5px', fontWeight: 500 }}>Pickup Location</label>
                  <input type="text" className="input-field" placeholder="City or Airport Code" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '5px', fontWeight: 500 }}>Pickup Date</label>
                  <input type="date" className="input-field" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '5px', fontWeight: 500 }}>Return Date</label>
                  <input type="date" className="input-field" />
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Find Available Vehicles</button>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/images/lambo.jpg" alt="Luxury Car" style={{ 
              width: '120%', 
              maxWidth: '800px', 
              boxShadow: '20px 20px 0px var(--color-accent-gold)',
              borderRadius: '8px',
              marginLeft: '40px'
            }} />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-subtitle">How It Works</span>
            <h2 className="section-title">Seamless Booking Experience</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {['Select Destination', 'Choose Dates', 'Book Your Vehicle'].map((title, i) => (
              <div key={i} className="card text-center" style={{ borderTop: '4px solid var(--color-accent-gold)' }}>
                <div style={{ 
                  width: '60px', height: '60px', 
                  backgroundColor: 'var(--color-primary-dark)', 
                  color: 'var(--color-accent-gold)', 
                  borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', fontWeight: 600, margin: '0 auto 20px' 
                }}>
                  {i + 1}
                </div>
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary-dark)' }}>{title}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Our process is meticulously designed to get you behind the wheel of a luxury vehicle as quickly and effortlessly as possible.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <span className="section-subtitle">Our Fleet</span>
              <h2 className="section-title" style={{ margin: 0 }}>Unrivaled Excellence</h2>
            </div>
            <button className="btn btn-outline" style={{ borderColor: 'var(--color-primary-dark)', color: 'var(--color-primary-dark)' }}>View Entire Fleet</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {fleet.map((car, idx) => (
              <div key={idx} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '220px' }}>
                  <img src={car.img} alt={car.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ 
                    position: 'absolute', top: '15px', right: '15px', 
                    backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-accent-gold)',
                    padding: '4px 12px', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '1px'
                  }}>
                    {car.year}
                  </span>
                </div>
                <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{car.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>${car.price}</span>
                    <span style={{ color: 'var(--color-text-muted)', marginBottom: '5px' }}>/mo</span>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn btn-secondary" style={{ width: '100%', backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-accent-gold)' }}>Reserve Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-primary-light)', paddingTop: '80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-accent-gold)', marginBottom: '20px' }} className="serif">
                Lux Rentals
              </div>
              <p style={{ maxWidth: '300px', opacity: 0.8, lineHeight: 1.8 }}>
                Premium car rental services providing luxury vehicles for all occasions with exceptional customer support.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-accent-gold)', marginBottom: '20px', fontSize: '1.1rem' }}>Navigation</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', opacity: 0.8 }}>
                <li><a href="#home">Home</a></li>
                <li><a href="#fleet">Our Fleet</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-accent-gold)', marginBottom: '20px', fontSize: '1.1rem' }}>Newsletter</h4>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Subscribe for early access to our luxury fleet additions.</p>
              <div style={{ display: 'flex' }}>
                <input type="email" placeholder="Email Address" className="input-field" style={{ borderRadius: '0', borderRight: 'none' }} />
                <button className="btn btn-primary" style={{ borderRadius: '0', backgroundColor: 'var(--color-accent-gold)', color: 'var(--color-primary-dark)', borderColor: 'var(--color-accent-gold)' }}>Join</button>
              </div>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid rgba(197, 160, 89, 0.2)', 
            padding: '30px 0', 
            textAlign: 'center',
            fontSize: '0.9rem',
            opacity: 0.7 
          }}>
            &copy; 2026 Lux Rentals. Business Registration Processing.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
