import svgPaths from "./svg-chujyqmum8";
import imgCompanyLogo from "./6621e00db1f5dcbbe1342f61071d5f712fa2dd7a.png";
import imgScreenshot20240605215222Gmail1 from "./caef332c103340cf1afa0979e064e9a554d1c65c.png";
import imgPlaceholderImage from "./2f040ef1bc390e6d88de99a6b8d8e47d4ad2daeb.png";
import imgPlaceholderImage1 from "./4b2e149ba397c6d2eeb95c443c0bef4051469e12.png";
import imgPlaceholderImage2 from "./07eab3cc238566c0e60e8d0de26271ba140d7109.png";
import imgAvatarImage from "./d9e05164a5ea6b46e45341d80a931ff16ed86f53.png";
import imgAvatarImage1 from "./16f006de150d01cdc4ae2690dd476acd7f373314.png";
import imgAvatarImage2 from "./fa181c0f20a68de53b9e82468f1b8db24484020c.png";
import imgCard from "./ce4271df8c51d697d7f76ed74c5316e75b7e0860.png";

function CompanyLogo({ className }: { className?: string }) {
  return (
    <div className={className || "h-[68px] relative shrink-0 w-[113px]"} data-name="Company Logo">
      <div className="absolute inset-0 pointer-events-none rounded-[8px]" data-name="Company Logo">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[8px] size-full" src={imgCompanyLogo} />
        <div aria-hidden="true" className="absolute border-4 border-[#0b8483] border-solid inset-[-4px] rounded-[12px]" />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Home</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">About us</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Link">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Services</p>
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Chevron Down">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Chevron Down">
          <path clipRule="evenodd" d={svgPaths.pee47f00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function NavLinkDropdown() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Nav Link Dropdown">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">More</p>
      <ChevronDown />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Link">
      <NavLinkDropdown />
    </div>
  );
}

function NavLinks() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-end relative shrink-0" data-name="Nav links">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Call</p>
      </div>
      <div className="bg-[#0077b6] content-stretch flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#0077b6] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Book</p>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex gap-[32px] items-center justify-center relative shrink-0" data-name="Column">
      <NavLinks />
      <Actions />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[71px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <CompanyLogo />
      <p className="font-['Rubik:Medium',sans-serif] font-medium h-[52px] leading-[1.2] relative shrink-0 text-[48px] text-white tracking-[-0.48px] w-[611px]">Darren Aucoin’s Plumbing</p>
      <Column />
    </div>
  );
}

function Navbar() {
  return (
    <div className="bg-[#002336] h-[110px] relative shrink-0 w-full" data-name="Navbar / 1 /">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[64px] relative size-full">
          <Container />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[0px] tracking-[-0.72px] w-full">
        <span className="leading-[1.2] text-[72px]">{`Fast, `}</span>
        <span className="leading-[1.2] text-[72px]">honest</span>
        <span className="leading-[1.2] text-[72px]">{` plumbing when you need it most`}</span>
      </p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`Darren Aucoin's Plumbing serves Lafayette and Acadiana with the expertise to handle everything from simple repairs to complex sewer work. We show up prepared, fix it right the first time, and keep our prices fair.`}</p>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#0077b6] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">Call now</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn more</p>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Column">
      <Content />
      <Actions1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Column1 />
      <div className="h-[598px] relative rounded-[32px] shrink-0 w-[1266px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[32px] size-full" src={imgPlaceholderImage} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#0b8483] relative shrink-0 w-full" data-name="Header / 26 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[80px] items-center px-[64px] py-[112px] relative size-full">
          <div className="h-[415px] pointer-events-none relative rounded-[51px] shrink-0 w-[922px]" data-name="Screenshot_20240605_215222_Gmail 1">
            <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[51px] size-full" src={imgScreenshot20240605215222Gmail1} />
            <div aria-hidden="true" className="absolute border-10 border-[#002f48] border-solid inset-[-10px] rounded-[61px]" />
          </div>
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">Services</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">What we handle</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`From burst pipes at midnight to sewer lines that need serious work, we've got the tools and know-how to get it done. Every job gets our full attention.`}</p>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center max-w-[768px] relative shrink-0 w-full" data-name="Content">
      <TaglineWrapper />
      <Content2 />
    </div>
  );
}

function TabLink() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[6]" data-name="Tab link">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-r border-solid inset-[0_-1px_0_0] pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[32px] py-[24px] relative size-full">
          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-center text-white tracking-[-0.22px] w-full">Emergency</p>
        </div>
      </div>
    </div>
  );
}

function TabLink1() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[5]" data-name="Tab link">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-r border-solid inset-[0_-1px_-1px_0] pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[32px] py-[24px] relative size-full">
          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-center text-white tracking-[-0.22px] w-full">Sewer work</p>
        </div>
      </div>
    </div>
  );
}

function TabLink2() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[4]" data-name="Tab link">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-r border-solid inset-[0_-1px_-1px_0] pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[32px] py-[24px] relative size-full">
          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-center text-white tracking-[-0.22px] w-full">Hydro-jetting</p>
        </div>
      </div>
    </div>
  );
}

function TabLink3() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[3]" data-name="Tab link">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-r border-solid inset-[0_-1px_-1px_0] pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[32px] py-[24px] relative size-full">
          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-center text-white tracking-[-0.22px] w-full">Excavation</p>
        </div>
      </div>
    </div>
  );
}

function TabLink4() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[2]" data-name="Tab link">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-r border-solid inset-[0_-1px_-1px_0] pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[32px] py-[24px] relative size-full">
          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-center text-white tracking-[-0.22px] w-full">Residential</p>
        </div>
      </div>
    </div>
  );
}

function TabLink5() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative z-[1]" data-name="Tab link">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[32px] py-[24px] relative size-full">
          <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-center text-white tracking-[-0.22px] w-full">Repairs</p>
        </div>
      </div>
    </div>
  );
}

function TabsMenu() {
  return (
    <div className="content-stretch flex h-[79px] isolate items-start relative shrink-0 w-full z-[2]" data-name="Tabs Menu">
      <TabLink />
      <TabLink1 />
      <TabLink2 />
      <TabLink3 />
      <TabLink4 />
      <TabLink5 />
    </div>
  );
}

function TaglineWrapper1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Emergency</p>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[44px] tracking-[-0.44px] w-full">Water lines break at the worst times</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">{`We answer the phone at three in the morning because that's when people need us. Fast response, fair price, problem solved.`}</p>
    </div>
  );
}

function ContentTop() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content Top">
      <TaglineWrapper1 />
      <Content4 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Actions">
      <div className="relative rounded-[12px] shrink-0" data-name="Button">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn more</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0" data-name="Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">→</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start justify-center min-w-px relative" data-name="Content">
      <ContentTop />
      <Actions2 />
    </div>
  );
}

function TabPane() {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Tab Pane 1">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[80px] items-center p-[48px] relative size-full">
          <Content3 />
          <div className="aspect-[552/552] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Placeholder Image">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage1} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabsContent() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full z-[1]" data-name="Tabs Content">
      <TabPane />
    </div>
  );
}

function TabContainer() {
  return (
    <div className="bg-[#002336] relative rounded-[16px] shrink-0 w-full" data-name="Tab container">
      <div className="content-stretch flex flex-col isolate items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <TabsMenu />
        <TabsContent />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Content1 />
      <TabContainer />
    </div>
  );
}

function Layout1() {
  return (
    <div className="bg-[#002336] relative shrink-0 w-full" data-name="Layout / 507 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Tagline Wrapper">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">Equipment</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-[#070301] w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">Professional tools that make the difference</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`We don't cut corners on equipment. Hydro-jetting systems, excavation capabilities, and diagnostic tools mean we solve problems instead of just patching them.`}</p>
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper2 />
      <Content7 />
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Content">
      <SectionTitle />
    </div>
  );
}

function Actions3() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <div className="relative rounded-[12px] shrink-0" data-name="Button">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">See services</p>
        </div>
        <div aria-hidden="true" className="absolute border border-[rgba(7,3,1,0.15)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0" data-name="Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">→</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, #070301)" id="Vector" stroke="var(--stroke-0, #070301)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Content">
      <Content6 />
      <Actions3 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-name="Component">
      <Content5 />
      <div className="aspect-[600/640] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage2} />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Component />
    </div>
  );
}

function Layout() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Layout / 13 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-center text-white w-full" data-name="Section Title">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">What customers say</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Trusted by Lafayette homeowners</p>
    </div>
  );
}

function Stars() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_3_1598)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p84d7480} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, white)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_3_1598">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <Stars />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] text-white w-[352px]">Darren showed up at dawn on a Saturday when our water line burst, and he had it fixed before we finished coffee.</p>
    </div>
  );
}

function AvatarContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px not-italic relative text-[16px] text-white" data-name="Avatar Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Michael Broussard</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">Homeowner, Lafayette</p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar">
      <div className="relative shrink-0 size-[48px]" data-name="Avatar Image">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" src={imgAvatarImage} width="48" />
      </div>
      <AvatarContent />
    </div>
  );
}

function Column2() {
  return (
    <div className="bg-[#002f48] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Column">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <Content9 />
          <Avatar />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Stars1() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_3_1598)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p84d7480} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, white)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_3_1598">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <Stars1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] text-white w-[352px]">{`No surprises, no upselling, just honest work and a fair bill—that's rare in this business.`}</p>
    </div>
  );
}

function AvatarContent1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px not-italic relative text-[16px] text-white" data-name="Avatar Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Jennifer Thibodeaux</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">Property manager, Acadiana</p>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar">
      <div className="relative shrink-0 size-[48px]" data-name="Avatar Image">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" src={imgAvatarImage1} width="48" />
      </div>
      <AvatarContent1 />
    </div>
  );
}

function Column3() {
  return (
    <div className="bg-[#002f48] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Column">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <Content10 />
          <Avatar1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Stars2() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_3_1598)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p84d7480} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, white)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_3_1598">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <Stars2 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] text-white w-[352px]">They treated our old Creole cottage like it mattered, because to them it did.</p>
    </div>
  );
}

function AvatarContent2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[1.5] min-w-px not-italic relative text-[16px] text-white" data-name="Avatar Content">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 w-full">Robert Guidry</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 w-full">Homeowner, Lafayette</p>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Avatar">
      <div className="relative shrink-0 size-[48px]" data-name="Avatar Image">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" src={imgAvatarImage2} width="48" />
      </div>
      <AvatarContent2 />
    </div>
  );
}

function Column4() {
  return (
    <div className="bg-[#002f48] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Column">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
          <Content11 />
          <Avatar2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Column2 />
      <Column3 />
      <Column4 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <Row />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle1 />
      <Content8 />
    </div>
  );
}

function Testimonial() {
  return (
    <div className="bg-[#002f48] relative shrink-0 w-full" data-name="Testimonial / 17 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function TaglineWrapper3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Tagline Wrapper">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Track record</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">Numbers that speak for themselves</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`We've built our reputation on showing up fast, doing the work right, and keeping customers satisfied. These numbers reflect what we've earned through years of honest service.`}</p>
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Section Title">
      <TaglineWrapper3 />
      <Content14 />
    </div>
  );
}

function Actions4() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn more</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center relative rounded-[12px] shrink-0" data-name="Button">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">→</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="chevron_right">
          <div className="absolute inset-[25.72%_36.66%_25.88%_35.46%]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.69159 11.6166">
              <path d={svgPaths.p36daa800} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start max-w-[400px] min-w-px relative" data-name="Content">
      <SectionTitle2 />
      <Actions4 />
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[80px] text-right text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        15+
      </p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full" data-name="Divider">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 1">
                <line id="Divider" stroke="var(--stroke-0, white)" strokeOpacity="0.2" x2="320" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-right text-white w-full">Experience handling everything from simple repairs to complex work</p>
    </div>
  );
}

function Stat() {
  return (
    <div className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-white tracking-[-0.22px] w-full">Years serving Acadiana</p>
        <Content15 />
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[80px] text-right text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        3
      </p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full" data-name="Divider">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 1">
                <line id="Divider" stroke="var(--stroke-0, white)" strokeOpacity="0.2" x2="320" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-right text-white w-full">Fully equipped for residential and commercial plumbing needs</p>
    </div>
  );
}

function Stat1() {
  return (
    <div className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-white tracking-[-0.22px] w-full">Trucks ready to roll</p>
        <Content16 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Stat />
      <Stat1 />
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[80px] text-right text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        30 min
      </p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full" data-name="Divider">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 1">
                <line id="Divider" stroke="var(--stroke-0, white)" strokeOpacity="0.2" x2="320" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-right text-white w-full">We prioritize emergencies and get there when it matters most</p>
    </div>
  );
}

function Stat2() {
  return (
    <div className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-white tracking-[-0.22px] w-full">Average response time</p>
        <Content17 />
      </div>
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[80px] text-right text-white w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        2000+
      </p>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <div className="h-0 relative w-full" data-name="Divider">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 1">
                <line id="Divider" stroke="var(--stroke-0, white)" strokeOpacity="0.2" x2="320" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] text-right text-white w-full">Families and businesses throughout Lafayette and surrounding areas</p>
    </div>
  );
}

function Stat3() {
  return (
    <div className="bg-[#0b8483] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="Stat">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[48px] items-start p-[32px] relative size-full">
        <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.4] relative shrink-0 text-[22px] text-white tracking-[-0.22px] w-full">{`Homes we've served`}</p>
        <Content18 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Stat2 />
      <Stat3 />
    </div>
  );
}

function Stats() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Stats">
      <Row1 />
      <Row2 />
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-name="Content">
      <Content13 />
      <Stats />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Content12 />
    </div>
  );
}

function Stats1() {
  return (
    <div className="bg-[#0b8483] relative shrink-0 w-full" data-name="Stats / 43 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 text-center text-white w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">Ready for reliable plumbing</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`Call us now or schedule a time that works for you. We're here when you need us.`}</p>
    </div>
  );
}

function Actions5() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Actions">
      <div className="bg-white content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#0077b6] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[#070301] text-[16px] whitespace-nowrap">Call now</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.6)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Schedule service</p>
      </div>
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-center max-w-[768px] min-w-px relative" data-name="Content">
      <Content20 />
      <Actions5 />
    </div>
  );
}

function Card() {
  return (
    <div className="relative rounded-[16px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute inset-0 overflow-hidden rounded-[16px]">
          <img alt="" className="absolute h-[552.32%] left-[-0.12%] max-w-none top-[-343.28%] w-full" src={imgCard} />
        </div>
        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 rounded-[16px]" />
      </div>
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center p-[64px] relative size-full">
          <Content19 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Card />
    </div>
  );
}

function Cta() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="CTA / 53 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function SectionTitle3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[768px] relative shrink-0 text-center text-white w-full" data-name="Section Title">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.2] relative shrink-0 text-[52px] tracking-[-0.52px] w-full">FAQ</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Common questions about our services, pricing, and how we work</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full">How fast can you respond?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">{`We aim for thirty minutes or less on emergency calls. During business hours, we typically schedule same-day or next-day service. If it's a true emergency at three in the morning, we answer the phone.`}</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full">Do you charge for estimates?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">No. We come out, assess the problem, explain what needs to be done, and give you a fair price before we start any work. No hidden fees, no surprises.</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full">Can you handle sewer work?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">{`Yes. We have the equipment and expertise for everything from simple cleanouts to complete line replacement. Sewer problems demand precision, and that's what we deliver.`}</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full">What areas do you serve?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">{`We serve Lafayette and the surrounding Acadiana area. If you're not sure whether we reach your location, call us and we'll let you know straight.`}</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List Item">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[18px] w-full">Do you work on weekends?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[16px] w-full">We handle emergency calls seven days a week. For routine service, we work Monday through Friday, but we can often fit in weekend appointments if needed.</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start leading-[1.5] max-w-[768px] not-italic overflow-clip relative shrink-0 text-white w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-center text-white w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Still have questions?</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`Reach out and we'll answer what you need to know.`}</p>
    </div>
  );
}

function Actions6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Contact us</p>
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[560px] relative shrink-0 w-full" data-name="Content">
      <Content22 />
      <Actions6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <SectionTitle3 />
      <List />
      <Content21 />
    </div>
  );
}

function Faq() {
  return (
    <div className="bg-[#0b8483] relative shrink-0 w-full" data-name="FAQ / 7 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Email</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">{`Send us a message and we'll get back to you within one business day.`}</p>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full" data-name="Contact Info">
      <Content24 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] underline w-full">contact@darrenaucoinplumbing.com</p>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[48px]" data-name="mail">
        <div className="absolute inset-[16.02%_7.69%_16.04%_7.71%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.61 32.61">
            <path d={svgPaths.pbb43500} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <ContactInfo />
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Phone</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">Call us for emergencies, estimates, or to schedule your service appointment.</p>
    </div>
  );
}

function ContactInfo1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full" data-name="Contact Info">
      <Content26 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] underline w-full">(337) 224-4852</p>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[48px]" data-name="call">
        <div className="absolute inset-[11.85%_11.85%_11.88%_11.88%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.61 36.61">
            <path d={svgPaths.p232e5400} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <ContactInfo1 />
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['Rubik:Medium',sans-serif] font-medium leading-[1.3] relative shrink-0 text-[36px] tracking-[-0.36px] w-full">Office</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">Visit us in Lafayette during business hours or call ahead to schedule a time.</p>
    </div>
  );
}

function ContactInfo2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full" data-name="Contact Info">
      <Content28 />
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] underline w-full">Lafayette, Louisiana 70501</p>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-w-px relative" data-name="Content">
      <div className="overflow-clip relative shrink-0 size-[48px]" data-name="location_on">
        <div className="absolute inset-[7.69%_16.02%_9.89%_16.04%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32.61 39.562">
            <path d={svgPaths.p1f676880} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <ContactInfo2 />
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex gap-[48px] items-center relative shrink-0 w-full" data-name="Row">
      <Content23 />
      <Content25 />
      <Content27 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Row3 />
    </div>
  );
}

function Contact() {
  return (
    <div className="bg-[#002f48] relative shrink-0 w-full" data-name="Contact / 17 /">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[112px] relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Logo">
      <div className="h-[188px] relative rounded-[51px] shrink-0 w-[417px]" data-name="Screenshot_20240605_215222_Gmail 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[51px] size-full" src={imgScreenshot20240605215222Gmail1} />
      </div>
    </div>
  );
}

function Links() {
  return (
    <div className="content-start flex flex-wrap font-['Inter:Semi_Bold',sans-serif] font-semibold gap-[32px] items-start leading-[1.5] max-w-[480px] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-nowrap" data-name="Links">
      <p className="relative shrink-0">About us</p>
      <p className="relative shrink-0">Services</p>
      <p className="relative shrink-0">Contact</p>
      <p className="relative shrink-0">FAQ</p>
      <p className="relative shrink-0">Testimonials</p>
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px relative" data-name="Column">
      <Logo />
      <Links />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-start relative shrink-0 w-full" data-name="Form">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-[1_0_0] items-center min-w-px py-[8px] relative" data-name="Text input">
        <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.5] min-w-px not-italic relative text-[16px] text-[rgba(255,255,255,0.6)]">Enter your email</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Subscribe</p>
      </div>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex h-[18px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="[text-decoration-skip-ink:none] decoration-solid font-['Roboto:Regular',sans-serif] font-normal h-[18px] leading-[1.5] relative shrink-0 text-[12px] text-white underline w-[249px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        By subscribing you agree to our Privacy Policy
      </p>
    </div>
  );
}

function Actions7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Actions">
      <Form />
      <Content30 />
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[400px]" data-name="Column">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.5] not-italic relative shrink-0 text-[16px] text-white w-full">Subscribe</p>
      <Actions7 />
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Content">
      <Column5 />
      <Column6 />
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0" data-name="Footer Links">
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline">Privacy Policy</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline">Terms of Service</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline">Cookies Settings</p>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal items-start justify-between leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-nowrap" data-name="Row">
      <FooterLinks />
      <p className="relative shrink-0">{`© 2025 Darren Aucoin's Plumbing LLC. All rights reserved.`}</p>
    </div>
  );
}

function Credits() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full" data-name="Credits">
      <div className="h-0 relative shrink-0 w-full" data-name="Divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1280 1">
            <line id="Divider" stroke="var(--stroke-0, white)" strokeOpacity="0.2" x2="1280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Row4 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <Content29 />
      <Credits />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#002336] relative shrink-0 w-full" data-name="Footer / 8 /">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[64px] py-[80px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

export default function HomeDesktop() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Home • Desktop">
      <Navbar />
      <Header />
      <Layout1 />
      <Layout />
      <Testimonial />
      <Stats1 />
      <Cta />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}