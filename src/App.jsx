import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Jurisdiction from './components/Jurisdiction.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Announcements from './components/Announcements.jsx';
import FloatingContact from './components/FloatingContact.jsx';
import AnnouncementSpotlight from './components/AnnouncementSpotlight.jsx';

function App() {
  return (
    <div>
      <Navbar />
    
      <Hero />
   
      <About />
      <Services />
      <Process />
      <Jurisdiction />
      <Contact />
       <Announcements />
      <Footer />
      
    </div>
  );
}

export default App;
