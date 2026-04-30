import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import svgPaths from "../../imports/HomeDesktop/svg-chujyqmum8";
import imgCompanyLogo from "../../imports/HomeDesktop/6621e00db1f5dcbbe1342f61071d5f712fa2dd7a.png";
import imgScreenshot20240605215222Gmail1 from "../../imports/HomeDesktop/caef332c103340cf1afa0979e064e9a554d1c65c.png";
import imgPlaceholderImage from "../../imports/HomeDesktop/2f040ef1bc390e6d88de99a6b8d8e47d4ad2daeb.png";
import imgPlaceholderImage1 from "../../imports/HomeDesktop/4b2e149ba397c6d2eeb95c443c0bef4051469e12.png";
import imgPlaceholderImage2 from "../../imports/HomeDesktop/07eab3cc238566c0e60e8d0de26271ba140d7109.png";
import imgCard from "../../imports/HomeDesktop/ce4271df8c51d697d7f76ed74c5316e75b7e0860.png";
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
    description: "From simple cleanouts to complete line replacement. We have the equipment and expertise to handle any sewer problem with precision.",
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

export default function InteractiveHomeDesktop() {
  const [activeTab, setActiveTab] = useState<ServiceTab>('Emergency');
  const [showDropdown, setShowDropdown] = useState(false);
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
      setActiveTab(tab);
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

  return (
    <div className="content-stretch flex flex-col items-start relative w-full overflow-x-hidden" data-name="Home • Desktop">
      {/* Navbar */}
      <div className="bg-[#002336] h-[110px] sticky top-0 shrink-0 w-full z-50 shadow-lg overflow-hidden">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[64px] relative size-full">
            <div className="content-stretch flex h-[71px] items-center justify-between relative shrink-0 w-full gap-[16px]">
              <div className="h-[68px] relative shrink-0 w-[113px] cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="absolute inset-0 pointer-events-none rounded-[8px]">
                  <img alt="Company Logo" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgCompanyLogo} />
                  <div aria-hidden="true" className="absolute border-4 border-[#0b8483] border-solid inset-[-4px] rounded-[12px]" />
                </div>
              </div>

              <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative text-[28px] xl:text-[32px] text-white tracking-[-0.32px] text-center whitespace-nowrap flex-1 min-w-0 px-[16px] truncate">Darren Aucoin's Plumbing</p>

              <div className="content-stretch flex gap-[16px] items-center justify-end relative shrink-0">
                <div className="content-stretch flex gap-[20px] items-center justify-end relative shrink-0">
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-white hover:text-[#0b8483] transition-colors cursor-pointer whitespace-nowrap">Home</button>
                  <button onClick={() => scrollToSection(aboutRef)} className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-white hover:text-[#0b8483] transition-colors cursor-pointer whitespace-nowrap">About us</button>
                  <button onClick={() => scrollToSection(servicesRef)} className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-white hover:text-[#0b8483] transition-colors cursor-pointer whitespace-nowrap">Services</button>
                   <div className="relative">
                    <button onClick={() => setShowDropdown(!showDropdown)} className="flex gap-[4px] items-center font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-white hover:text-[#0b8483] transition-colors cursor-pointer whitespace-nowrap">
                      More
                      <svg className="size-[24px]" fill="none" viewBox="0 0 24 24">
                        <path clipRule="evenodd" d={svgPaths.pee47f00} fill="currentColor" fillRule="evenodd" />
                      </svg>
                    </button>
                    {showDropdown && (
                      <div className="absolute top-full mt-2 bg-[#002336] border border-[rgba(255,255,255,0.2)] rounded-[8px] p-[16px] min-w-[150px] z-50">
                        <button onClick={() => { scrollToSection(faqRef); setShowDropdown(false); }} className="block w-full text-left text-white hover:text-[#0b8483] py-[8px]">FAQ</button>
                        <button onClick={() => { scrollToSection(contactRef); setShowDropdown(false); }} className="block w-full text-left text-white hover:text-[#0b8483] py-[8px]">Contact</button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0">
                  <button onClick={handleCall} className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Call</p>
                  </button>
                  <button onClick={() => scrollToSection(contactRef)} className="bg-[#0077b6] content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0 hover:bg-[#005a8a] transition-colors cursor-pointer">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Book</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#0b8483] relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col gap-[80px] items-center px-[64px] py-[112px] relative size-full">
            <div className="h-[415px] pointer-events-none relative rounded-[51px] shrink-0 w-[922px]">
              <img alt="Header" className="absolute inset-0 max-w-none object-cover rounded-[51px] size-full" src={imgScreenshot20240605215222Gmail1} />
              <div aria-hidden="true" className="absolute border-10 border-[#002f48] border-solid inset-[-10px] rounded-[61px]" />
            </div>
            <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[768px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[72px] tracking-[-0.72px] w-full">Fast, honest plumbing when you need it most</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Darren Aucoin's Plumbing serves Lafayette and Acadiana with the expertise to handle everything from simple repairs to complex sewer work. We show up prepared, fix it right the first time, and keep our prices fair.</p>
                </div>
                <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
                  <button onClick={handleCall} className="bg-white content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[#0077b6] hover:bg-gray-100 transition-colors cursor-pointer">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">Call now</p>
                  </button>
                  <button onClick={() => scrollToSection(servicesRef)} className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn more</p>
                  </button>
                </div>
              </div>
              <div className="h-[598px] relative rounded-[32px] shrink-0 w-[1266px]">
                <img alt="Hero" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[32px] size-full brightness-110 border-8 border-[#002f48]" src={imgHero} loading="eager" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="bg-[#002336] relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] relative shrink-0 w-full">
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[16px] text-center text-white">Services</p>
                <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">What we handle</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">From burst pipes at midnight to sewer lines that need serious work, we've got the tools and know-how to get it done. Every job gets our full attention.</p>
                </div>
              </div>

              <div className="bg-[#002336] relative rounded-[16px] shrink-0 w-full border border-[rgba(255,255,255,0.2)]">
                <div className="content-stretch flex flex-col isolate items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                  {/* Tabs Menu */}
                  <div className="content-stretch flex min-h-[79px] isolate items-start relative shrink-0 w-full z-[2]">
                    {(['Emergency', 'Sewer work', 'Water meter installation', 'Excavation', 'Residential', 'Repairs', 'Hydro-jetting'] as ServiceTab[]).map((tab, idx) => (
                      <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`flex-[1_0_0] h-full min-w-0 relative cursor-pointer transition-all duration-300 ${
                          activeTab === tab ? 'bg-[rgba(11,132,131,0.2)] -translate-y-1' : 'hover:bg-[rgba(255,255,255,0.05)]'
                        }`}
                      >
                        <div aria-hidden="true" className={`absolute border-[rgba(255,255,255,0.2)] ${activeTab === tab ? 'border-r' : 'border-r border-b'} border-solid ${idx === 0 && activeTab === tab ? 'inset-[0_-1px_0_0]' : 'inset-[0_-1px_-1px_0]'} pointer-events-none`} />
                        <div className="flex flex-col items-center justify-center size-full">
                          <div className="content-stretch flex flex-col items-center justify-center px-[8px] md:px-[16px] lg:px-[32px] py-[16px] md:py-[20px] lg:py-[24px] relative size-full">
                            <p className={`font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[14px] md:text-[18px] lg:text-[22px] text-center tracking-[-0.14px] md:tracking-[-0.18px] lg:tracking-[-0.22px] w-full ${activeTab === tab ? 'text-[#0b8483]' : 'text-white'}`}>{tab === 'Water meter installation' ? 'Meter installation' : tab}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="relative shrink-0 w-full z-[1] overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeTab}
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -80, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }}
                        className="content-stretch flex gap-[80px] items-center p-[48px] relative w-full"
                      >
                        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start justify-center min-w-px relative">
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[16px] text-white">{currentContent.tagline}</p>
                            <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
                              <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[44px] tracking-[-0.44px] w-full">{currentContent.title}</p>
                              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">{currentContent.description}</p>
                            </div>
                          </div>
                          <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full">
                            <button onClick={() => scrollToSection(contactRef)} className="relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                              <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
                                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn more</p>
                              </div>
                            </button>
                          </div>
                        </div>
                        <div className="aspect-[552/552] flex-[1_0_0] min-w-px relative rounded-[16px]">
                          <img alt={currentContent.tagline} className={`absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full ${activeTab === 'Water meter installation' || activeTab === 'Hydro-jetting' || activeTab === 'Sewer work' ? 'object-[center_60%]' : 'object-[center_15%]'}`} src={currentContent.image} loading="lazy" />
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div ref={aboutRef} className="bg-white relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative">
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[#070301] text-[16px]">Equipment</p>
                    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-[#070301] w-full">
                      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">Professional tools that make the difference</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">We don't cut corners on equipment. Hydro-jetting systems, excavation capabilities, and diagnostic tools mean we solve problems instead of just patching them.</p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
                    <button onClick={() => scrollToSection(servicesRef)} className="relative rounded-[12px] shrink-0 border border-[rgba(7,3,1,0.15)] hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full bg-[#0077b6]">
                        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-white text-[16px] whitespace-nowrap">See services</p>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="aspect-[600/640] flex-[1_0_0] min-w-px relative rounded-[16px]">
                  <img alt="Equipment" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#002f48] relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-center text-white w-full">
                <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">What customers say</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Trusted by Lafayette homeowners</p>
              </div>
              <div className="content-stretch flex gap-[32px] items-stretch relative shrink-0 w-full">
                {[
                  { name: 'Michael Broussard', role: 'Homeowner, Lafayette', text: 'Darren showed up at dawn on a Saturday when our water line burst, and he had it fixed before we finished coffee.' },
                  { name: 'Robert Guidry', role: 'Homeowner, Lafayette', text: 'They treated our old Creole cottage like it mattered, because to them it did.' },
                  { name: 'Jennifer Thibodeaux', role: 'Property manager, Acadiana', text: 'No surprises, no upselling, just honest work and a fair bill—that\'s rare in this business.' }
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-[#002f48] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[rgba(255,255,255,0.2)]">
                    <div className="overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full justify-between">
                        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
                          <div className="h-[18.889px] relative shrink-0 w-[116px]">
                            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
                              <g clipPath="url(#clip0_3_1598)">
                                {[0, 1, 2, 3, 4].map(i => (
                                  <path key={i} d={[svgPaths.p23629f00, svgPaths.p84d7480, svgPaths.p24418170, svgPaths.p28ff5800, svgPaths.p32177b30][i]} fill="white" />
                                ))}
                              </g>
                              <defs>
                                <clipPath id="clip0_3_1598">
                                  <rect fill="white" height="18.8889" width="116" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[18px] text-white">{testimonial.text}</p>
                        </div>
                        <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
                          <div className="relative shrink-0 size-[48px] bg-[rgba(255,255,255,0.2)] rounded-full flex items-center justify-center">
                            <svg className="w-[60%] h-[60%]" viewBox="0 0 24 24" fill="none">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="white"/>
                            </svg>
                          </div>
                          <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px not-italic text-[16px] text-white">
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
      <div className="bg-[#0b8483] relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start max-w-[400px] min-w-px relative">
                  <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[16px] text-white">Track record</p>
                    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
                      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">Numbers that speak for themselves</p>
                      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">We've built our reputation on showing up fast, doing the work right, and keeping customers satisfied. These numbers reflect what we've earned through years of honest service.</p>
                    </div>
                  </div>
                  <button onClick={() => scrollToSection(contactRef)} className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic text-[16px] text-white">Learn more</p>
                  </button>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative">
                  <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
                    {[
                      { label: 'Years serving Acadiana', value: '15+', desc: 'Experience handling everything from simple repairs to complex work' },
                      { label: 'Trucks ready to roll', value: '3', desc: 'Fully equipped for residential and commercial plumbing needs' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[rgba(255,255,255,0.2)]">
                        <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
                          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] text-[22px] text-white tracking-[-0.22px] w-full">{stat.label}</p>
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] text-[80px] text-right text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{stat.value}</p>
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
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-right text-white w-full">{stat.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
                    {[
                      { label: 'Average response time', value: '30 min', desc: 'We prioritize emergencies and get there when it matters most' },
                      { label: "Homes we've served", value: '2000+', desc: 'Families and businesses throughout Lafayette and surrounding areas' }
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px] border border-[rgba(255,255,255,0.2)]">
                        <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
                          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] text-[22px] text-white tracking-[-0.22px] w-full">{stat.label}</p>
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                            <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] text-[80px] text-right text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>{stat.value}</p>
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
                            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[16px] text-right text-white w-full">{stat.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white relative shrink-0 w-full">
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full">
              <div className="relative rounded-[16px] shrink-0 w-full">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
                  <div className="absolute inset-0 overflow-hidden rounded-[16px]">
                    <img alt="CTA Background" className="absolute h-[552.32%] left-[-0.12%] max-w-none top-[-343.28%] w-full" src={imgCard} />
                  </div>
                  <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 rounded-[16px]" />
                </div>
                <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center justify-center p-[64px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center max-w-[768px] min-w-px relative">
                      <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full">
                        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">Ready for reliable plumbing</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Call us now or schedule a time that works for you. We're here when you need us.</p>
                      </div>
                      <div className="content-stretch flex gap-[16px] items-start relative shrink-0">
                        <button onClick={handleCall} className="bg-white content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[#0077b6] hover:bg-gray-100 transition-colors cursor-pointer">
                          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">Call now</p>
                        </button>
                        <button onClick={() => scrollToSection(contactRef)} className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-pointer">
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
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-center text-white w-full">
                <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">FAQ</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Common questions about our services, pricing, and how we work</p>
              </div>
              <div className="content-stretch flex flex-col gap-[48px] items-start leading-[1.5] max-w-[768px] not-italic overflow-clip relative shrink-0 text-white w-full">
                {[
                  { q: 'How fast can you respond?', a: "We aim for thirty minutes or less on emergency calls. During business hours, we typically schedule same-day or next-day service. If it's a true emergency at three in the morning, we answer the phone." },
                  { q: 'Do you charge for estimates?', a: 'No. We come out, assess the problem, explain what needs to be done, and give you a fair price before we start any work. No hidden fees, no surprises.' },
                  { q: 'Can you handle sewer work?', a: "Yes. We have the equipment and expertise for everything from simple cleanouts to complete line replacement. Sewer problems demand precision, and that's what we deliver." },
                  { q: 'What areas do you serve?', a: "We serve Lafayette and the surrounding Acadiana area. If you're not sure whether we reach your location, call us and we'll let you know straight." },
                  { q: 'Do you work on weekends?', a: 'We handle emergency calls seven days a week. For routine service, we work Monday through Friday, but we can often fit in weekend appointments if needed.' }
                ].map((faq, idx) => (
                  <div key={idx} className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                    <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full">{faq.q}</p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[560px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center text-white w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Still have questions?</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Reach out and we'll answer what you need to know.</p>
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
        <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
            <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full">
              {/* Contact Info */}
              <div className="content-stretch flex gap-[48px] items-center relative shrink-0 w-full">
                {[
                  { icon: 'mail', title: 'Email', desc: "Send us a message and we'll get back to you within one business day.", contact: 'contact@darrenaucoinplumbing.com', action: handleEmail },
                  { icon: 'call', title: 'Phone', desc: 'Call us for emergencies, estimates, or to schedule your service appointment.', contact: '(337) 224-4852', action: handleCall },
                  { icon: 'location', title: 'Office', desc: 'Visit us in Lafayette during business hours or call ahead to schedule a time.', contact: 'Lafayette, Louisiana 70501', action: () => {} }
                ].map((item, idx) => (
                  <div key={idx} className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative">
                    <div className="relative shrink-0 size-[48px] flex items-center justify-center">
                      <svg className="block w-[75%] h-[75%]" fill="none" viewBox="0 0 40.61 32.61">
                        <path d={item.icon === 'mail' ? svgPaths.pbb43500 : item.icon === 'call' ? svgPaths.p232e5400 : svgPaths.p1f676880} fill="white" stroke="white" />
                      </svg>
                    </div>
                    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
                      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">{item.title}</p>
                        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">{item.desc}</p>
                      </div>
                      <button onClick={item.action} className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] underline w-full text-left hover:text-[#0b8483] transition-colors cursor-pointer">{item.contact}</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] text-[44px] text-white tracking-[-0.44px]">Request a Service</p>
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic text-[18px] text-white">Fill out the form below and we'll get back to you as soon as possible.</p>
                </div>

                <form onSubmit={handleContactSubmit} className="bg-[#002336] border border-[rgba(255,255,255,0.2)] rounded-[16px] p-[48px] w-full">
                  <div className="grid grid-cols-2 gap-[32px]">
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
                    <div className="flex flex-col gap-[8px] col-span-2">
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
                      <div className="col-span-2 bg-[#0b8483]/20 border border-[#0b8483] rounded-[8px] px-[16px] py-[12px] text-white text-[16px]">
                        ✓ Thanks — we got your request and will be in touch soon. For emergencies, call (337) 224-4852.
                      </div>
                    )}
                    {submitState === 'error' && (
                      <div className="col-span-2 bg-red-900/40 border border-red-500 rounded-[8px] px-[16px] py-[12px] text-white text-[16px]">
                        {submitError}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="col-span-2">
                      <button
                        type="submit"
                        disabled={submitState === 'sending'}
                        className="bg-[#0077b6] w-full px-[24px] py-[12px] rounded-[12px] font-['Inter:Medium',sans-serif] font-medium text-[18px] text-white hover:bg-[#005a8a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        {submitState === 'sending' ? 'Sending…' : 'Submit Request'}
                      </button>
                    </div>
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
          <div className="content-stretch flex flex-col items-center px-[64px] py-[48px] relative size-full">
            <div className="content-stretch flex flex-col gap-[40px] items-start max-w-[1280px] relative shrink-0 w-full">
              <div className="content-stretch flex items-start justify-between gap-[40px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0">
                  <div className="h-[188px] relative rounded-[51px] shrink-0 w-[417px]">
                    <img alt="Logo" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[51px] size-full" src={imgScreenshot20240605215222Gmail1} />
                    <div aria-hidden="true" className="absolute border-[10px] border-[#0b8483] border-solid inset-[-10px] pointer-events-none rounded-[61px]" />
                  </div>
                </div>
                <div className="content-start flex flex-wrap font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[32px] items-start leading-[1.5] not-italic text-[14px] text-white whitespace-nowrap">
                  {['About us', 'Services', 'Contact', 'FAQ', 'Testimonials'].map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (link === 'Services') scrollToSection(servicesRef);
                        else if (link === 'Contact') scrollToSection(contactRef);
                        else if (link === 'FAQ') scrollToSection(faqRef);
                        else if (link === 'About us') scrollToSection(aboutRef);
                      }}
                      className="relative shrink-0 hover:text-[#0b8483] transition-colors cursor-pointer"
                    >
                      {link}
                    </button>
                  ))}
                </div>
                {/* Get a free estimate CTA (replaces Subscribe form) */}
                <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 max-w-[400px]">
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic text-[16px] text-white">Need a plumber?</p>
                  <p className="font-['Inter:Regular',sans-serif] leading-[1.5] not-italic text-[14px] text-[rgba(255,255,255,0.7)]">Get a free estimate — no obligation.</p>
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="bg-[#0b8483] hover:bg-[#0a7372] transition-colors rounded-[12px] px-[20px] py-[10px] font-['Inter:Medium',sans-serif] font-medium text-[16px] text-white cursor-pointer whitespace-nowrap"
                  >
                    Get a free estimate
                  </button>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
                      <line stroke="white" strokeOpacity="0.2" x2="1280" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-nowrap">
                  <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
                    {['Privacy Policy', 'Terms of Service', 'Cookies Settings'].map((link, idx) => (
                      <p key={idx} className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline hover:text-[#0b8483] transition-colors cursor-pointer">{link}</p>
                    ))}
                  </div>
                  <p className="relative shrink-0">© 2025 Darren Aucoin's Plumbing LLC. All rights reserved.</p>
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
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[24px] p-[48px] shadow-2xl z-50 max-w-[500px] w-full"
            >
              <div className="flex flex-col gap-[32px] items-center text-center">
                <div className="flex flex-col gap-[16px]">
                  <h3 className="font-['Rubik:Medium',sans-serif] font-medium text-[32px] text-[#070301] leading-[1.2] tracking-[-0.32px]">
                    Call Us Now
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px] text-[#070301] leading-[1.5]">
                    We're available 24/7 for emergency plumbing services
                  </p>
                </div>
                <a
                  href="tel:337-224-4852"
                  className="font-['Rubik:Medium',sans-serif] font-medium text-[40px] text-[#0077b6] leading-[1.2] tracking-[-0.4px] hover:text-[#005a8a] transition-colors"
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
