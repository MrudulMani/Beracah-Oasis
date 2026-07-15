import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SpineCanvas from './components/SpineCanvas';
import { 
  MapPin, Phone, Clock, ShieldCheck, 
  ArrowRight, Calendar, Activity, Check, Compass, Dumbbell, 
  AlertTriangle, CheckCircle, ChevronRight, Stethoscope 
} from 'lucide-react';
import './App.css';

interface RegionInfo {
  name: string;
  description: string;
  symptoms: string;
  treatment: string;
}

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [hoveredRegion, setHoveredRegion] = useState<RegionInfo | null>(null);
  const [postureState, setPostureState] = useState<'poor' | 'optimal'>('poor');
  const [animatePage, setAnimatePage] = useState<boolean>(false);

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingBranch, setBookingBranch] = useState('AECS Layout');
  const [bookingDoctor, setBookingDoctor] = useState('Dr. Avanthi Prabhakar');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('Morning (09:00 AM - 12:00 PM)');
  const [bookingSymptoms, setBookingSymptoms] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Handle page transitions
  useEffect(() => {
    setAnimatePage(false);
    const timer = setTimeout(() => setAnimatePage(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingPhone || !bookingDate) {
      setBookingError('Please fill out all required fields (*).');
      return;
    }
    setBookingError('');
    const randomId = 'BO-' + Math.floor(100000 + Math.random() * 900000);
    setReceiptNumber(randomId);
    setIsBooked(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setContactSent(false);
    }, 4000);
  };

  const resetBooking = () => {
    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingDate('');
    setBookingSymptoms('');
    setIsBooked(false);
  };

  // 1. HOME PAGE RENDERER (Summary of all pages)
  const renderHome = () => (
    <div className="container">
      {/* Hero Header */}
      <div className="hero-section grid-2">
        {/* Left Copy */}
        <div className="hero-content">
          <div className="hero-subtitle">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-2"></span>
            Oasis of Clinical Healing & Rehabilitation
          </div>
          <h1 className="hero-title">
            Advanced <span style={{ color: 'var(--primary-blue)' }}>Physiotherapy</span>.<br />
            <span style={{ color: 'var(--primary-pink)' }}>Restore Your Movement.</span>
          </h1>
          
          {/* Biomechanical Insight Box */}
          <div className="glass-panel" style={{ padding: '16px', margin: '20px 0', borderLeft: '4px solid var(--primary-pink)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.02)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-pink)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              Biomechanical Insight
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
              Musculoskeletal pain is frequently a result of joint compensation and motor control dysfunction. Our evidence-based treatments isolate restricted movement vectors, restoring optimal structural alignment and neuromuscular activation.
            </p>
          </div>

          <p className="hero-desc">
            Experience world-class, professional physiotherapy care at Beracah Oasis. 
            We specialize in advanced orthopedic spine recovery, athletic sports rehabilitation, and localized pain management across 3 Bangalore locations.
          </p>
          <div className="hero-actions">
            <button 
              onClick={() => setActiveTab('booking-contact')}
              className="btn-primary cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('spine-interactive');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary cursor-pointer"
            >
              Interactive 3D Spine
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 3D Canvas */}
        <div className="hero-canvas-wrapper">
          <SpineCanvas onHoverRegion={setHoveredRegion} />
        </div>
      </div>

      {/* Interactive Spine Diagnostic Dashboard */}
      <div id="spine-interactive" className="diagnostic-hub">
        <div className="diagnostic-title">
          <Activity className="w-6 h-6 text-pink-500 animate-pulse" />
          <h3>Live 3D Diagnostics Hub</h3>
        </div>
        
        {hoveredRegion ? (
          <div className="diagnostic-grid animate-fade-in">
            <div className="diagnostic-left">
              <h4>{hoveredRegion.name}</h4>
              <p>{hoveredRegion.description}</p>
            </div>
            <div className="diagnostic-right">
              <div className="diagnostic-item">
                <span>Common Symptoms</span>
                <p>{hoveredRegion.symptoms}</p>
              </div>
              <div className="diagnostic-item">
                <span>Recommended Treatment</span>
                <p>{hoveredRegion.treatment}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="diagnostic-default">
            <Stethoscope className="w-12 h-12 text-slate-500 mb-4 animate-bounce" />
            <p>Hover over the vertebrae segments of the 3D Spine above</p>
            <span>Discover spinal dynamics, associated symptoms, and rehabilitation plans.</span>
          </div>
        )}
      </div>

      {/* 1. About Us Summary Section */}
      <div className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '64px' }}>
        <div className="grid-2">
          <div className="about-text-block">
            <div className="hero-subtitle">01 / About Us</div>
            <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '16px' }}>Our Healing Philosophy</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Founded with the vision to create a sanctuary of healing for individuals suffering from chronic pain and joint limitations, Beracah Oasis blends advanced physical therapies with hands-on manual adjustments. Our protocols are evidence-guided and customized for every single body.
            </p>
            <button 
              onClick={() => setActiveTab('about')}
              className="btn-secondary"
              style={{ marginTop: '16px' }}
            >
              Read Our Full Story
              <ChevronRight className="w-4 h-4 text-pink-400" />
            </button>
          </div>
          <div className="about-stats-block" style={{ paddingLeft: '32px' }}>
            <div className="stat-item">
              <div className="stat-value">14+</div>
              <div className="stat-label">
                <h4>Years Experience</h4>
                <p>Advanced spine and muscle care.</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-value">15k+</div>
              <div className="stat-label">
                <h4>Successful Recoveries</h4>
                <p>Restored structural joint mobility.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Our Doctors Summary Section */}
      <div className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '64px' }}>
        <div className="section-title">
          <div className="hero-subtitle" style={{ justifyContent: 'center' }}>02 / Our Doctors</div>
          <h2>Our Specialist Council</h2>
          <p>Learn more about our clinical team of board-certified physiotherapists.</p>
        </div>
        <div className="grid-3" style={{ marginBottom: '32px' }}>
          <div className="glass-panel pillar-card" style={{ padding: '24px', textAlign: 'center' }}>
            <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '4px' }}>Dr. Avanthi Prabhakar</h4>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary-pink)', fontWeight: '700', textTransform: 'uppercase' }}>Spine Care Lead</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>14+ years experience in joint adjustments and manual traction.</p>
          </div>
          <div className="glass-panel pillar-card" style={{ padding: '24px', textAlign: 'center' }}>
            <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '4px' }}>Dr. Rajesh Kumar</h4>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary-blue)', fontWeight: '700', textTransform: 'uppercase' }}>Sports Rehab Lead</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Expert in kinesio taping and running gait performance correction.</p>
          </div>
          <div className="glass-panel pillar-card" style={{ padding: '24px', textAlign: 'center' }}>
            <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '4px' }}>Dr. Sarah Alva</h4>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary-pink)', fontWeight: '700', textTransform: 'uppercase' }}>Neurological Lead</span>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Specialist in stroke recovery, balance therapy, and pediatric motor care.</p>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => setActiveTab('doctors')}
            className="btn-secondary"
          >
            Meet Our Specialists
            <ChevronRight className="w-4 h-4 text-pink-400" />
          </button>
        </div>
      </div>

      {/* 3. Awareness Summary Section */}
      <div className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '64px' }}>
        <div className="grid-2">
          <div className="posture-figure-wrapper" style={{ height: '280px' }}>
            <svg width="150" height="230" viewBox="0 0 200 300">
              <line x1="20" y1="280" x2="180" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              <path d="M 80 230 C 70 200, 75 160, 95 130 C 110 110, 115 105, 125 100" fill="none" stroke="url(#pinkGradientHome)" strokeWidth="8" strokeLinecap="round" />
              <circle cx="132" cy="78" r="18" fill="var(--bg-dark)" stroke="url(#pinkGradientHome)" strokeWidth="4" />
              <defs>
                <linearGradient id="pinkGradientHome" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <div className="hero-subtitle">03 / Awareness</div>
            <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '16px' }}>Biomechanical Posture Health</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              Slouching forward by 60° places an equivalent load of 27kg on your cervical spine. Modern desk habits cause muscles in the chest and neck to tighten, while weakening the upper back. Learn stretches to relieve text neck and build spinal support.
            </p>
            <button 
              onClick={() => setActiveTab('awareness')}
              className="btn-secondary"
            >
              Test Your Posture
              <ChevronRight className="w-4 h-4 text-pink-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Branches Summary Section */}
      <div className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '64px' }}>
        <div className="grid-2">
          <div>
            <div className="hero-subtitle">04 / Branches</div>
            <h3 style={{ color: 'white', fontSize: '2rem', marginBottom: '16px' }}>Our Clinics Near You</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              We operate three clinical locations in Bangalore, each configured to handle specific diagnoses. AECS Layout focuses on mechanical spine traction, Thubarahalli houses sports conditioning equipment, and KR Puram is built for neurological recovery.
            </p>
            <button 
              onClick={() => setActiveTab('branches')}
              className="btn-secondary"
            >
              Explore Our Branches
              <ChevronRight className="w-4 h-4 text-pink-400" />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '4px' }}>AECS Layout (ITPL Main Road)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Main spine care center opposite Coffee Day.</p>
            </div>
            <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '4px' }}>Thubarahalli (Sai Baba Temple Road)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sports rehabilitation facility with functional gait turf.</p>
            </div>
            <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ color: 'white', fontSize: '0.95rem', marginBottom: '4px' }}>Ayyappa Nagar (KR Puram)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Neurological rehabilitation focus.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Booking & Contact Summary Section */}
      <div className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '64px', marginBottom: '80px' }}>
        <div className="glass-panel p-8" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div className="hero-subtitle" style={{ justifyContent: 'center' }}>05 / Booking & Contact</div>
          <h2 style={{ fontSize: '2.25rem', color: 'white', marginBottom: '16px' }}>Ready to Start Your Recovery?</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
            Request an appointment with our specialist council. Fill in your symptoms, preferred branch, and date. We will coordinate details and confirm your slot.
          </p>
          <button 
            onClick={() => setActiveTab('booking-contact')}
            className="btn-primary"
          >
            <Calendar className="w-5 h-5" />
            Book Your Clinical Slot
          </button>
        </div>
      </div>
    </div>
  );

  // 2. ABOUT US PAGE RENDERER
  const renderAbout = () => (
    <div className="container section">
      <div className="section-title">
        <h2>About Beracah Oasis</h2>
        <p>The story behind Bangalore’s trusted physical therapy and back-care clinic.</p>
      </div>

      <div className="about-grid">
        <div className="about-text-block">
          <h3>An Oasis of Healing & Recovery</h3>
          <p>
            Beracah Oasis Physiotherapy Clinic was founded with a singular vision: to create a sanctuary of healing for individuals suffering from chronic pain, back disorders, and athletic injuries. Under the clinical guidance of Dr. Avanthi Prabhakar, our clinics have grown into leading rehabilitation facilities in Bangalore.
          </p>
          <p>
            "Beracah" translates to "a place of blessings and peace", while "Oasis" represents a source of refreshment and relief in a desert. Together, our name reflects our core mission: to provide patient-focused, peaceful, and highly professional care that refreshes our patients' physical capacity.
          </p>
          <p>
            Our treatment methodology is built on progressive clinical research. We bypass generalized exercises to focus on targeted, customized interventions. Every clinical pathway starts with a complete biomechanical posture and movement analysis, followed by hands-on manual corrections.
          </p>
          <ul className="about-text-list">
            <li>
              <Check className="w-4 h-4 text-pink-500" /> Evidence-guided treatment protocols with measurable milestones
            </li>
            <li>
              <Check className="w-4 h-4 text-pink-500" /> State-of-the-art manual therapy & dry needling methodologies
            </li>
            <li>
              <Check className="w-4 h-4 text-pink-500" /> Advanced modalities including high-frequency laser & decompression
            </li>
            <li>
              <Check className="w-4 h-4 text-pink-500" /> Dedicated patient empowerment through custom home exercise designs
            </li>
          </ul>
        </div>

        <div className="about-stats-block">
          <div className="stat-item">
            <div className="stat-value">14+</div>
            <div className="stat-label">
              <h4>Years of Clinical Experience</h4>
              <p>Uncompromised expertise in muscular recovery.</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">15k+</div>
            <div className="stat-label">
              <h4>Successful Rehabilitations</h4>
              <p>Rebuilding joint movement, muscle strength, and flexibility.</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">3</div>
            <div className="stat-label">
              <h4>State-of-the-Art Branches</h4>
              <p>Serving AECS Layout, Thubarahalli, and KR Puram.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Clinical Equipment Details */}
      <div className="section">
        <div className="section-title">
          <h2>Our Therapeutic Modalities</h2>
          <p>We invest in advanced physical therapy equipment to accelerate healing, minimize pain, and restore cellular energy.</p>
        </div>

        <div className="grid-3">
          <div className="glass-panel pillar-card glow-blue">
            <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '12px' }}>High-Intensity Laser Therapy (HILT)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Non-invasive infrared light penetrates deep tissues to trigger cellular biostimulation. Speeds up collagen synthesis, decreases joint inflammation, and relieves localized pain in chronic spinal disorders.
            </p>
          </div>

          <div className="glass-panel pillar-card glow-pink">
            <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '12px' }}>Mechanical Spinal Decompression</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Computerized traction cycles gently distract spinal segments. Creates negative intradiscal pressure to retract bulging discs, relieving nerve compression and promoting nutrient flow into damaged tissues.
            </p>
          </div>

          <div className="glass-panel pillar-card glow-blue">
            <h4 style={{ color: 'white', fontSize: '1.15rem', marginBottom: '12px' }}>Myofascial Dry Needling Tools</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Precision needles are inserted directly into hyperirritable muscle fibers (trigger points). Resets localized muscle tone, releases deep myofascial tension, and increases structural vascularity.
            </p>
          </div>
        </div>
      </div>

      {/* Patient Code of Conduct & Clinical Standards */}
      <div className="diagnostic-hub" style={{ marginBottom: '80px' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
          Our Professional Care Standards
        </h3>
        <div className="grid-3" style={{ gap: '24px', textAlign: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', display: 'block', marginBottom: '6px' }}>CONFIDENTIALITY & RECORD SAFETY</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Your electronic diagnostic histories, doctor referrals, and exercise logs are fully protected, adhering to high confidentiality standards.
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-pink)', display: 'block', marginBottom: '6px' }}>HYGIENIC CARE ENVIRONMENTS</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              All traction beds, support blocks, posture needles, and therapeutic equipment are disinfected using clinical grade sanitizers between sessions.
            </p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', display: 'block', marginBottom: '6px' }}>CONSISTENT CARE ASSIGNMENTS</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              You will work with the same certified physiotherapist during your entire clinical plan to ensure treatment consistency and progress evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline of growth */}
      <div className="diagnostic-hub">
        <h3 className="timeline-title-main" style={{ textAlign: 'center', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '1rem', color: 'var(--text-secondary)' }}>Our Medical Journey</h3>
        <div className="timeline">
          
          <div className="timeline-item">
            <div className="timeline-indicator"></div>
            <span className="timeline-year">2012</span>
            <h4 className="timeline-title">Foundation of Beracah Physiotherapy</h4>
            <p className="timeline-desc">
              Dr. Avanthi Prabhakar initiates a small specialized clinical setup in East Bangalore, focusing on manual spine traction and pediatric recovery.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-indicator"></div>
            <span className="timeline-year">2017</span>
            <h4 className="timeline-title">The Launch of "Oasis" Brookefield Branch</h4>
            <p className="timeline-desc">
              Expanding services into AECS Layout, introducing dry needling, advanced laser treatment modalities, and customized sports rehabilitation programs.
            </p>
          </div>

          <div className="timeline-item">
            <div className="timeline-indicator"></div>
            <span className="timeline-year">2022</span>
            <h4 className="timeline-title">Ayyappa Nagar Extension</h4>
            <p className="timeline-desc">
              Opening our third branch in KR Puram to accommodate growing patient numbers from Ayyappa Nagar and TC Palya vicinity.
            </p>
          </div>

        </div>
      </div>
    </div>
  );

  // 3. OUR DOCTORS PAGE RENDERER
  const renderDoctors = () => (
    <div className="container section">
      <div className="section-title">
        <h2>Meet Our Rehabilitation Specialists</h2>
        <p>Our licensed and expert physiotherapists are dedicated to restoring your pain-free lifestyle.</p>
      </div>

      <div className="doctors-grid">
        {/* Doctor 1 */}
        <div className="glass-panel doctor-card glow-pink">
          <div className="doctor-avatar-container">
            <div className="doctor-avatar">
              <Stethoscope className="w-16 h-16" />
            </div>
            <span className="doctor-status-badge" title="Available Today"></span>
          </div>
          <h3 className="doctor-name">Dr. Avanthi Prabhakar</h3>
          <div className="doctor-specialty">Lead Physiotherapist & Founder</div>
          <p className="doctor-degrees">BPT, MPT (Musculoskeletal & Spine Care) - Rajiv Gandhi University (RGUHS)</p>
          <p className="doctor-desc">
            With over 14 years of comprehensive experience, Dr. Avanthi is a highly regarded specialist in spinal joint mobilization, myofascial trigger-point release, and post-surgical orthopedics.
          </p>
          <div className="doctor-meta">
            <div className="doctor-meta-item">
              <span>14+ Yrs</span>
              <p>Experience</p>
            </div>
            <div className="doctor-meta-item">
              <span>Spine Care</span>
              <p>Expertise</p>
            </div>
          </div>
        </div>

        {/* Doctor 2 */}
        <div className="glass-panel doctor-card glow-blue">
          <div className="doctor-avatar-container">
            <div className="doctor-avatar">
              <Dumbbell className="w-16 h-16" />
            </div>
            <span className="doctor-status-badge" title="Available Today"></span>
          </div>
          <h3 className="doctor-name">Dr. Rajesh Kumar</h3>
          <div className="doctor-specialty">Sports Rehabilitation Specialist</div>
          <p className="doctor-degrees">BPT, MPT (Sports Physiotherapy) - Ramaiah College of Physiotherapy</p>
          <p className="doctor-desc">
            Specializing in athletic performance correction, ligament injury rehabilitation (ACL/MCL), and posture analysis. Former Rehab Consultant for state athletics teams.
          </p>
          <div className="doctor-meta">
            <div className="doctor-meta-item">
              <span>8 Yrs</span>
              <p>Experience</p>
            </div>
            <div className="doctor-meta-item">
              <span>Sports</span>
              <p>Expertise</p>
            </div>
          </div>
        </div>

        {/* Doctor 3 */}
        <div className="glass-panel doctor-card glow-pink">
          <div className="doctor-avatar-container">
            <div className="doctor-avatar">
              <Compass className="w-16 h-16" />
            </div>
            <span className="doctor-status-badge away" title="Next Available Slot: Tomorrow"></span>
          </div>
          <h3 className="doctor-name">Dr. Sarah Alva</h3>
          <div className="doctor-specialty">Neurological & Pediatric Specialist</div>
          <p className="doctor-degrees">BPT, MPT (Neuro-Sciences) - St. John's Medical College</p>
          <p className="doctor-desc">
            Expert in vestibular balance therapy, stroke recovery, and sensory-motor pediatric training. Committed to helping patients recover balance and neurological coordination.
          </p>
          <div className="doctor-meta">
            <div className="doctor-meta-item">
              <span>6 Yrs</span>
              <p>Experience</p>
            </div>
            <div className="doctor-meta-item">
              <span>Neuro Rehab</span>
              <p>Expertise</p>
            </div>
          </div>
        </div>
      </div>

      {/* Publications / Research Section */}
      <div className="diagnostic-hub" style={{ marginTop: '56px' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>
          Clinical Research & Contributions
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
          Our clinical leadership actively contributes to the development of physical therapy. Dr. Avanthi Prabhakar has published research papers in international journals on mechanical spinal traction methods and its benefits for patients with lower lumbar herniations.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Dr. Rajesh Kumar continuously collaborates with local athletic clubs to document and study optimal hamstring strengthening methods and its effects on reducing re-injury rates.
        </p>
      </div>

      {/* Affiliation & Board Certifications info */}
      <div className="diagnostic-hub" style={{ marginTop: '40px' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px' }}>Professional Affiliations & Standards</h3>
        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', display: 'block', marginBottom: '4px' }}>IAP CERTIFIED</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>All therapists are registered with the Indian Association of Physiotherapists, following stringent national care standards.</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-pink)', display: 'block', marginBottom: '4px' }}>EVIDENCE-BASED PRACTICES</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>We implement clinical guidelines backed by the World Confederation for Physical Therapy (WCPT).</p>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-blue)', display: 'block', marginBottom: '4px' }}>CONTINUOUS EDUCATION</span>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Our staff undergoes quarterly certification workshops in advanced dry needling, taping, and joint adjustment.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. AWARENESS PAGE RENDERER
  const renderAwareness = () => (
    <div className="container section">
      <div className="section-title">
        <h2>Posture & Ergonomic Awareness</h2>
        <p>Interactive diagnostics on common biomechanical errors and posture strains.</p>
      </div>

      {/* Interactive Posture Corrector Widget */}
      <div className="glass-panel p-8 mb-16">
        <h3 className="text-xl font-bold mb-4 text-center text-slate-200" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Interactive Posture Simulator</h3>
        <p className="posture-subtitle-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>
          Toggle the buttons below to visualize the physiological stress modern desk habits exert on the cervical spine.
        </p>

        <div className="posture-widget grid-2">
          {/* Posture Figure Graphic */}
          <div className="posture-figure-wrapper">
            <svg width="200" height="300" viewBox="0 0 200 300" className="transition-all duration-500">
              {/* Ground level */}
              <line x1="20" y1="280" x2="180" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
              
              {/* Chair back support reference */}
              <path d="M 60 280 L 60 140 L 40 140" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" strokeLinecap="round" />

              {/* Spine drawing based on state */}
              {postureState === 'poor' ? (
                // Slouched spine path
                <g>
                  {/* Spine segment curve */}
                  <path d="M 80 230 C 70 200, 75 160, 95 130 C 110 110, 115 105, 125 100" 
                        fill="none" stroke="url(#pinkGradient)" strokeWidth="8" strokeLinecap="round" />
                  {/* Pelvis/Legs */}
                  <path d="M 80 230 L 120 230 L 120 280" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  {/* Head center */}
                  <circle cx="132" cy="78" r="18" fill="var(--bg-dark)" stroke="url(#pinkGradient)" strokeWidth="4" />
                  {/* Neck strain indicator (glowing red glow) */}
                  <circle cx="108" cy="115" r="10" fill="rgba(236,72,153,0.3)" className="animate-ping" />
                  <path d="M 108 115 L 140 135" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 3" />
                  {/* Arms */}
                  <path d="M 95 145 L 125 165 L 140 200" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                </g>
              ) : (
                // Optimal spine path
                <g>
                  {/* Vertically aligned spine */}
                  <path d="M 80 230 C 80 190, 80 150, 80 120 C 80 110, 80 100, 80 90" 
                        fill="none" stroke="url(#blueGradient)" strokeWidth="8" strokeLinecap="round" />
                  {/* Pelvis/Legs */}
                  <path d="M 80 230 L 120 230 L 120 280" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="6" />
                  {/* Head aligned with center axis */}
                  <circle cx="80" cy="65" r="18" fill="var(--bg-dark)" stroke="url(#blueGradient)" strokeWidth="4" />
                  {/* Arms */}
                  <path d="M 80 130 L 105 160 L 110 200" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
                </g>
              )}

              {/* Definitions for Gradients */}
              <defs>
                <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Posture diagnostics details */}
          <div className="posture-details-box">
            <div className="posture-btn-group">
              <button 
                onClick={() => setPostureState('poor')}
                className={`posture-btn poor ${postureState === 'poor' ? 'active' : ''}`}
              >
                Slouched Posture
              </button>
              <button 
                onClick={() => setPostureState('optimal')}
                className={`posture-btn optimal ${postureState === 'optimal' ? 'active' : ''}`}
              >
                Optimal Posture
              </button>
            </div>

            {postureState === 'poor' ? (
              <div className="glass-panel posture-card poor animate-fade-in">
                <h4 className="posture-card-title">
                  <AlertTriangle className="w-5 h-5" /> Heavy Cervical Strain
                </h4>
                <p className="posture-card-text">
                  Bending the neck forward by <strong>60 degrees</strong> places approximately <strong>27 kilograms (60 lbs)</strong> of weight load on the cervical spine. This is equivalent to carrying an average 8-year-old child on your neck.
                </p>
                <div className="posture-stat-grid">
                  <div className="posture-stat-item">
                    <span className="posture-stat-title">Cervical Load</span>
                    <div className="posture-stat-value" style={{ color: '#fb7185' }}>27 kg (60 lbs)</div>
                  </div>
                  <div className="posture-stat-item">
                    <span className="posture-stat-title">Consequence</span>
                    <div className="posture-stat-value">Muscle Spasms</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-panel posture-card optimal animate-fade-in">
                <h4 className="posture-card-title">
                  <CheckCircle className="w-5 h-5" /> Optimal Load Distribution
                </h4>
                <p className="posture-card-text">
                  In upright alignment, the load on the cervical spine remains at its baseline of <strong>5 kilograms (10-12 lbs)</strong>. The weight is transferred directly down the vertebral column to the pelvis, reducing active muscular strain.
                </p>
                <div className="posture-stat-grid">
                  <div className="posture-stat-item">
                    <span className="posture-stat-title">Cervical Load</span>
                    <div className="posture-stat-value" style={{ color: '#38bdf8' }}>5 kg (11 lbs)</div>
                  </div>
                  <div className="posture-stat-item">
                    <span className="posture-stat-title">Benefit</span>
                    <div className="posture-stat-value">Unloaded Muscles</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deep Biomechanical Library Info */}
      <div className="diagnostic-hub" style={{ marginBottom: '64px' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>The Biomechanics of Desk Strain</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
          Upper Crossed Syndrome is a common muscle imbalance pattern that develops from prolonged sitting with poor posture. The deep neck flexors (front of neck) and scapular stabilizers (mid-back) become elongated and weak, while the upper trapezius, levator scapulae (back of neck), and pectorals (chest) become hyperactive and short.
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          This muscular imbalance pulls the head forward and rounds the shoulders. Over time, it increases shear stress on lower cervical vertebrae (C5-C6, C6-C7), predisposing individuals to premature joint degeneration, disc protrusions, and chronic muscle pain. Corrective physiotherapy focuses on releasing the short, hyperactive muscles and strengthening the weak, elongated ones.
        </p>
      </div>

      {/* Ergonomic Checklist section */}
      <div className="diagnostic-hub" style={{ marginBottom: '64px' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
          Workstation Ergonomics Checklist
        </h3>
        <div className="grid-2" style={{ gap: '32px', alignItems: 'flex-start' }}>
          <div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '12px' }}>Monitor & Head Alignment</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li className="flex-align-center"><Check className="w-4 h-4 text-pink-500" /> Keep monitor top at eye level.</li>
              <li className="flex-align-center"><Check className="w-4 h-4 text-pink-500" /> Position monitor 20-30 inches (arm length) away.</li>
              <li className="flex-align-center"><Check className="w-4 h-4 text-pink-500" /> Keep chin tucked to prevent forward head extension.</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '12px' }}>Arm & Joint Angles</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li className="flex-align-center"><Check className="w-4 h-4 text-pink-500" /> Keep elbows bent at 90-100 degrees, resting on armrests.</li>
              <li className="flex-align-center"><Check className="w-4 h-4 text-pink-500" /> Adjust chair height so feet are flat on the ground.</li>
              <li className="flex-align-center"><Check className="w-4 h-4 text-pink-500" /> Keep hips at a 90-110 degree angle relative to torso.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Awareness Articles / Clinical Guides */}
      <h3 className="text-2xl font-bold mb-8 text-slate-200" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Rehabilitation Awareness Guides</h3>
      <div className="awareness-grid">
        <div className="glass-panel article-card glow-blue">
          <div>
            <div className="article-header">
              <Dumbbell className="w-5 h-5" />
              <span>Exercises</span>
            </div>
            <h4 className="article-title">Desk Stretches for "Text Neck"</h4>
            <p className="article-desc">
              Three basic 2-minute movements designed for programmers and desk workers to unlock thoracic stiffness and strengthen deep neck flexors.
            </p>
          </div>
          <button onClick={() => setActiveTab('booking-contact')} className="article-link">
            Join Posture Class <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="glass-panel article-card glow-pink">
          <div>
            <div className="article-header">
              <Activity className="w-5 h-5" />
              <span>Back Care</span>
            </div>
            <h4 className="article-title">Ergonomic Office Setup</h4>
            <p className="article-desc">
              Understand proper height adjustments for monitor placement, elbow desk support, and lumber chair angles to eliminate daily low-back pressure.
            </p>
          </div>
          <button onClick={() => setActiveTab('booking-contact')} className="article-link">
            Get Consult Sheet <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="glass-panel article-card glow-blue">
          <div>
            <div className="article-header">
              <ShieldCheck className="w-5 h-5" />
              <span>Prevention</span>
            </div>
            <h4 className="article-title">Managing Lumbar Strain</h4>
            <p className="article-desc">
              Early signs of disc compression, sciatica nerve pain triggers, and the critical importance of core stabilization over static sitting.
            </p>
          </div>
          <button onClick={() => setActiveTab('booking-contact')} className="article-link">
            Explore Back Care <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // 5. BRANCHES PAGE RENDERER
  const renderBranches = () => {
    const branches = [
      {
        name: 'Beracah Oasis (AECS Layout - Main Branch)',
        address: '115/3, ITPL Main Road, AECS Layout, Kundalahalli, Brookefield, Bengaluru - 560037',
        landmark: 'Opposite Coffee Day, behind Blue Dart Courier',
        mapLink: 'https://maps.app.goo.gl/V2w5KGAh8GjErPec8',
        phone: '+91 98863 32514',
        focus: 'Flagship Spine Care, Mechanical Decompression & Laser Therapy',
        facilities: 'Computerized Decompression Tables, Class IV Infrared Laser, TENS, muscle stimulator units',
        connectivity: 'Nearest Bus Stop: Kundalahalli Gate (200m). Easy walk from ITPL Main Rd.'
      },
      {
        name: 'Beracah Physiotherapy (Thubarahalli Branch)',
        address: 'Sai Baba Temple Road, Thubarahalli Ext Road, Ramagondanahalli, Bengaluru - 560066',
        landmark: 'Near Sai Baba Temple',
        mapLink: 'https://maps.app.goo.gl/UER4PFMWNqziiz9e8',
        phone: '+91 97412 55896',
        focus: 'Sports Rehabilitation, Kinesio Taping & Athletic Performance Analysis',
        facilities: 'Gait analysis sensor grids, athletic turfs, balance board stations, resistance walls',
        connectivity: 'Nearest Bus Stop: Thubarahalli bus stand (150m).'
      },
      {
        name: 'Beracah Physiotherapy (Ayyappa Nagar Branch)',
        address: '1st Floor, HNRKR Complex, #411, Kodigehalli Main Road, Ayyappa Nagar, KR Puram, Bengaluru - 560036',
        landmark: 'Near Bethel Nagar Arch',
        mapLink: 'https://maps.app.goo.gl/UZcJLDvpVVBwoaSQ9',
        phone: '+91 99014 26658',
        focus: 'Neurological Rehabilitation, Vestibular Balance Training & Geriatrics',
        facilities: 'Balance training beams, post-stroke sensory rehabilitation mats, functional boards',
        connectivity: 'Nearest Metro: KR Puram (1.5km). Nearest Bus Stop: Ayyappa Nagar cross (100m).'
      }
    ];

    return (
      <div className="container section">
        <div className="section-title">
          <h2>Our Branches & Locations</h2>
          <p>We operate 3 specialized clinical facilities across Bangalore, configured to serve different rehabilitation focuses.</p>
        </div>

        <div className="branches-grid">
          {branches.map((branch, index) => (
            <div key={index} className="glass-panel branch-card glow-blue">
              <div>
                <h4 className="branch-title">{branch.name}</h4>
                
                <div className="branch-info-item address">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <div className="details">
                    <p>{branch.address}</p>
                    <span>Landmark: {branch.landmark}</span>
                  </div>
                </div>

                <div className="branch-info-item details" style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  <Activity className="w-4 h-4 text-sky-400 shrink-0" />
                  <div className="details">
                    <p style={{ fontWeight: 600, color: 'white' }}>Clinical Specialty</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{branch.focus}</p>
                  </div>
                </div>

                <div className="branch-info-item details" style={{ marginTop: '8px' }}>
                  <ShieldCheck className="w-4 h-4 text-pink-500 shrink-0" />
                  <div className="details">
                    <p style={{ fontWeight: 600, color: 'white' }}>Equipped Facilities</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{branch.facilities}</p>
                  </div>
                </div>

                <div className="branch-info-item details" style={{ marginTop: '8px' }}>
                  <Compass className="w-4 h-4 text-sky-400 shrink-0" />
                  <div className="details">
                    <p style={{ fontWeight: 600, color: 'white' }}>Public Connectivity</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{branch.connectivity}</p>
                  </div>
                </div>
                
                <div className="branch-info-item phone" style={{ marginTop: '16px' }}>
                  <Phone className="w-4 h-4" />
                  <span>{branch.phone}</span>
                </div>
                
                <div className="branch-info-item hours">
                  <Clock className="w-4 h-4" />
                  <span>Mon - Sat: 8:00 AM - 9:00 PM</span>
                </div>
              </div>
              
              <a 
                href={branch.mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary branch-directions-link"
                style={{ marginTop: '20px' }}
              >
                Get Directions Map
              </a>
            </div>
          ))}
        </div>

        {/* Branch clinical capacity detail */}
        <div className="diagnostic-hub" style={{ marginTop: '40px' }}>
          <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Bangalore Infrastructure Overview</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
            All three of our Bangalore clinics are fully equipped to handle basic muscular pain assessments. However, if you require specialized computerized spinal traction or Class IV laser biostimulation, we recommend booking your slot at the **AECS Layout (Brookefield)** main branch.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            For sports conditioning, running gait corrections, and return-to-play sports testing, our **Thubarahalli** sports clinic features dedicated functional turf layouts. Neurological post-stroke care is heavily accommodated at our **Ayyappa Nagar** clinic with balance training setups.
          </p>
        </div>
      </div>
    );
  };

  // 6. BOOKING & CONTACT PAGE RENDERER
  const renderBookingContact = () => {
    const faqs = [
      {
        q: 'Do I need a doctor referral to start physiotherapy sessions?',
        a: 'No. Physiotherapists are primary practitioners. You can book an appointment directly with us. If our assessment reveals conditions requiring surgical or advanced orthopedic consultation, we will guide you to the appropriate specialist.'
      },
      {
        q: 'What should I wear to my first appointment?',
        a: 'We recommend wearing loose, comfortable clothing (like athletic wear, t-shirts, and track pants) that allows easy access to the area under treatment (e.g., shorts for knee evaluations, sleeveless tops for shoulder conditions).'
      },
      {
        q: 'Do you accept health insurance plans?',
        a: 'Yes, we provide standard clinical invoices, treatment mappings, and registration certificates necessary for claiming reimbursement from major corporate insurance providers and TPAs.'
      },
      {
        q: 'How long does a typical session last?',
        a: 'The initial assessment lasts 45 to 60 minutes to establish a diagnostic baseline. Subsequent treatment sessions typically take 45 to 75 minutes, depending on the modalities and exercises scheduled.'
      },
      {
        q: 'Do you offer home visits for physiotherapy?',
        a: 'Yes, for post-operative stroke patients, severe orthopedic conditions, or bedridden individuals who cannot visit our clinics, home rehabilitation sessions can be arranged. Please contact the AECS Layout desk directly to schedule home visits.'
      },
      {
        q: 'Can children receive physical therapy at Beracah?',
        a: 'Yes. Dr. Sarah Alva specializes in pediatric neuro-rehabilitation and physical development, focusing on balance training, posture alignment, and motor skill enhancements for children.'
      },
      {
        q: 'What is your appointment cancellation policy?',
        a: 'Please cancel or reschedule appointments at least 4 hours in advance. This allows us to allocate the vacant slot to other patients in need of urgent care.'
      }
    ];

    return (
      <div className="container section">
        <div className="section-title">
          <h2>Appointment Slot Booking</h2>
          <p>Request your treatment slot below. We will confirm your appointment via phone/email shortly.</p>
        </div>

        {/* Live Booking Form */}
        <div className="booking-form-wrapper">
          {!isBooked ? (
            <div>
              <h3 className="booking-title">Schedule an Appointment</h3>
              {bookingError && (
                <div className="booking-error-box">
                  <AlertTriangle className="w-4 h-4" />
                  {bookingError}
                </div>
              )}
              <form onSubmit={handleBookingSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Rahul Sharma" 
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Phone *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="e.g. +91 98765 43210" 
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="e.g. rahul@example.com" 
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Select Branch *</label>
                    <select 
                      className="form-control"
                      value={bookingBranch}
                      onChange={(e) => setBookingBranch(e.target.value)}
                    >
                      <option value="AECS Layout">AECS Layout (Main Branch)</option>
                      <option value="Thubarahalli">Thubarahalli Branch</option>
                      <option value="Ayyappa Nagar">Ayyappa Nagar (KR Puram)</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Preferred Doctor</label>
                    <select 
                      className="form-control"
                      value={bookingDoctor}
                      onChange={(e) => setBookingDoctor(e.target.value)}
                    >
                      <option value="Dr. Avanthi Prabhakar">Dr. Avanthi Prabhakar (Lead / Spine Specialist)</option>
                      <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar (Sports Physiotherapist)</option>
                      <option value="Dr. Sarah Alva">Dr. Sarah Alva (Neuro Physiotherapist)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Preferred Time Slot</label>
                    <select 
                      className="form-control"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    >
                      <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                      <option value="Evening (04:00 PM - 08:00 PM)">Evening (04:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Symptoms / Description</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. chronic lower back ache, shoulder stiffness" 
                      value={bookingSymptoms}
                      onChange={(e) => setBookingSymptoms(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary form-submit-btn cursor-pointer">
                  Confirm Booking Slot
                </button>
              </form>
            </div>
          ) : (
            // Booking Confirmation Receipt
            <div className="booking-receipt animate-scale-up">
              <div className="receipt-header">
                <div className="icon-box">
                  <Check className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="receipt-title">Appointment Reserved</h3>
                <span className="receipt-id">Receipt ID: {receiptNumber}</span>
              </div>
              
              <div className="receipt-details-list">
                <div className="receipt-detail-row">
                  <span className="label">Patient:</span>
                  <span className="value">{bookingName}</span>
                </div>
                <div className="receipt-detail-row">
                  <span className="label">Doctor:</span>
                  <span className="value highlight-blue">{bookingDoctor}</span>
                </div>
                <div className="receipt-detail-row">
                  <span className="label">Branch:</span>
                  <span className="value">{bookingBranch}</span>
                </div>
                <div className="receipt-detail-row">
                  <span className="label">Date:</span>
                  <span className="value highlight-pink">{bookingDate}</span>
                </div>
                <div className="receipt-detail-row">
                  <span className="label">Time:</span>
                  <span className="value">{bookingTime}</span>
                </div>
              </div>
              
              <div className="receipt-guidelines">
                <strong>Patient Guidelines:</strong> Wear loose clothing. Please arrive 10 minutes prior to your slot. Bring any previous MRI/X-Ray clinical files.
              </div>

              <div className="receipt-btn-group">
                <button 
                  onClick={resetBooking}
                  className="btn-secondary receipt-btn cursor-pointer"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Book Another Slot
                </button>
                <button 
                  onClick={() => window.print()}
                  className="btn-primary receipt-btn cursor-pointer"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Print Receipt
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Form Section */}
        <div className="inquiry-wrapper" style={{ marginTop: '80px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 className="inquiry-title">General Inquiries</h3>
          <p className="inquiry-subtitle">Have questions before booking? Send our medical desk a message.</p>
          
          {contactSent ? (
            <div className="inquiry-success-box">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>Thank you! Your inquiry was sent successfully. We will get back to you within 2 hours.</span>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="inquiry-form">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="form-control inquiry-input" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="form-control inquiry-input" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required 
              />
              <textarea 
                placeholder="How can we help you?" 
                rows={4} 
                className="form-control inquiry-textarea" 
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary inquiry-submit-btn cursor-pointer">
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Clinical FAQ section */}
        <div className="section" style={{ marginTop: '80px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', color: 'white', textAlign: 'center', marginBottom: '32px' }}>Frequently Asked Questions</h3>
          <div className="flex flex-col" style={{ gap: '16px' }}>
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="glass-panel" 
                style={{ padding: '20px', cursor: 'pointer', borderRadius: '12px' }}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <div className="flex-justify-between" style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary-pink)', fontSize: '1.2rem', userSelect: 'none' }}>
                    {activeFaq === i ? '−' : '+'}
                  </span>
                </div>
                <div 
                  style={{ 
                    maxHeight: activeFaq === i ? '200px' : '0px', 
                    overflow: 'hidden', 
                    transition: 'all 0.3s ease',
                    marginTop: activeFaq === i ? '12px' : '0px'
                  }}
                >
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Active Tab Router */}
      <main className={`flex-grow transition-all duration-300 ${animatePage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {activeTab === 'home' && renderHome()}
        {activeTab === 'about' && renderAbout()}
        {activeTab === 'doctors' && renderDoctors()}
        {activeTab === 'awareness' && renderAwareness()}
        {activeTab === 'branches' && renderBranches()}
        {activeTab === 'booking-contact' && renderBookingContact()}
      </main>

      {/* Global Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">
            BERACAH <span>Oasis</span>
          </div>
          <p className="footer-text">Licensed Physiotherapy & Orthopedic Spine Rehabilitation Clinic.</p>
          <p className="footer-copyright">© 2026 Beracah Oasis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
