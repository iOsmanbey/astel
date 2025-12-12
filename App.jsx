import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Calendar, ChevronRight, ArrowRight, CheckCircle, Printer } from 'lucide-react';

// Consolidated Event Data (Including Past Events)
const allEvents = [
  {
    id: 1,
    title: "KIMES 2025",
    date: "March 14-17, 2025",
    location: "COEX, Seoul, Korea",
    desc: "Join us at the 40th Korea International Medical & Hospital Equipment Show.",
    isPast: false
  },
  {
    id: 2,
    title: "Arab Health 2025",
    date: "Jan 27-30, 2025",
    location: "Dubai World Trade Centre",
    desc: "Discover our latest digital radiography solutions at the Middle East's largest healthcare event.",
    isPast: false
  },
  {
    id: 3,
    title: "RSNA 2025",
    date: "Dec 1-5, 2025",
    location: "McCormick Place, Chicago",
    desc: "Experience the future of radiology with Astel's newest FPD technology.",
    isPast: false
  },
  {
    id: 4,
    title: "Hospitalar 2024",
    date: "May 21-24, 2024",
    location: "São Paulo, Brazil",
    desc: "Showcasing our mobile FPDs in Latin America and connecting with distributors.",
    isPast: true
  },
  {
    id: 5,
    title: "E-HEALTH 2024",
    date: "June 2-4, 2024",
    location: "Berlin, Germany",
    desc: "A focus on AI integration and software solutions in medical imaging.",
    isPast: true
  }
];


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [prefillMessage, setPrefillMessage] = useState('');
  const [showAllEvents, setShowAllEvents] = useState(false); // New state for toggling events

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const contactInfo = {
    name: "Michael Ernazarov",
    email: "michael1@astel.co.kr",
    phone: "+82-42-360-2100",
    fax: "+82-42-360-2113",
    mobile: "+82-10-4692-1998",
    address: "26-79, Gajeongbuk-ro, Yuseong-gu, Daejeon 34113, Korea"
  };

  const products = [
    {
      id: "DRA1417SC",
      name: "DRA1417SC",
      type: "Static",
      desc: "High-resolution static flat panel detector optimized for general radiography.",
      features: ["High DQE", "Fast Acquisition", "Stable Connection"]
    },
    {
      id: "DRA1417MC",
      name: "DRA1417MC",
      type: "Mobile",
      desc: "Wireless mobile solution offering freedom of movement for varied clinical settings.",
      features: ["Lightweight", "Long Battery Life", "Wireless Connectivity"]
    },
    {
      id: "RFA-1717MC",
      name: "RFA-1717MC",
      type: "Mobile",
      desc: "Large format wireless detector designed for versatility and high throughput.",
      features: ["17x17 inch FOV", "Auto-trigger", "Robust Design"]
    },
    {
      id: "RFA-1717DIC",
      name: "RFA-1717DIC (AC)",
      type: "Static",
      desc: "Premium static detector delivering exceptional image quality for demanding diagnostics.",
      features: ["Direct Interface", "High Contrast", "AC Powered"]
    }
  ];

  const handleBookMeeting = (event) => {
    // Check if event is past
    if (event.isPast) {
      setPrefillMessage(`I am inquiring about the ${event.title} event held on ${event.date} and would like to receive follow-up information or materials from that show.`);
    } else {
      // Set the product dropdown to "Other"
      setActiveModal('Other');
      // Pre-fill the message with event details
      setPrefillMessage(`I would like to request a meeting during ${event.title}.\nLocation: ${event.location}\nDate: ${event.date}\n\nPlease let me know your available slots.`);
    }

    // Smooth scroll to the quote section
    const quoteSection = document.getElementById('quote');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Logic to filter events based on showAllEvents state
  const visibleEvents = showAllEvents 
    ? allEvents 
    : allEvents.filter(e => !e.isPast);

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
             {/* Logo Section - Using uploaded file */}
             <div className="h-10 md:h-12 flex items-center">
                <img 
                  src="ASTEL-LOGO-2953X785.png" 
                  alt="ASTEL" 
                  className="h-full w-auto object-contain"
                />
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-slate-600 hover:text-blue-700 font-medium transition">Home</a>
            <a href="#products" className="text-slate-600 hover:text-blue-700 font-medium transition">Products</a>
            <a href="#events" className="text-slate-600 hover:text-blue-700 font-medium transition">Events</a>
            <a href="#contact" className="text-slate-600 hover:text-blue-700 font-medium transition">Contact</a>
            <a 
              href="#quote" 
              className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-700 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 border-t border-slate-100">
            <a href="#home" className="text-slate-600 font-medium" onClick={toggleMenu}>Home</a>
            <a href="#products" className="text-slate-600 font-medium" onClick={toggleMenu}>Products</a>
            <a href="#events" className="text-slate-600 font-medium" onClick={toggleMenu}>Events</a>
            <a href="#contact" className="text-slate-600 font-medium" onClick={toggleMenu}>Contact</a>
            <a href="#quote" className="text-blue-700 font-bold" onClick={toggleMenu}>Get a Quote</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-100 to-blue-50 opacity-70"></div>
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/50 rounded-l-full transform translate-x-1/3 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-2">
                Advanced Digital Radiography
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Crystal Clear <span className="text-blue-700">Imaging</span> Solutions
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Innovating healthcare with state-of-the-art Flat Panel Detectors. Experience precision, speed, and reliability with ASTEL.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="#products" className="px-8 py-3 bg-blue-700 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-lg flex items-center gap-2">
                  View Products <ArrowRight size={20} />
                </a>
                <a href="#contact" className="px-8 py-3 bg-white text-slate-700 font-bold rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md flex justify-center">
                <div className="absolute inset-0 bg-blue-200 rounded-full filter blur-3xl opacity-30 transform scale-110"></div>
                {/* Hero Image - Using uploaded file */}
                <img 
                  src="DR_ copy.png" 
                  alt="ASTEL Flat Panel Detector" 
                  className="relative z-10 h-auto w-3/4 md:w-full object-contain drop-shadow-2xl transform -rotate-6 hover:rotate-0 transition duration-700 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Bar */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">Global</div>
              <div className="text-blue-200 text-sm">Distribution Network</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">ISO</div>
              <div className="text-blue-200 text-sm">Certified Quality</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-blue-200 text-sm">Technical Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">Premium</div>
              <div className="text-blue-200 text-sm">FPD Technology</div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Our Technology</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Flat Panel Detectors</h3>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-slate-50 rounded-xl overflow-hidden hover:shadow-2xl transition duration-300 border border-slate-100 flex flex-col">
                <div className="h-64 p-8 flex items-center justify-center bg-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                     {product.type}
                   </div>
                   {/* Product Card Image - Using uploaded file */}
                   <img 
                      src="DR_ copy.png" 
                      alt={product.name} 
                      className="h-full w-auto object-contain group-hover:scale-105 transition duration-500"
                   />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h4>
                  <p className="text-slate-600 text-sm mb-4 flex-grow">{product.desc}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-500">
                        <CheckCircle size={14} className="text-green-500 mr-2" /> {feature}
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="#quote"
                    className="w-full block text-center py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition"
                    onClick={() => setActiveModal(product.name)}
                  >
                    Request Pricing
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-24 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Networking</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                {showAllEvents ? 'All Company Events' : 'Upcoming Events'}
              </h3>
            </div>
            {/* UPDATED: Toggle button for View All Events */}
            <button 
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="flex items-center text-blue-700 font-semibold hover:text-blue-900 mt-4 md:mt-0 transition"
            >
              {showAllEvents ? (
                <>
                  View Only Upcoming <ChevronRight size={20} className="rotate-180" />
                </>
              ) : (
                <>
                  View All Past Events <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {visibleEvents.map((event) => (
              <div 
                key={event.id} 
                className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border-l-4 flex flex-col ${
                  event.isPast 
                    ? 'border-slate-400 opacity-75' 
                    : 'border-blue-600'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`flex items-center font-semibold ${event.isPast ? 'text-slate-500' : 'text-blue-600'}`}>
                    <Calendar size={18} className="mr-2" />
                    {event.date}
                  </div>
                  {event.isPast && (
                    <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">PAST EVENT</span>
                  )}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h4>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <MapPin size={16} className="mr-1" /> {event.location}
                </div>
                <p className="text-slate-600 text-sm mb-6 flex-grow">{event.desc}</p>
                <button 
                  onClick={() => handleBookMeeting(event)}
                  disabled={event.isPast && !showAllEvents} // Optionally disable 'Book Meeting' if past and not viewing all
                  className={`w-full text-center py-2 font-bold rounded-lg transition ${
                    event.isPast
                      ? 'border border-slate-300 text-slate-500 bg-slate-100 cursor-pointer hover:bg-slate-200' // Changed to cursor-pointer to allow click for inquiry
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  {event.isPast ? 'Inquire for Details' : 'Book Meeting'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote/Contact Section */}
      <section id="quote" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="bg-blue-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Form Side */}
            <div className="md:w-3/5 p-8 md:p-12 lg:p-16 bg-white">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Get a Quote / Book Meeting</h3>
              <p className="text-slate-600 mb-8">Tell us about your requirements or preferred meeting time.</p>
              
              <QuoteForm 
                defaultInterest={activeModal} 
                initialMessage={prefillMessage}
                contactEmail={contactInfo.email} 
              />
            </div>

            {/* Info Side */}
            <div className="md:w-2/5 bg-blue-800 p-8 md:p-12 text-blue-50 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-700 rounded-full opacity-50"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-900 rounded-full opacity-50"></div>
              
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-6">Contact Information</h4>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-700 p-2 rounded-lg mr-4">
                       <MapPin size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-1">Address</p>
                      <p className="text-white leading-relaxed">{contactInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-700 p-2 rounded-lg mr-4">
                       <Phone size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-1">Phone / Fax</p>
                      <p className="text-white">T: {contactInfo.phone}</p>
                      <p className="text-blue-200">F: {contactInfo.fax}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-700 p-2 rounded-lg mr-4">
                       <Mail size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm font-medium uppercase tracking-wide mb-1">Direct Contact</p>
                      <p className="text-white font-bold">{contactInfo.name}</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-blue-200 hover:text-white transition block">{contactInfo.email}</a>
                      <p className="text-white mt-2 flex items-center gap-2">
                        <span className="bg-green-500 w-2 h-2 rounded-full"></span> 
                        WhatsApp: {contactInfo.mobile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative z-10">
                 <p className="text-sm text-blue-300">"Committed to excellence in medical imaging technology."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                 {/* Footer Logo - Using uploaded file */}
                 <img src="ASTEL-LOGO-2953X785.png" alt="Astel Logo" className="h-8 w-auto brightness-0 invert" />
              </div>
              <p className="max-w-xs mb-6">Leading provider of digital radiography solutions, delivering high-quality imaging for better diagnostics worldwide.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Products</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Static Detectors</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Mobile Detectors</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Veterinary Solutions</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Software</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Astel Co., Ltd. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">In</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">Tw</div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">Fb</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Separated Form Component for cleaner logic
const QuoteForm = ({ defaultInterest, initialMessage, contactEmail }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    product: '',
    message: ''
  });

  // Handle product pre-selection
  useEffect(() => {
    if (defaultInterest) {
      setFormData(prev => ({ ...prev, product: defaultInterest }));
    }
  }, [defaultInterest]);

  // Handle message pre-filling (for booking meetings)
  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct Mailto Link
    const subject = `Inquiry: ${formData.product || 'General'}`;
    const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}
Interest: ${formData.product}

Message:
${formData.message}

--
Sent via ASTEL Website Quote Form
    `;

    // Encode components
    const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // NOTE: Replaced alert() with console log as per instruction
    console.log("Attempting to open email client to send the request to Michael Ernazarov.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input 
            required 
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
            placeholder="John" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input 
            required 
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
            placeholder="Doe" 
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
        <input 
          required 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
          placeholder="john@hospital.com" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Company / Hospital</label>
        <input 
          type="text" 
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
          placeholder="General Hospital" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Topic / Product</label>
        <select 
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
        >
          <option value="">Select a topic...</option>
          <option value="DRA1417SC">DRA1417SC (Static)</option>
          <option value="DRA1417MC">DRA1417MC (Mobile)</option>
          <option value="RFA-1717MC">RFA-1717MC (Mobile)</option>
          <option value="RFA-1717DIC">RFA-1717DIC (Static)</option>
          <option value="Other">Other / General Inquiry / Meeting</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        <textarea 
          rows="4" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
          placeholder="I would like to know the pricing for..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg flex justify-center items-center gap-2"
      >
        <Mail size={18} /> Send Request
      </button>
      <p className="text-xs text-center text-slate-400 mt-2">
        This will open your default email client.
      </p>
    </form>
  );
};

export default App;