'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import {
  MapPin,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  Layers,
  Search,
  FileText,
  Briefcase,
  Check,
} from 'lucide-react'

function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!startOnView || !ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, startOnView])

  return { count, ref }
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stat1 = useCountUp(500, 2000)
  const stat2 = useCountUp(15, 2000)
  const stat3 = useCountUp(100, 2000)
  const stat4 = useCountUp(49, 2000)

  const navLinks = [
    { label: 'About', href: '#story' },
    { label: 'Services', href: '#services' },
    { label: 'Land Pooling', href: '#land-pooling' },
    { label: 'Why Us', href: '#why-us' },
  ]

  return (
    <div className="w-full bg-[#fafaf8]">
      {/* ═══════════════════════════════════════════════════════════════
          NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="Greentik Acres"
              width={280}
              height={80}
              className="h-11 sm:h-16 lg:h-20 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[13px] font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:opacity-100 ${
                  scrolled
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919217982002"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                scrolled
                  ? 'bg-[#00A01B] text-white hover:bg-[#008a17]'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              +91 92179 82002
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || mobileMenuOpen ? 'text-gray-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-[14px] font-medium text-gray-700 hover:text-[#00A01B] transition-colors border-b border-gray-50 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919217982002"
              className="flex items-center justify-center gap-2 mt-3 px-5 py-3 rounded-full bg-[#00A01B] text-white text-[14px] font-semibold"
            >
              <Phone className="w-4 h-4" />
              +91 92179 82002
            </a>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION — Full-bleed cinematic
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.png"
            alt="Premium land investment"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 pt-28 pb-16 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 w-full relative z-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 md:mb-8 animate-[fadeInUp_0.6s_ease-out]">
              <div className="h-px w-10 bg-[#00A01B]" />
              <span className="text-[11px] md:text-[12px] uppercase tracking-[0.25em] font-semibold text-[#00A01B]">
                Trusted by 15,000+ investors
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold text-white leading-[1.1] mb-6 md:mb-8 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              Invest in Land.
              <br />
              <span className="text-[#4ADE80]">Build Your Legacy.</span>
            </h1>

            {/* Subline */}
            <p className="text-base md:text-xl text-white/75 leading-relaxed max-w-xl mb-8 md:mb-10 animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              Greentik Acres brings transparency, trust, and assured returns to
              land investment. Every property legally verified. Every deal
              transparent.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <a
                href="#services"
                className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-[#00A01B] text-white rounded-full text-[15px] font-semibold hover:bg-[#008a17] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,160,27,0.35)] w-full sm:w-auto text-center"
              >
                Our Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#story"
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full text-[15px] font-semibold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-white/40" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS BAR — Floating glassmorphism card
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-10 sm:-mt-16 lg:-mt-20 z-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
            {[
              {
                ref: stat1.ref,
                value: `${stat1.count}+`,
                label: 'Verified Properties',
                icon: MapPin,
              },
              {
                ref: stat2.ref,
                value: `${stat2.count}K+`,
                label: 'Happy Investors',
                icon: Users,
              },
              {
                ref: stat3.ref,
                value: `${stat3.count}%`,
                label: 'Title Cleared',
                icon: CheckCircle,
              },
              {
                ref: stat4.ref,
                value: `${(stat4.count / 10).toFixed(1)}★`,
                label: 'Client Rating',
                icon: Shield,
              },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={i}
                  ref={stat.ref}
                  className={`flex flex-col items-center justify-center py-6 md:py-8 px-4 text-center ${
                    i % 2 === 0 ? 'border-r border-gray-100' : 'border-r-0 md:border-r md:border-gray-100 md:last:border-r-0'
                  } ${i < 2 ? 'border-b border-gray-100 md:border-b-0' : 'border-b-0'}`}
                >
                  <Icon className="w-5 h-5 text-[#00A01B] mb-3" />
                  <p className="text-xl md:text-3xl font-bold text-gray-900 tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-[12px] text-gray-500 mt-1 uppercase tracking-wide font-medium">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STORY SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="story" className="py-16 md:py-28 lg:py-36">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#00A01B]" />
                <span className="text-[12px] uppercase tracking-[0.25em] font-semibold text-[#00A01B]">
                  Our Story
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-6 md:mb-8">
                Redefining Land
                <br />
                Investment in India
              </h2>
              <div className="space-y-4 md:space-y-5 text-gray-600 leading-[1.8] text-sm md:text-[16px]">
                <p>
                  Land investment should be simple, transparent, and rewarding.
                  Yet too many investors face uncertainty, delays, and hidden
                  complications that turn a promising opportunity into a
                  frustrating experience.
                </p>
                <p>
                  We built Greentik Acres to change that. With verified
                  properties, instant registry support, and a commitment to
                  investor success, we&apos;re building the future of land
                  investment — one where trust isn&apos;t earned through words,
                  but through action.
                </p>
                <p>
                  Every property on our platform meets strict legal and financial
                  standards. Every investor receives complete transparency. Every
                  journey leads to assured returns.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative h-[280px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
                <Image
                  src="/hero-image.png"
                  alt="The Greentik Acres Story"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] p-5 hidden md:flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#00A01B]/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#00A01B]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">
                    100% Verified
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Every property legally audited
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          OUR SERVICES SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 md:py-28 lg:py-36 bg-[#f5f5f0]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#00A01B]" />
              <span className="text-[12px] uppercase tracking-[0.25em] font-semibold text-[#00A01B]">
                Our Services
              </span>
              <div className="h-px w-10 bg-[#00A01B]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-4 md:mb-5">
              Comprehensive Land Solutions
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto">
              Whether you are looking to purchase, pool, or divest land assets,
              we guide you with complete safety and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: Layers,
                title: 'Land Pooling',
                desc: 'Participate in professionally managed land pooling opportunities that aim to unlock the future value of strategically located land parcels.',
              },
              {
                icon: Search,
                title: 'Land Buying',
                desc: 'Choose from verified residential, commercial, and agricultural land options in promising locations.',
              },
              {
                icon: FileText,
                title: 'Land Selling',
                desc: 'Sell your property through our trusted network with complete documentation and smooth processing.',
              },
              {
                icon: Briefcase,
                title: 'Investment Planning',
                desc: 'Receive personalized guidance to build a diversified land investment portfolio.',
              },
            ].map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 md:p-8 hover:shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition-all duration-500 border border-gray-100 hover:border-transparent flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00A01B]/8 flex items-center justify-center mb-0 group-hover:bg-[#00A01B] transition-colors duration-300 flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#00A01B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LAND POOLING DETAIL SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="land-pooling" className="py-16 md:py-28 lg:py-36">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Main content */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#00A01B]" />
                <span className="text-[12px] uppercase tracking-[0.25em] font-semibold text-[#00A01B]">
                  Featured Service
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-4">
                Land Pooling
              </h2>
              <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-6">
                Unlock the True Potential of Land
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-[1.8] mb-8">
                Land Pooling allows investors to participate in larger development
                opportunities by combining land resources. This approach can
                significantly enhance the future value of your investment while
                minimizing individual management complexities.
              </p>

              <div className="border-t border-gray-100 pt-8">
                <h4 className="text-[14px] uppercase tracking-[0.1em] font-bold text-gray-900 mb-5">
                  Pooling Benefits
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Professionally managed process',
                    'Legal documentation support',
                    'Better development potential',
                    'Increased future appreciation',
                    'Transparent ownership records',
                  ].map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-gray-600 text-sm md:text-[15px]">
                      <Check className="w-4 h-4 text-[#00A01B] mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How it works side card */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">
                How It Works
              </h3>
              <div className="space-y-6">
                {[
                  { step: 'Step 1', title: 'Choose Your Investment Plan' },
                  { step: 'Step 2', title: 'Complete Documentation & Verification' },
                  { step: 'Step 3', title: 'Property Registration' },
                  { step: 'Step 4', title: 'Track Your Investment Benefits' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#00A01B]/10 text-[#00A01B] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                        {item.step}
                      </p>
                      <h4 className="text-sm md:text-base font-semibold text-gray-800">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY US SECTION (Updated for trust items)
      ═══════════════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-16 md:py-28 lg:py-36 bg-[#f5f5f0]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#00A01B]" />
              <span className="text-[12px] uppercase tracking-[0.25em] font-semibold text-[#00A01B]">
                Why Investors Trust Greentik Acres
              </span>
              <div className="h-px w-10 bg-[#00A01B]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-gray-900 leading-tight mb-4 md:mb-5">
              Secure. Transparent. Expertly Handled.
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto">
              Our framework ensures that every transaction is completely secure
              and aligned with long-term capital preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Land Projects',
                desc: 'Rigorous legal clearances and verification checks performed on all land assets prior to transaction closure.',
              },
              {
                icon: FileText,
                title: 'Professional Documentation',
                desc: 'End-to-end administration of paperwork, contract structures, and official document checks.',
              },
              {
                icon: CheckCircle,
                title: 'Transparent Investment Process',
                desc: 'Total disclosure of terms, transparent milestones, and zero hidden operational costs.',
              },
              {
                icon: Users,
                title: 'Dedicated Customer Support',
                desc: 'A specialized service advisor assigned directly to you to coordinate all verification and pooling events.',
              },
              {
                icon: MapPin,
                title: 'Secure Registration Assistance',
                desc: 'Comprehensive local registry assistance to achieve clean title transfer and official government records.',
              },
              {
                icon: TrendingUp,
                title: 'Long-Term Investment Opportunities',
                desc: 'Strategic selection in key developmental pathways ensuring sustainable future valuations.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 md:p-8 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] transition-all duration-500 border border-gray-100 hover:border-transparent"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00A01B]/8 flex items-center justify-center mb-6 group-hover:bg-[#00A01B] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#00A01B] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-[17px] font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION (Book free consultation & programs list)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        id="community"
        className="relative py-16 md:py-28 lg:py-36 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a1a0a]" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a0a] via-[#0a1a0a]/90 to-[#0a1a0a]/50" />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: text content & main actions */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#4ADE80]" />
                <span className="text-[12px] uppercase tracking-[0.25em] font-semibold text-[#4ADE80]">
                  Get In Touch
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-white leading-tight mb-6">
                Start Your Land Investment Journey Today
              </h2>
              <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-8 md:mb-10 max-w-lg">
                Discover verified land opportunities designed to help you build wealth with confidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a
                  href="tel:+919217982002"
                  className="group flex items-center justify-center gap-2.5 px-8 py-4 bg-[#00A01B] text-white rounded-full text-[15px] font-semibold hover:bg-[#008a17] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,160,27,0.4)] w-full sm:w-auto text-center"
                >
                  <Phone className="w-4 h-4" />
                  Book a Free Consultation
                </a>
                <a
                  href="mailto:info@greentikacres.com"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/15 rounded-full text-[15px] font-semibold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </div>

            {/* Right Column: Key Plans List */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
              <h3 className="text-white text-lg font-bold mb-6">
                Exclusive Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  '100% Cashback* Plans Available',
                  'Instant Registry Support',
                  'Assured Return Programs*',
                  'Buy Back Assistance*',
                  'Verified & Legal Properties',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/95 text-sm md:text-base">
                    <div className="w-6 h-6 rounded-full bg-[#4ADE80]/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-white/10 mt-12 pt-6">
            <p className="text-[12px] text-white/40 leading-relaxed max-w-5xl">
              *Benefits, cashback, buyback, and return programs are applicable only on selected investment plans and are subject to the terms and conditions of Greentik Acres.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#111111] text-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 mb-16">
            {/* Brand */}
            <div className="md:col-span-4">
              <div className="flex items-center mb-5">
                <Image
                  src="/logo.png"
                  alt="Greentik Acres"
                  width={240}
                  height={64}
                  className="h-12 md:h-16 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-500 text-[14px] leading-relaxed max-w-sm">
                Transparent, verified, and rewarding land investment for
                everyone. Building trust, one property at a time.
              </p>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <h4 className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-5">
                Platform
              </h4>
              <ul className="space-y-3">
                {['Services', 'Land Pooling', 'How It Works', 'Why Us'].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="text-[14px] text-gray-500 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-5">
                Company
              </h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[14px] text-gray-500 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-5">
                Legal
              </h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Use', 'Compliance', 'RERA'].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-[14px] text-gray-500 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[12px] uppercase tracking-[0.15em] font-bold text-gray-400 mb-5">
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+919217982002"
                    className="text-[14px] text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    +91 92179 82002
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@greentikacres.com"
                    className="text-[14px] text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    info@greentikacres.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[13px] text-gray-600">
              &copy; 2026 Greentik Acres. All rights reserved.
            </p>
            <p className="text-[12px] text-gray-700">
              Crafted with care for smart investors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
