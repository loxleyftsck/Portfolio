import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowRight } from '../components/ui/Icons';
import { GithubIcon, LinkedinIcon } from '../components/ui/Icons';
import { social } from '../data/portfolio';

interface ContactLink {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
  desc: string;
}

const links: ContactLink[] = [
  { icon: Mail, label: 'Email', href: `mailto:${social.email}`, desc: social.email },
  { icon: GithubIcon, label: 'GitHub', href: social.github, desc: 'loxleyftsck' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: social.linkedin, desc: 'heraldginting' },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="max-w-2xl"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title mb-4">Get in touch</h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
            Open to AI engineering roles, research collaboration, and freelance work. Email is the
            fastest way to reach me.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 mb-10">
            {links.map(({ icon: Icon, label, href, desc }, i) => (
              <motion.a
                key={label}
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : i * 0.08 }}
                className="card card-hover flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-gray-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-gray-900 transition-all duration-200">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">{label}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">{desc}</div>
                </div>
                <ArrowRight size={14} className="text-gray-300 dark:text-gray-700 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mt-auto" />
              </motion.a>
            ))}
          </div>

          <a href={`mailto:${social.email}`} className="btn-primary">
            Send an Email <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
