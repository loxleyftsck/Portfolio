import { MotionConfig } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <a className="skip-link" href="#main">Skip to content</a>
        <Navbar />
        <main id="main">
          <Hero />
          <Projects />
          <About />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
