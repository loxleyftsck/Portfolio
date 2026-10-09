import { GithubIcon, LinkedinIcon } from '../components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';
import { social } from '../data/portfolio';
import Reveal from '../components/ui/Reveal';

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <img className="contact-art" src="/art/attractor.webp" alt="" loading="lazy" width="1280" height="853" />
      <div className="shell contact-inner">
        <Reveal>
          <h2>Get in<br /><span className="accent">touch.</span></h2>
          <p>Open to AI engineering roles, research collaboration, and freelance work. Email is the fastest way to reach me.</p>
          <a href={'mailto:' + social.email} className="contact-email">{social.email}<ArrowUpRight size={26} /></a>
          <div className="contact-socials">
            <a href={social.github} target="_blank" rel="noopener noreferrer"><GithubIcon size={17} />GitHub<ArrowUpRight size={15} /></a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={17} />LinkedIn<ArrowUpRight size={15} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
