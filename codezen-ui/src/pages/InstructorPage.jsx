import { motion } from 'framer-motion'

const InstructorPage = () => {
  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-20"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-6">
            Instructor Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Instructor tools and course management coming soon! Create and manage your courses.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default InstructorPage