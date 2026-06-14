'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { href: '/#layanan', label: 'Layanan' },
  { href: '/#harga', label: 'Harga' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/order', label: 'Pesan Sekarang' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > lastY && y > 100)
      setLastY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-lg shadow-blue-900/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center neon-glow">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                RITEL<span className="text-blue-400">WEB</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 3).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 hover:neon-text"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/order"
                className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold text-white relative z-10"
              >
                Pesan Sekarang
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg glass"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-blue-900/30 md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                    link.label === 'Pesan Sekarang'
                      ? 'btn-primary text-white text-center'
                      : 'text-slate-300 hover:text-white hover:bg-blue-900/20'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
