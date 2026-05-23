import Hero from '../components/Hero';
import MarqueeStrip from '../components/MarqueeStrip';
import About from '../components/About';
import Skills from '../components/Skills';
import Certificates from '../components/Certificates';
import Experience from '../components/Experience';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <About />
      <MarqueeStrip reverse />
      <Skills />
      <Certificates />
      <Experience />
      <Gallery />
      <Contact />
    </main>
  );
}
