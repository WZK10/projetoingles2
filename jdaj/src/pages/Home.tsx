
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {BookOpen, Users, Award, Clock, Star, Play, MessageCircleDashed as MessageCircle, Globe, Brain, Zap, Target, CheckCircle} from 'lucide-react'

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Interactive Lessons',
      description: 'Engaging lessons with multimedia content, exercises, and real-time feedback to accelerate your learning.',
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: 'AI Chat Assistant',
      description: 'Practice conversations with our AI tutor available 24/7 to help improve your speaking and comprehension.',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Translation Tools',
      description: 'Instant translation and language analysis tools to help you understand and learn new vocabulary.',
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Personalized Learning',
      description: 'Adaptive learning paths that adjust to your pace and learning style for optimal progress.',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Progress Tracking',
      description: 'Detailed analytics and progress reports to monitor your improvement and stay motivated.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Certifications',
      description: 'Earn recognized certificates upon course completion to showcase your English proficiency.',
    },
  ]

  const stats = [
    { number: '50,000+', label: 'Active Students' },
    { number: '1,200+', label: 'Lessons Available' },
    { number: '95%', label: 'Success Rate' },
    { number: '24/7', label: 'AI Support' },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'This platform transformed my English skills in just 3 months. The AI chat feature is incredibly helpful for practicing conversations.',
      rating: 5,
    },
    {
      name: 'Carlos Rodriguez',
      role: 'Software Developer',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'The interactive lessons and personalized learning path made all the difference. I finally feel confident speaking English at work.',
      rating: 5,
    },
    {
      name: 'Li Wei',
      role: 'University Student',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      content: 'Amazing platform! The translation tools and text analysis features helped me understand complex English texts much better.',
      rating: 5,
    },
  ]

  const plans = [
    {
      name: 'Basic',
      price: 29,
      period: 'month',
      features: ['50 Lessons', 'Basic AI Chat', 'Progress Tracking', 'Mobile Access'],
      popular: false,
    },
    {
      name: 'Premium',
      price: 59,
      period: 'month',
      features: ['Unlimited Lessons', 'Advanced AI Chat', 'All Tools Access', 'Priority Support', 'Certificates'],
      popular: true,
    },
    {
      name: 'Pro',
      price: 99,
      period: 'month',
      features: ['Everything in Premium', '1-on-1 Tutoring', 'Custom Learning Path', 'Business English', 'Live Sessions'],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master English with
                <span className="block text-yellow-300">AI-Powered Learning</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Interactive lessons, AI chat assistant, and personalized learning paths 
                to help you achieve English fluency faster than ever.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/lessons"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Start Learning Now
                </Link>
                <Link
                  to="/chat"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-300 text-center flex items-center justify-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Try AI Chat</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-float">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-gray-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Chat Assistant</h3>
                    <p className="text-gray-200">Practice anytime, anywhere</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm">"How do I improve my pronunciation?"</p>
                  </div>
                  <div className="bg-yellow-400/20 rounded-lg p-3 ml-4">
                    <p className="text-sm">Let me help you with some pronunciation exercises...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology meets proven teaching methods to deliver 
              the most effective English learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg card-hover"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful English learners worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible plans designed to fit your learning goals and budget
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-xl p-8 shadow-lg ${
                  plan.popular ? 'ring-4 ring-blue-600 transform scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-full text-center mb-4">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-600">/{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/subscriptions"
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors text-center block ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your English Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their English skills. 
              Start your free trial today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lessons"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
              </Link>
              <Link
                to="/subscriptions"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-300"
              >
                View All Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
