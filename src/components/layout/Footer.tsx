import Link from 'next/link';
import { Twitter, Mail, Globe } from 'lucide-react';
import { socialLinks, navigationLinks } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200" style={{backgroundColor: '#e8e3d5'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-light text-neutral-900 tracking-wider">
                r i a l l e r y
              </div>
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 max-w-md">
              a digital gallery celebrating the creative spirit of the rialo community. 
              minimalist presentation. thoughtful curation. art-focused experience.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
                aria-label="Visit Rialo website"
              >
                <Globe className="h-5 w-5" />
              </a>
              <Link
                href="/contact"
                className="p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-white transition-colors"
                aria-label="Contact us"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <nav className="flex flex-col space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Community
            </h3>
            <nav className="flex flex-col space-y-3">
              <a
                href={socialLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Join Discord
              </a>
              <Link
                href="/contact"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Submit Artwork
              </Link>
              <a
                href={socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Rialo.io
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs text-neutral-500">
            © {currentYear} Rialo Community. All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0 flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}