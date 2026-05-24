import { useState, useRef, Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';
import svgPaths from "../../imports/HomeMobile/svg-9mn4mhofq0";
import imgCompanyLogo from "../../imports/HomeMobile/6621e00db1f5dcbbe1342f61071d5f712fa2dd7a.png";
import imgScreenshot20240605215222Gmail1 from "../../imports/HomeMobile/caef332c103340cf1afa0979e064e9a554d1c65c.jpg";
import imgPlaceholderImage2 from "../../imports/HomeMobile/07eab3cc238566c0e60e8d0de26271ba140d7109.png";
import imgCard from "../../imports/imagejpeg_1-4-1.jpg";
import imgHero from "../../imports/header-1.jpg";
import imgSewerWork from "../../imports/imagejpeg_1-4-1.jpg";
import imgExcavation from "../../imports/imagejpeg_1-1.jpg";
import imgMeterInstallation from "../../imports/imagejpeg_0-4-1.jpg";
import imgRepairs from "../../imports/imagejpeg_1-5-2.jpg";
import imgResidential from "../../imports/imagejpeg_0-7-1.jpg";
import imgEmergency from "../../imports/imagejpeg_0-6.jpg";

type ServiceTab = 'Emergency' | 'Sewer work' | 'Hydro-jetting' | 'Excavation' | 'Residential' | 'Repairs' | 'Water meter installation';

interface TabContent {
  title: string;
  description: string;
  image: string;
  tagline: string;
}

const tabContents: Record<ServiceTab, TabContent> = {
  'Emergency': {
    title: "Water lines break at the worst times",
    description: "We answer the phone at three in the morning because that's when people need us. Fast response, fair price, problem solved.",
    image: imgEmergency,
    tagline: "Emergency"
  },
  'Sewer work': {
    title: "Professional sewer line services",
    description: "From simple cleanouts to complete line replacement, including camera sewer line inspection to pinpoint problems without guesswork. We have the equipment and expertise to handle any sewer issue with precision.",
    image: imgSewerWork,
    tagline: "Sewer work"
  },
  'Hydro-jetting': {
    title: "High-pressure cleaning solutions",
    description: "Our hydro-jetting systems clear even the toughest clogs and buildup, restoring your pipes to like-new condition.",
    image: imgSewerWork,
    tagline: "Hydro-jetting"
  },
  'Excavation': {
    title: "Complete excavation capabilities",
    description: "When repairs require digging, we have the equipment and expertise to get it done right, minimizing disruption to your property.",
    image: imgExcavation,
    tagline: "Excavation"
  },
  'Residential': {
    title: "Trusted residential plumbing",
    description: "From routine maintenance to major repairs, we treat your home with the care and respect it deserves.",
    image: imgResidential,
    tagline: "Residential"
  },
  'Repairs': {
    title: "Expert plumbing repairs",
    description: "No job too big or small. We diagnose problems accurately and fix them right the first time.",
    image: imgRepairs,
    tagline: "Repairs"
  },
  'Water meter installation': {
    title: "Professional water meter installation",
    description: "Licensed and certified to install water meters for residential and commercial properties. We ensure proper installation and compliance with all local regulations.",
    image: imgMeterInstallation,
    tagline: "Water meter installation"
  }
};

type SpecialtyService = {
  key: string;
  icon: string;
  name: string;
  meta: string;
  badge?: string;
  description: string;
  bullets: string[];
};

const specialtyServices: SpecialtyService[] = [
  {
    key: 'construction',
    icon: 'M3 21V8l9-5 9 5v13M3 21h18M9 21v-8h6v8',
    name: 'New construction',
    meta: 'Residential & commercial',
    description: "Full plumbing system installation for new builds — residential homes and commercial properties alike. We coordinate with general contractors from rough-in through final fixtures, working to code and to the timeline of the project.",
    bullets: [
      'Rough-in through finish installation',
      'Custom homes, multi-family, commercial',
      'GC coordination & inspection support',
    ],
  },
  {
    key: 'camera',
    icon: 'M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z',
    name: 'Camera sewer line inspection',
    meta: 'Diagnose without digging',
    description: "High-resolution video inspection of sewer and drain lines. We see exactly what's happening underground — roots, breaks, bellies, blockages — so repairs are targeted instead of guessed at. Saves time, money, and your yard.",
    bullets: [
      'Pinpoint location of blockages & breaks',
      'Pre-purchase home inspections',
      'Recorded footage available',
    ],
  },
  {
    key: 'septic',
    icon: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z',
    name: 'Septic tank pump-outs',
    meta: 'Tank service & maintenance',
    description: "Routine septic tank pumping keeps your system running and prevents costly backups or drain field failure. Most tanks need service every 3–5 years; we'll inspect the tank while we're there and flag anything that needs attention.",
    bullets: [
      'Full tank pump-outs',
      'System inspection included',
      'Service reminders available',
    ],
  },
  {
    key: 'gas',
    icon: 'M12 2c1 3 3 5 3 8a3 3 0 11-6 0c0-1 .5-2 1-3-2 2-4 5-4 8a6 6 0 1012 0c0-5-4-9-6-13z',
    name: 'Gas lines',
    meta: 'Licensed master gas fitter',
    badge: 'Licensed master gas fitter',
    description: "Gas line work isn't something to leave to an unlicensed handyman. Our master gas fitters are trained, licensed, and permitted to install and repair natural gas and LP lines — for ranges, water heaters, generators, outdoor kitchens, and more.",
    bullets: [
      'New gas line installation',
      'Leak detection & repair',
      'Appliance hookups & code-compliant permits',
    ],
  },
  {
    key: 'backflow',
    icon: 'M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4',
    name: 'Backflow services',
    meta: 'Certified installer & tester',
    badge: 'Certified installer & tester',
    description: "Backflow preventers keep contaminated water from flowing back into your clean water supply. Most municipalities require annual testing by a certified tester — that's us. We install, repair, and test, and we file the paperwork with your water authority.",
    bullets: [
      'Backflow preventer installation',
      'Annual certification testing',
      'Repairs and replacements',
    ],
  },
  {
    key: 'water-heater',
    icon: 'M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.73 0l-1.41-1.41M6.34 6.34L4.93 4.93M12 6a6 6 0 100 12 6 6 0 000-12z',
    name: 'Water heaters',
    meta: 'Tank & tankless install/repair',
    description: "From traditional tank units to high-efficiency tankless systems, we install, replace, and repair every type. Not getting hot water? Running out too fast? We'll diagnose the issue and walk you through your options — including upgrade paths that pay for themselves.",
    bullets: [
      'Tank & tankless installation',
      'Gas, electric, and hybrid units',
      'Repair, flushing, anode replacement',
    ],
  },
];

export default function InteractiveHomeMobile() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('Emergency');
  const [openSpecialty, setOpenSpecialty] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCallPopup, setShowCallPopup] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    urgency: '',
    message: ''
  });

  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string>('');

  const handleTabChange = (tab: ServiceTab) => {
    if (tab !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }
  };

  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const images = Object.values(tabContents).map(content => content.image);
    preloadedImages.current = images.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
  }, []);

  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleCall = () => {
    setShowCallPopup(true);
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contact@darrenaucoinplumbing.com';
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(contactForm.name && contactForm.email && contactForm.phone && contactForm.service && contactForm.urgency)) {
      return;
    }

    setSubmitState('sending');
    setSubmitError('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New service request from ${contactForm.name} (${contactForm.urgency})`,
          from_name: "Darren Aucoin's Plumbing Website",
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          service: contactForm.service,
          urgency: contactForm.urgency,
          message: contactForm.message || 'No additional details provided.',
          botcheck: '',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitState('success');
        setContactForm({ name: '', email: '', phone: '', service: '', urgency: '', message: '' });
        setTimeout(() => setSubmitState('idle'), 6000);
      } else {
        setSubmitState('error');
        setSubmitError(data.message || 'Something went wrong. Please call us at (337) 224-4852.');
      }
    } catch (err) {
      setSubmitState('error');
      setSubmitError('Network error. Please call us at (337) 224-4852.');
    }
  };

  const currentContent = tabContents[activeTab];

  const servicesReveal = useScrollReveal();
  const specialtyReveal = useScrollReveal();
  const equipmentReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const statsReveal = useScrollReveal();
  const CTAReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const testimonialCardsReveal = useScrollReveal();
  const statCardsReveal = useScrollReveal();

  const REVEAL_DELAYS = [
    'reveal-delay-1',
    'reveal-delay-2',
    'reveal-delay-3',
    'reveal-delay-4',
    'reveal-delay-5',
  ];

  function AnimatedStat({
                          stat,
                          isVisible,
                          index,
                        }: {
    stat: { label: string; value: string; desc: string };
    isVisible: boolean;
    index: number;
  }) {
    const count = useCountUp(stat.value); // CHANGE 1: the count-up hook

    return (
        <div
            // CHANGE 2: reveal classes appended, delay driven by index
            className={`bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[rgba(255,255,255,0.2)] reveal reveal-scale ${REVEAL_DELAYS[index]} ${isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
            <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] text-[22px] text-white tracking-[-0.22px] w-full">
              {stat.label}
            </p>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p
                  ref={count.ref} // CHANGE 3: ref on the number, value swapped below
                  className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] text-[80px] text-right w-full bg-gradient-to-b from-white to-[rgba(255,255,255,0.65)] bg-clip-text text-transparent"
                  style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {count.value}
              </p>
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <div className="flex-none rotate-180 w-full">
                  <div className="h-0 relative w-full">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 1">
                        <line stroke="white" strokeOpacity="0.2" x2="320" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-right text-white w-full">
                {stat.desc}
              </p>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="content-stretch flex flex-col items-start relative w-full overflow-x-hidden">
      {/* Navbar */}
      <div className="bg-[#002336] content-stretch flex flex-col items-start sticky top-0 shrink-0 w-full z-50 shadow-lg overflow-hidden">
        <div className="h-[64px] relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between pl-[20px] pr-[12px] relative size-full">
              <div className="h-[46px] relative shrink-0 w-[76px] cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="absolute inset-0 pointer-events-none rounded-[8px]">
                  <img alt="Company Logo" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgCompanyLogo} />
                  <div aria-hidden="true" className="absolute border-4 border-[#0b8483] border-solid inset-[-4px] rounded-[12px]" />
                </div>
              </div>
              <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative text-[14px] text-white tracking-[-0.14px] whitespace-nowrap flex-1 min-w-0 px-[8px] text-center truncate">Darren Aucoin's Plumbing</p>
              <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="content-stretch flex items-center justify-center relative shrink-0 size-[48px] cursor-pointer">
                {menuOpen ? (
                  // X (close) icon
                  <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                    <path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="bg-[#002336] w-full border-t border-[rgba(255,255,255,0.2)] py-[16px] px-[20px]">
            <div className="flex flex-col gap-[16px]">
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMenuOpen(false); }} className="text-left font-['Inter:Regular',sans-serif] text-white py-[8px] hover:text-[#0b8483] transition-colors">Home</button>
              <button onClick={() => scrollToSection(aboutRef)} className="text-left font-['Inter:Regular',sans-serif] text-white py-[8px] hover:text-[#0b8483] transition-colors">About us</button>
              <button onClick={() => scrollToSection(servicesRef)} className="text-left font-['Inter:Regular',sans-serif] text-white py-[8px] hover:text-[#0b8483] transition-colors">Services</button>
              <button onClick={() => scrollToSection(faqRef)} className="text-left font-['Inter:Regular',sans-serif] text-white py-[8px] hover:text-[#0b8483] transition-colors">FAQ</button>
              <button onClick={() => scrollToSection(contactRef)} className="text-left font-['Inter:Regular',sans-serif] text-white py-[8px] hover:text-[#0b8483] transition-colors">Contact</button>
              <div className="flex gap-[8px] pt-[8px]">
                <button onClick={handleCall} className="flex-1 bg-white text-[#070301] px-[12px] py-[6px] rounded-[12px] font-['Inter:Medium',sans-serif] hover:bg-gray-100 transition-colors">Call</button>
                <button onClick={() => { scrollToSection(contactRef); setMenuOpen(false); }} className="flex-1 bg-[#0077b6] text-white px-[12px] py-[6px] rounded-[12px] font-['Inter:Medium',sans-serif] hover:bg-[#005a8a] transition-colors">Book</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#0d9694] to-[#0a7170] relative shrink-0 w-full">
        <div className="flex flex-col items-center w-full px-[20px] py-[48px]">
          <div className="flex flex-col items-center gap-[32px] w-full max-w-[560px]">

            {/* Text */}
            <div className="flex flex-col gap-[20px] items-center text-center text-white w-full">
              <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] text-[36px] tracking-[-0.4px] hero-fade hero-delay-1">
                Fast, honest plumbing when you need it most
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] text-[16px] hero-fade hero-delay-2">
                Darren Aucoin's Plumbing serves Lafayette and Acadiana with the expertise to handle everything from simple repairs to complex sewer work. We show up prepared, fix it right the first time, and keep our prices fair.
              </p>
            </div>

            {/* Buttons — centered */}
            <div className="flex flex-wrap gap-[12px] items-center justify-center w-full hero-fade hero-delay-3">
              <button
                  onClick={handleCall}
                  className="bg-white border border-[#0077b6] rounded-[12px] px-[16px] py-[8px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] text-[#070301] text-[16px] whitespace-nowrap">Call now</p>
              </button>
              <button
                  onClick={() => scrollToSection(servicesRef)}
                  className="border border-[rgba(255,255,255,0.2)] rounded-[12px] px-[16px] py-[8px] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer"
              >
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] text-[16px] text-white whitespace-nowrap">Learn more</p>
              </button>
            </div>

            {/* Hero photo */}
            <div className="w-full rounded-[16px] overflow-hidden shadow-[0_16px_32px_rgba(0,0,0,0.4)] hero-fade hero-delay-4">
              <div className="rounded-[16px] overflow-hidden border-8 border-[#002f48]">
                <img
                    alt="Darren Aucoin's Plumbing service truck"
                    className="block w-full h-auto"
                    src={imgHero}
                    loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
        {/* Wave divider into Services */}
        <div className="relative w-full leading-[0] -mb-px" aria-hidden="true">
          <svg className="block w-full h-[60px]" viewBox="0 0 1440 60"
               preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,24 L1440,60 L0,60 Z"
                  fill="#002f48" />
          </svg>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="bg-gradient-to-b from-[#002f48] to-[#001a2b] relative shrink-0 w-full">
        {/* Ambient glow — first child of the relative section root */}
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[260px] blur-[80px] bg-[radial-gradient(ellipse,rgba(11,132,131,0.16),transparent_70%)]" />

        <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[20px] py-[64px] relative size-full">
            <div
                ref={servicesReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${servicesReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="content-stretch flex flex-col gap-[12px] items-center max-w-[768px] relative shrink-0 w-full">
                <p className="font-['Rubik:Medium',sans-serif] font-medium text-[12px] tracking-[0.12em] uppercase text-[#5dcaa5]">Services</p>
                <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-center text-white w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">What we handle</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">From burst pipes at midnight to sewer lines that need serious work, we've got the tools and know-how to get it done. Every job gets our full attention.</p>
                </div>
              </div>

              <div className="bg-[#002336] relative rounded-[16px] shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
                <div className="content-stretch flex flex-col isolate items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                  {(['Emergency', 'Sewer work', 'Water meter installation', 'Excavation', 'Residential', 'Repairs', 'Hydro-jetting'] as ServiceTab[]).map((tab) => {
                    const isOpen = activeTab === tab;
                    const content = tabContents[tab];
                    return (
                      <Fragment key={tab}>
                        <button
                          onClick={() => handleTabChange(tab)}
                          className={`relative shrink-0 w-full border-b border-[rgba(255,255,255,0.2)] cursor-pointer transition-colors duration-200 ${isOpen ? 'bg-[rgba(11,132,131,0.2)]' : 'hover:bg-[rgba(255,255,255,0.05)]'}`}
                        >
                          <div className="flex flex-col justify-center size-full">
                            <div className="content-stretch flex items-center justify-between px-[32px] py-[24px] relative size-full">
                              <p className={`font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] text-[18px] tracking-[-0.18px] transition-colors duration-200 ${isOpen ? 'text-[#0b8483]' : 'text-white'}`}>
                                {tab === 'Water meter installation' ? 'Meter installation' : tab}
                              </p>
                              <motion.svg
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className={`size-[20px] ${isOpen ? 'text-[#0b8483]' : 'text-white'}`}
                                fill="none" viewBox="0 0 24 24"
                              >
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </motion.svg>
                            </div>
                          </div>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ height: { type: 'spring', stiffness: 260, damping: 32 }, opacity: { duration: 0.2 } }}
                              className="relative shrink-0 w-full border-b border-[rgba(255,255,255,0.2)] overflow-hidden"
                            >
                              <div className="content-stretch flex flex-col gap-[48px] items-start p-[24px] relative w-full">
                                <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-full">
                                  <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-white w-full">
                                    <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[32px] tracking-[-0.32px] w-full">{content.title}</p>
                                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">{content.description}</p>
                                  </div>
                                  <button onClick={() => scrollToSection(contactRef)} className="relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                                    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
                                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn more</p>
                                    </div>
                                  </button>
                                </div>
                                <div className="aspect-square relative rounded-[16px] shrink-0 w-full">
                                  <img alt={content.tagline} className={`absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full ${tab === 'Water meter installation' || tab === 'Hydro-jetting' || tab === 'Sewer work' ? 'object-[center_60%]' : 'object-[center_15%]'}`} src={content.image} loading="lazy" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Specialty Services */}
              <div
                  ref={specialtyReveal.ref}
                  className={`content-stretch flex flex-col gap-[24px] items-center w-full mt-[24px] reveal ${specialtyReveal.isVisible ? 'reveal-visible' : ''}`}
              >
                <div className="flex flex-col gap-[6px] items-start w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium text-[11px] tracking-[0.08em] uppercase text-[#0b8483]">Also available</p>
                  <p className="font-['Rubik:Medium',sans-serif] font-medium text-[24px] text-white tracking-[-0.24px] leading-[1.2]">Specialty services</p>
                </div>
                <div className="flex flex-col gap-[10px] w-full">
                  {specialtyServices.map((svc) => {
                    const isOpen = openSpecialty === svc.key;
                    return (
                        <button
                            key={svc.key}
                            onClick={() => setOpenSpecialty(isOpen ? null : svc.key)}
                            className={`text-left rounded-[12px] border transition-all duration-300 overflow-hidden w-full ${
                                isOpen
                                    ? 'bg-[rgba(11,132,131,0.12)] border-[rgba(11,132,131,0.5)]'
                                    : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)]'
                            }`}
                        >
                          <div className="flex gap-[12px] items-center p-[14px]">
                            <div className={`shrink-0 size-[36px] rounded-[8px] flex items-center justify-center transition-all duration-300 ${
                                isOpen ? 'bg-[#0b8483] text-white shadow-[0_4px_12px_rgba(11,132,131,0.5)] ring-1 ring-[rgba(255,255,255,0.15)]' : 'bg-[rgba(11,132,131,0.18)] text-[#5dcaa5]'
                            }`}>
                              <svg className="size-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-['Rubik:Medium',sans-serif] font-medium text-[15px] text-white leading-[1.3]">{svc.name}</p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[rgba(255,255,255,0.55)] leading-[1.4] mt-[2px]">{svc.meta}</p>
                            </div>
                            <svg className={`shrink-0 size-[18px] text-[rgba(255,255,255,0.4)] transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#5dcaa5]' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                >
                                  <div className="px-[14px] pb-[16px]">
                                    <div className="pt-[14px] border-t border-[rgba(255,255,255,0.1)]">
                                      {svc.badge && (
                                          <span className="inline-block font-['Rubik:Medium',sans-serif] font-medium text-[10px] tracking-[0.06em] uppercase text-[#5dcaa5] bg-[rgba(11,132,131,0.15)] px-[8px] py-[4px] rounded-[6px] mb-[10px]">
                                      {svc.badge}
                                    </span>
                                      )}
                                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[rgba(255,255,255,0.85)] leading-[1.6]">
                                        {svc.description}
                                      </p>
                                      <ul className="mt-[12px] space-y-[8px]">
                                        {svc.bullets.map((b) => (
                                            <li key={b} className="flex gap-[10px] items-start">
                                              <svg className="shrink-0 mt-[3px] size-[14px] text-[#5dcaa5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                              </svg>
                                              <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px] text-[rgba(255,255,255,0.75)] leading-[1.5]">{b}</p>
                                            </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div ref={aboutRef} className="bg-white relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[20px] py-[64px] relative size-full">
            <div
                ref={equipmentReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${equipmentReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[#070301] text-[16px]">Equipment</p>
                    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-[#070301] w-full">
                      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Professional tools that make the difference</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">We don't cut corners on equipment. Hydro-jetting systems, excavation capabilities, and diagnostic tools mean we solve problems instead of just patching them.</p>
                    </div>
                  </div>
                  <button onClick={() => scrollToSection(servicesRef)} className="relative rounded-[12px] shrink-0 border border-[rgba(7,3,1,0.15)] hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">See services</p>
                    </div>
                  </button>
                </div>
                <div className="aspect-[335/348] relative rounded-[16px] shrink-0 w-full">
                  <img alt="Equipment" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-b from-[#003a59] to-[#002336] relative shrink-0 w-full">
        {/* Ambient glow — first child of the relative section root */}
        <div aria-hidden="true" className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[260px] blur-[80px] bg-[radial-gradient(ellipse,rgba(11,132,131,0.16),transparent_70%)]" />

        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[20px] py-[64px] relative size-full">
            <div
                ref={testimonialsReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${testimonialsReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[768px] relative shrink-0 text-center text-white w-full">
                <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">What customers say</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">Trusted by Lafayette homeowners</p>
              </div>
              <div
                  ref={testimonialCardsReveal.ref}
                  className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full"
              >
                {[
                  { name: 'Michael Broussard', role: 'Homeowner, Lafayette', text: 'Darren showed up at dawn on a Saturday when our water line burst, and he had it fixed before we finished coffee.' },
                  { name: 'Robert Guidry', role: 'Homeowner, Lafayette', text: 'They treated our old Creole cottage like it mattered, because to them it did.' },
                  { name: 'Jennifer Thibodeaux', role: 'Property manager, Acadiana', text: 'No surprises, no upselling, just honest work and a fair bill—that\'s rare in this business.' }
                ].map((testimonial, idx) => (
                    <div key={idx} className={`bg-[#002f48] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[rgba(255,255,255,0.12)] shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.40)] hover:-translate-y-1 transition-all duration-300 reveal reveal-scale reveal-delay-${idx + 1} ${testimonialCardsReveal.isVisible ? 'reveal-visible' : ''}`}>
                      <div className="overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex flex-col gap-[20px] items-start p-[24px] relative size-full">
                          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0">
                            <div className="h-[18.889px] relative shrink-0 w-[116px]">
                              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
                                <g clipPath="url(#clip0_3_1640)">
                                  {[0, 1, 2, 3, 4].map(i => (
                                    <path key={i} d={[svgPaths.p23629f00, svgPaths.p84d7480, svgPaths.p24418170, svgPaths.p28ff5800, svgPaths.p32177b30][i]} fill="white" />
                                  ))}
                                </g>
                                <defs>
                                  <clipPath id="clip0_3_1640">
                                    <rect fill="white" height="18.8889" width="116" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-white">{testimonial.text}</p>
                          </div>
                          <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full">
                            <div className="relative shrink-0 size-[48px] bg-[rgba(255,255,255,0.12)] rounded-full flex items-center justify-center ring-1 ring-[rgba(255,255,255,0.18)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                              <svg className="w-[60%] h-[60%]" viewBox="0 0 24 24" fill="none">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
                              </svg>
                            </div>
                            <div className="content-stretch flex flex-col items-start leading-[1.5] not-italic relative shrink-0 text-[16px] text-white w-full">
                              <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">{testimonial.name}</p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-b from-[#0d9694] to-[#0a7170] relative shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start px-[20px] py-[64px] relative size-full">
            <div
                ref={statsReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${statsReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <p className="font-['Rubik:Medium',sans-serif] font-medium text-[12px] tracking-[0.12em] uppercase text-white">Track record</p>
                    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-white w-full">
                      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Numbers that speak for themselves</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">We've built our reputation on showing up fast, doing the work right, and keeping customers satisfied. These numbers reflect what we've earned through years of honest service.</p>
                    </div>
                  </div>
                  <button onClick={() => scrollToSection(contactRef)} className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic text-[16px] text-white">Learn more</p>
                  </button>
                </div>
                <div
                    ref={statCardsReveal.ref}
                    className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full"
                >
                  {[
                    { label: 'Years serving Acadiana', value: '15+', desc: 'Experience handling everything from simple repairs to complex work' },
                    { label: 'Trucks ready to roll', value: '3', desc: 'Fully equipped for residential and commercial plumbing needs' },
                    { label: 'Average response time', value: '30 min', desc: 'We prioritize emergencies and get there when it matters most' },
                    { label: "Homes we've served", value: '2000+', desc: 'Families and businesses throughout Lafayette and surrounding areas' }
                  ].map((stat, idx) => (
                      <AnimatedStat
                          key={idx}
                          stat={stat}
                          index={idx}
                          isVisible={statCardsReveal.isVisible}
                      />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[20px] py-[64px] relative size-full">
            <div
                ref={CTAReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${CTAReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="relative rounded-[16px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
                  <img alt="CTA Background" className="absolute max-w-none object-cover rounded-[16px] size-full" src={imgCard} />
                  <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 rounded-[16px]" />
                </div>
                <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-center p-[32px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-center max-w-[768px] min-w-px relative">
                      <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0 text-center text-white w-full">
                        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Ready for reliable plumbing</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">Call us now or schedule a time that works for you. We're here when you need us.</p>
                      </div>
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
                        <button onClick={handleCall} className="bg-white content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[#0077b6] hover:bg-gray-100 transition-colors cursor-pointer">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">Call now</p>
                        </button>
                        <button onClick={() => scrollToSection(contactRef)} className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-solid border-white hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Schedule service</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div ref={faqRef} className="bg-[#0b8483] relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[20px] py-[64px] relative size-full">
            <div
                ref={aboutReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${aboutReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[768px] relative shrink-0 text-center text-white w-full">
                <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">FAQ</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">Common questions about our services, pricing, and how we work</p>
              </div>
              <div className="content-stretch flex flex-col gap-[40px] items-start leading-[1.5] max-w-[768px] not-italic overflow-clip relative shrink-0 text-[16px] text-white w-full">
                {[
                  { q: 'How fast can you respond?', a: "We aim for thirty minutes or less on emergency calls. During business hours, we typically schedule same-day or next-day service. If it's a true emergency at three in the morning, we answer the phone." },
                  { q: 'Do you charge for estimates?', a: 'No. We come out, assess the problem, explain what needs to be done, and give you a fair price before we start any work. No hidden fees, no surprises.' },
                  { q: 'Can you handle sewer work?', a: "Yes. We have the equipment and expertise for everything from simple cleanouts to complete line replacement. Sewer problems demand precision, and that's what we deliver." },
                  { q: 'What areas do you serve?', a: "We serve Lafayette and the surrounding Acadiana area. If you're not sure whether we reach your location, call us and we'll let you know straight." },
                  { q: 'Do you work on weekends?', a: 'We handle emergency calls seven days a week. For routine service, we work Monday through Friday, but we can often fit in weekend appointments if needed.' }
                ].map((faq, idx) => (
                  <div key={idx} className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 w-full">{faq.q}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[560px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 text-center text-white w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[24px] tracking-[-0.24px] w-full">Still have questions?</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">Reach out and we'll answer what you need to know.</p>
                </div>
                <button onClick={() => scrollToSection(contactRef)} className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                  <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic text-[16px] text-white">Contact us</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div ref={contactRef} className="bg-[#002f48] relative shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start px-[20px] py-[64px] relative size-full">
            <div
                ref={contactReveal.ref}
                className={`content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full reveal ${contactReveal.isVisible ? 'reveal-visible' : ''}`}
            >
              {/* Contact Info */}
              <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
                {[
                  { icon: 'mail', title: 'Email', desc: "Send us a message and we'll get back to you within one business day.", contact: 'contact@darrenaucoinplumbing.com', action: handleEmail },
                  { icon: 'call', title: 'Phone', desc: 'Call us for emergencies, estimates, or to schedule your service appointment.', contact: '(337) 224-4852', action: handleCall },
                  { icon: 'location', title: 'Office', desc: 'Visit us in Lafayette during business hours or call ahead to schedule a time.', contact: 'Lafayette, Louisiana 70501', action: () => {} }
                ].map((item, idx) => (
                  <div key={idx} className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                    <div className="relative shrink-0 size-[48px] flex items-center justify-center">
                      <svg className="block w-[75%] h-[75%]" fill="none" viewBox="0 0 40.61 32.61">
                        <path d={item.icon === 'mail' ? svgPaths.pbb43500 : item.icon === 'call' ? svgPaths.p232e5400 : svgPaths.p1f676880} fill="white" stroke="white" />
                      </svg>
                    </div>
                    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 text-white w-full">
                      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[24px] tracking-[-0.24px] w-full">{item.title}</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">{item.desc}</p>
                      </div>
                      <button onClick={item.action} className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] underline w-full text-left hover:text-[#0b8483] transition-colors cursor-pointer">{item.contact}</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] text-[32px] text-white tracking-[-0.32px]">Request a Service</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-white">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>

                <form onSubmit={handleContactSubmit} className="bg-[#002336] border border-[rgba(255,255,255,0.2)] rounded-[16px] p-[24px] w-full">
                  <div className="flex flex-col gap-[24px]">
                    {/* Name */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="bg-transparent border border-[rgba(255,255,255,0.2)] rounded-[8px] px-[16px] py-[12px] text-white placeholder-[rgba(255,255,255,0.5)] outline-none focus:border-[#0b8483] transition-colors"
                        placeholder="Your full name"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">Email *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="bg-transparent border border-[rgba(255,255,255,0.2)] rounded-[8px] px-[16px] py-[12px] text-white placeholder-[rgba(255,255,255,0.5)] outline-none focus:border-[#0b8483] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="bg-transparent border border-[rgba(255,255,255,0.2)] rounded-[8px] px-[16px] py-[12px] text-white placeholder-[rgba(255,255,255,0.5)] outline-none focus:border-[#0b8483] transition-colors"
                        placeholder="(337) 224-4852"
                      />
                    </div>

                    {/* Service Type */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">Service Needed *</label>
                      <select
                        required
                        value={contactForm.service}
                        onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                        className="bg-[#002336] border border-[rgba(255,255,255,0.2)] rounded-[8px] px-[16px] py-[12px] text-white outline-none focus:border-[#0b8483] transition-colors cursor-pointer"
                      >
                        <option value="">Select a service...</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Sewer work">Sewer work</option>
                        <option value="Hydro-jetting">Hydro-jetting</option>
                        <option value="Excavation">Excavation</option>
                        <option value="Residential">Residential</option>
                        <option value="Repairs">Repairs</option>
                        <option value="Water meter installation">Water meter installation</option>
                      </select>
                    </div>

                    {/* Urgency */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">When do you need service? *</label>
                      <select
                        required
                        value={contactForm.urgency}
                        onChange={(e) => setContactForm({...contactForm, urgency: e.target.value})}
                        className="bg-[#002336] border border-[rgba(255,255,255,0.2)] rounded-[8px] px-[16px] py-[12px] text-white outline-none focus:border-[#0b8483] transition-colors cursor-pointer"
                      >
                        <option value="">Select urgency...</option>
                        <option value="Emergency - ASAP">Emergency - ASAP</option>
                        <option value="Within 24 hours">Within 24 hours</option>
                        <option value="Within this week">Within this week</option>
                        <option value="Within this month">Within this month</option>
                        <option value="Just planning ahead">Just planning ahead</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[16px] text-white">Additional Details (Optional)</label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        rows={4}
                        className="bg-transparent border border-[rgba(255,255,255,0.2)] rounded-[8px] px-[16px] py-[12px] text-white placeholder-[rgba(255,255,255,0.5)] outline-none focus:border-[#0b8483] transition-colors resize-none"
                        placeholder="Tell us more about your plumbing issue..."
                      />
                    </div>

                    {/* Honeypot field — hidden from humans, catches bots */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Submit status messages */}
                    {submitState === 'success' && (
                      <div className="bg-[#0b8483]/20 border border-[#0b8483] rounded-[8px] px-[16px] py-[12px] text-white text-[16px]">
                        ✓ Thanks — we got your request and will be in touch soon. For emergencies, call (337) 224-4852.
                      </div>
                    )}
                    {submitState === 'error' && (
                      <div className="bg-red-900/40 border border-red-500 rounded-[8px] px-[16px] py-[12px] text-white text-[16px]">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="bg-[#0077b6] w-full px-[24px] py-[12px] rounded-[12px] font-['Inter:Medium',sans-serif] font-medium text-[18px] text-white hover:bg-[#005a8a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      {submitState === 'sending' ? 'Sending…' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#002336] relative shrink-0 w-full">
        <div className="flex flex-col items-center size-full">
          <div className="content-stretch flex flex-col items-center px-[20px] py-[48px] relative size-full">
            <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0">
                    <div className="h-[150px] relative rounded-[51px] shrink-0 w-[332px]">
                      <img alt="Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[51px] size-full border-4 border-[#0b8483]" src={imgScreenshot20240605215222Gmail1} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[16px] items-start leading-[1.5] max-w-[480px] not-italic text-[14px] text-white w-full">
                    {['About us', 'Services', 'Contact', 'FAQ', 'Testimonials'].map((link, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (link === 'Services') scrollToSection(servicesRef);
                          else if (link === 'Contact') scrollToSection(contactRef);
                          else if (link === 'FAQ') scrollToSection(faqRef);
                          else if (link === 'About us') scrollToSection(aboutRef);
                        }}
                        className="relative shrink-0 w-full text-left hover:text-[#0b8483] transition-colors cursor-pointer"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Get a free estimate CTA (replaces Subscribe form) */}
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[16px] text-white w-full">Need a plumber?</p>
                  <p className="font-['Inter:Regular',sans-serif] leading-[1.5] not-italic text-[14px] text-[rgba(255,255,255,0.7)] w-full">Get a free estimate — no obligation.</p>
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="bg-[#0b8483] hover:bg-[#0a7372] transition-colors rounded-[12px] px-[16px] py-[10px] w-full font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white cursor-pointer"
                  >
                    Get a free estimate
                  </button>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-start pb-[16px] relative shrink-0 w-full">
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 335 1">
                      <line stroke="white" strokeOpacity="0.2" x2="335" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-col font-['Inter:Regular',sans-serif] font-normal gap-[32px] items-start leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-full">
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 whitespace-nowrap">
                    {['Privacy Policy', 'Terms of Service', 'Cookies Settings'].map((link, idx) => (
                      <p key={idx} className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline hover:text-[#0b8483] transition-colors cursor-pointer">{link}</p>
                    ))}
                  </div>
                  <p className="relative shrink-0 w-full">© 2025 Darren Aucoin's Plumbing LLC. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Popup */}
      <AnimatePresence>
        {showCallPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowCallPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[24px] p-[32px] shadow-2xl z-50 max-w-[90%] w-full"
            >
              <div className="flex flex-col gap-[24px] items-center text-center">
                <div className="flex flex-col gap-[12px]">
                  <h3 className="font-['Rubik:Medium',sans-serif] font-medium text-[28px] text-[#070301] leading-[1.2] tracking-[-0.28px]">
                    Call Us Now
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#070301] leading-[1.5]">
                    We're available 24/7 for emergency plumbing services
                  </p>
                </div>
                <a
                  href="tel:337-224-4852"
                  className="font-['Rubik:Medium',sans-serif] font-medium text-[32px] text-[#0077b6] leading-[1.2] tracking-[-0.32px] hover:text-[#005a8a] transition-colors"
                >
                  337-224-4852
                </a>
                <div className="flex flex-col gap-[12px] w-full">
                  <a
                    href="tel:337-224-4852"
                    className="bg-[#0077b6] text-white font-['Inter:Medium',sans-serif] font-medium text-[16px] px-[24px] py-[12px] rounded-[12px] hover:bg-[#005a8a] transition-colors"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={() => setShowCallPopup(false)}
                    className="text-[#070301] font-['Inter:Medium',sans-serif] font-medium text-[16px] px-[24px] py-[12px] rounded-[12px] hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
