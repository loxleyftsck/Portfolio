import { Mail } from '../ui/Icons';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { meta, social } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          By {meta.fullName}
        </p>
        <div className="flex items-center gap-4">
          <a href={social.github} target="_blank" rel="noopener" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <GithubIcon size={18} />
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${social.email}`} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
