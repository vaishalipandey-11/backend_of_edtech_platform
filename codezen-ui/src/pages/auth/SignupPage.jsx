import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full text-center"
      >
        <Link to="/" className="inline-flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <AcademicCapIcon className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-display font-bold gradient-text">CodeZen</span>
        </Link>
        
        <div className="card">
          <h1 className="text-3xl font-display font-bold gradient-text mb-6">
            Join CodeZen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Sign up page coming soon! Create your account to start learning.
          </p>
          <div className="mt-6">
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SignupPage