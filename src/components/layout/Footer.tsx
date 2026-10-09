import { ArrowUpRight } from 'lucide-react';
import { meta } from '../../data/portfolio';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>By {meta.fullName}</p>
        <a href="#hero">Back to top <ArrowUpRight size={15} /></a>
      </div>
    </footer>
  );
}
