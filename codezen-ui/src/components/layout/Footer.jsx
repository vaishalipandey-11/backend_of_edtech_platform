import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  AcademicCapIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon
} from 'lucide-react'

const Footer = () => {
  const footerSections = {
    platform: {
      title: 'Platform',
      links: [
        { name: 'Browse Courses', href: '/courses' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Free Courses', href: '/courses?filter=free' },
        { name: 'Business', href: '/business' },
        { name: 'Mobile App', href: '/mobile' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'System Status', href: '/status' },
        { name: 'Bug Reports', href: '/bugs' },
        { name: 'Feature Requests', href: '/features' }
      ]
    },
    community: {
      title: 'Community',
      links: [
        { name: 'Forums', href: '/forums' },
        { name: 'Discord', href: '/discord' },
        { name: 'Blog', href: '/blog' },
        { name: 'Podcast', href: '/podcast' },
        { name: 'Events', href: '/events' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Investors', href: '/investors' },
        { name: 'Partners', href: '/partners' }
      ]
    }
  }

  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, href: '#' },
    { name: 'Twitter', icon: TwitterIcon, href: '#' },
    { name: 'Instagram', icon: InstagramIcon, href: '#' },
    { name: 'LinkedIn', icon: LinkedInIcon, href: '#' },
    { name: 'YouTube', icon: YouTubeIcon, href: '#' }
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Newsletter signup logic would go here
    console.log('Newsletter signup')
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-dark-800 to-dark-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Stay Updated with CodeZen
              </h3>
              <p className="text-gray-300">
                Get the latest courses, tips, and industry insights delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold gradient-text">
                  CodeZen
                </h2>
                <p className="text-xs text-gray-400 -mt-1">
                  Master coding with clarity
                </p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              CodeZen is the world's leading online learning platform for coding and technology. 
              Join millions of developers advancing their careers through our comprehensive courses.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <EnvelopeIcon className="w-5 h-5" />
                <span>support@codezen.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <PhoneIcon className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPinIcon className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} CodeZen. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer