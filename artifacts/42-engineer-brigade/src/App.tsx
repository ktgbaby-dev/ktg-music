import { type FormEvent, type ReactNode, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Building2, Check, ChevronRight, GraduationCap, Mail, MapPin, Menu, Network, Phone, Send, Wrench, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type Capability = {
  number: string;
  title: string;
  summary: string;
  details: string[];
  icon: typeof Building2;
  tone: string;
};

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Construction & infrastructure',
    summary: 'Practical structures, essential facilities, and reliable spaces that help communities keep moving.',
    details: ['Site preparation and civil works', 'Facilities and access improvements', 'Maintenance-minded delivery'],
    icon: Building2,
    tone: 'bg-[#d8d2b9]',
  },
  {
    number: '02',
    title: 'Bridging operations',
    summary: 'Planned crossings and temporary access solutions for changing terrain and everyday movement.',
    details: ['Modular crossing systems', 'Route and ground assessment', 'Coordinated, safety-led execution'],
    icon: Network,
    tone: 'bg-[#c5c9b5]',
  },
  {
    number: '03',
    title: 'Equipment support',
    summary: 'Organised stewardship of specialist equipment, tools, and the people who keep them ready.',
    details: ['Equipment care and readiness', 'Workshop support practices', 'Resource-conscious planning'],
    icon: Wrench,
    tone: 'bg-[#ded0b2]',
  },
  {
    number: '04',
    title: 'Training & development',
    summary: 'A steady investment in skills, judgement, and the professional habits behind good engineering.',
    details: ['Technical learning pathways', 'Team-based field practice', 'Continuous improvement culture'],
    icon: GraduationCap,
    tone: 'bg-[#ccd0c0]',
  },
];

const principles = [
  { label: 'Purpose', text: 'Build useful things. Leave them better.' },
  { label: 'Posture', text: 'Calm under pressure. Exact by habit.' },
  { label: 'People', text: 'Train generously. Work as one.' },
];

function Crest({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`relative flex h-14 w-12 shrink-0 items-center justify-center ${dark ? 'text-[#ded6bc]' : 'text-[#3f4935]'}`} data-testid="generic-crest">
      <svg viewBox="0 0 58 70" className="h-full w-full" aria-label="Generic shield placeholder" role="img">
        <path d="M29 2 53 10v24c0 15-10 27-24 34C15 61 5 49 5 34V10L29 2Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M29 13v39M13 32h32" stroke="currentColor" strokeWidth="1.8" opacity=".55" />
        <path d="m29 18 6.5 12.5L49 33l-10 10.2L41 57 29 50.5 17 57l2-13.8L9 33l13.5-2.5L29 18Z" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".7" />
      </svg>
      <span className="absolute bottom-0 font-mono text-[7px] tracking-[.2em]">42</span>
    </div>
  );
}

function SectionMarker({ eyebrow, number }: { eyebrow: string; number: string }) {
  return (
    <div className="mb-5 flex items-center gap-3" data-testid={`marker-${number}`}>
      <span className="h-px w-7 bg-[#c4a25b]" />
      <span className="mono-face text-[10px] font-medium uppercase tracking-[.22em] text-[#626750]">{number} / {eyebrow}</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#about', label: 'About', id: 'link-nav-about' },
    { href: '#capabilities', label: 'Capabilities', id: 'link-nav-capabilities' },
    { href: '#contact', label: 'Contact', id: 'link-nav-contact' },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10 text-[#f1ede0]" data-testid="site-header">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
          <Crest dark />
          <div className="leading-none">
            <div className="display-face text-[19px] font-bold uppercase tracking-[.02em]">42 Engineer</div>
            <div className="mono-face mt-1 text-[9px] uppercase tracking-[.24em] text-[#c5b889]">Brigade / Concept</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.id} href={link.href} className="mono-face text-[10px] uppercase tracking-[.18em] text-[#d5d0bd] transition-colors hover:text-[#c5b889]" data-testid={link.id}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden items-center gap-2 border border-[#c5b889]/70 px-4 py-2.5 mono-face text-[10px] uppercase tracking-[.14em] text-[#eee8d5] transition-colors hover:bg-[#c5b889] hover:text-[#293128] md:flex" data-testid="link-header-contact">
          Start a conversation <ArrowUpRight size={14} />
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-menu border-t border-white/10 bg-[#293128] px-5 py-4 md:hidden" aria-label="Mobile navigation" data-testid="mobile-navigation">
          {links.map((link) => (
            <a key={link.id} href={link.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-3 mono-face text-[11px] uppercase tracking-[.18em] text-[#eee8d5]" data-testid={`${link.id}-mobile`}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[720px] overflow-hidden bg-[#293128] text-[#f1ede0] lg:min-h-[790px]" data-testid="section-hero">
      <div className="topo-grid topo-lines absolute inset-0 opacity-80" />
      <div className="absolute -right-20 top-20 h-[520px] w-[520px] rounded-full border border-[#c5b889]/20 lg:right-[7%]" />
      <div className="absolute -right-8 top-32 h-[400px] w-[400px] rounded-full border border-[#c5b889]/15" />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#222a22]/70 to-transparent" />
      <Header />
      <div className="relative mx-auto grid max-w-[1320px] items-end gap-12 px-5 pb-20 pt-44 sm:px-8 lg:grid-cols-[1.2fr_.8fr] lg:px-12 lg:pb-24 lg:pt-52">
        <div className="reveal max-w-3xl">
          <div className="mb-7 flex items-center gap-3" data-testid="text-hero-label">
            <span className="h-px w-10 bg-[#c5b889]" />
            <span className="mono-face text-[10px] uppercase tracking-[.25em] text-[#c5b889]">Public-facing concept / 2024</span>
          </div>
          <h1 className="display-face max-w-4xl text-[clamp(4.6rem,12vw,10.5rem)] font-bold uppercase leading-[.78] tracking-[-.05em]" data-testid="heading-hero">
            Building<br /><span className="text-[#c5b889]">Strong.</span>
          </h1>
          <div className="mono-face mt-7 text-[11px] uppercase tracking-[.2em] text-[#c5b889]" data-testid="text-tagline">Building Strong, Building Nigeria</div>
          <p className="mt-9 max-w-xl text-base leading-7 text-[#d5d0bd] sm:text-lg" data-testid="text-hero-description">
            A fictional engineering unit concept focused on practical infrastructure, capable teams, and the quiet discipline behind work that lasts.
          </p>
          <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
            <a href="#capabilities" className="group inline-flex items-center gap-3 bg-[#c5b889] px-5 py-3.5 mono-face text-[10px] font-medium uppercase tracking-[.13em] text-[#293128] transition-transform hover:-translate-y-0.5" data-testid="link-hero-capabilities">
              Explore capabilities <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-3 border border-[#c5b889]/60 px-5 py-3.5 mono-face text-[10px] font-medium uppercase tracking-[.13em] text-[#eee8d5] transition-colors hover:bg-[#eee8d5] hover:text-[#293128]" data-testid="link-hero-contact">
              Contact the PRO <ChevronRight size={16} />
            </a>
          </div>
        </div>
        <div className="reveal reveal-delay-2 flex justify-start lg:justify-end">
          <div className="max-w-[290px] border-l border-[#c5b889]/60 pl-5" data-testid="hero-brief">
            <Crest dark />
            <div className="mono-face mt-6 text-[10px] uppercase tracking-[.18em] text-[#c5b889]">The brief</div>
            <p className="mt-3 text-sm leading-6 text-[#d5d0bd]">Engineering is not only what we build. It is how we prepare, how we solve, and how we show up for the work in front of us.</p>
            <div className="mt-7 flex items-center gap-2 text-[#c5b889]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c5b889]" />
              <span className="mono-face text-[9px] uppercase tracking-[.16em]">Ready by design</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-5 mono-face text-[9px] uppercase tracking-[.2em] text-[#9da18c] sm:left-8 lg:left-12" data-testid="text-hero-scroll">Scroll to inspect / 01</div>
      <div className="absolute bottom-5 right-5 mono-face text-[9px] uppercase tracking-[.2em] text-[#9da18c] sm:right-8 lg:right-12">NG — 06°N / 08°E</div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#ebe8dc] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-about">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
          <div>
            <SectionMarker eyebrow="orientation" number="02" />
            <h2 className="display-face max-w-sm text-6xl font-bold uppercase leading-[.88] text-[#3f4935] sm:text-7xl" data-testid="heading-about">Useful work.<br /><span className="text-[#b18c47]">Done well.</span></h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-8 text-[#3f4935] sm:text-2xl sm:leading-9" data-testid="text-about-lead">42 Engineer Brigade is a fictional, public-facing concept for a modern engineering unit: composed, capable, and accountable to the communities its work serves.</p>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#626750]" data-testid="text-about-body">Our work is presented here in broad terms only. The focus is on the engineering mindset — planning clearly, caring for equipment, building practical infrastructure, and developing people who can be trusted with complex work.</p>
            <div className="mt-10 grid gap-6 border-t border-[#3f4935]/20 pt-7 sm:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.label} data-testid={`principle-${principle.label.toLowerCase()}`}>
                  <div className="mono-face text-[10px] uppercase tracking-[.19em] text-[#b18c47]">{principle.label}</div>
                  <div className="mt-2 text-sm font-semibold leading-5 text-[#3f4935]">{principle.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = capability.icon;
  return (
    <article className={`group relative flex min-h-[340px] flex-col justify-between overflow-hidden border border-[#3f4935]/20 p-6 transition-colors hover:border-[#3f4935] ${capability.tone}`} data-testid={`card-capability-${capability.number}`}>
      <div className="flex items-start justify-between">
        <span className="mono-face text-[11px] text-[#626750]">{capability.number}</span>
        <Icon size={24} strokeWidth={1.4} className="text-[#3f4935] transition-transform duration-300 group-hover:rotate-6" />
      </div>
      <div>
        <h3 className="display-face max-w-[250px] text-4xl font-bold uppercase leading-[.9] text-[#3f4935]" data-testid={`heading-capability-${capability.number}`}>{capability.title}</h3>
        <p className="mt-4 max-w-[275px] text-sm leading-6 text-[#626750]">{capability.summary}</p>
        <ul className="mt-5 space-y-2 border-t border-[#3f4935]/20 pt-4">
          {capability.details.map((detail) => (
            <li key={detail} className="flex items-center gap-2 text-xs font-medium text-[#3f4935]"><Check size={13} className="text-[#b18c47]" /> {detail}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Capabilities() {
  return (
    <section id="capabilities" className="bg-[#f4f1e8] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-capabilities">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionMarker eyebrow="capability map" number="03" />
            <h2 className="display-face max-w-xl text-6xl font-bold uppercase leading-[.84] text-[#3f4935] sm:text-8xl" data-testid="heading-capabilities">Built for the<br /><span className="text-[#b18c47]">ground</span> beneath us.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#626750]" data-testid="text-capabilities-intro">Four broad disciplines. One shared standard: practical work, responsibly delivered.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability) => <CapabilityCard key={capability.number} capability={capability} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="bg-[#ebe8dc] px-5 py-24 sm:px-8 lg:px-12 lg:py-32" data-testid="section-contact">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
        <div>
          <SectionMarker eyebrow="public relations office" number="05" />
          <h2 className="display-face max-w-md text-6xl font-bold uppercase leading-[.84] text-[#3f4935] sm:text-8xl" data-testid="heading-contact">Open lines.<br /><span className="text-[#b18c47]">Clear words.</span></h2>
          <p className="mt-8 max-w-sm text-sm leading-7 text-[#626750]" data-testid="text-contact-intro">For general enquiries about this concept, public-facing engineering topics, or the design itself, send a note to the fictional Public Relations Office.</p>
          <div className="mt-10 space-y-5 border-t border-[#3f4935]/20 pt-7">
            <a href="mailto:hello@42engineer.example" className="flex items-start gap-4 text-sm text-[#3f4935] transition-colors hover:text-[#b18c47]" data-testid="link-contact-email">
              <Mail size={18} strokeWidth={1.5} /><span><span className="mono-face block text-[9px] uppercase tracking-[.17em] text-[#8a8c79]">Email</span><span className="mt-1 block">hello@42engineer.example</span></span>
            </a>
            <a href="tel:+234555042042" className="flex items-start gap-4 text-sm text-[#3f4935] transition-colors hover:text-[#b18c47]" data-testid="link-contact-phone">
              <Phone size={18} strokeWidth={1.5} /><span><span className="mono-face block text-[9px] uppercase tracking-[.17em] text-[#8a8c79]">Telephone</span><span className="mt-1 block">+234 555 042 042</span></span>
            </a>
            <div className="flex items-start gap-4 text-sm text-[#3f4935]" data-testid="text-contact-office">
              <MapPin size={18} strokeWidth={1.5} /><span><span className="mono-face block text-[9px] uppercase tracking-[.17em] text-[#8a8c79]">Office</span><span className="mt-1 block">Ibadan, Oyo State, Nigeria</span></span>
            </div>
          </div>
        </div>
        <div className="bg-[#f4f1e8] p-6 sm:p-9">
          {sent ? (
            <div className="flex min-h-[440px] flex-col justify-center" data-testid="status-contact-success">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c5b889] text-[#293128]"><Check size={23} /></div>
              <div className="mono-face mt-7 text-[10px] uppercase tracking-[.2em] text-[#b18c47]">Message received</div>
              <h3 className="display-face mt-3 max-w-sm text-5xl font-bold uppercase leading-[.88] text-[#3f4935]">Thank you for the note.</h3>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[#626750]">This concept form is client-side only. Your message has been acknowledged on this page and is not sent anywhere.</p>
              <button onClick={() => setSent(false)} className="mt-8 flex w-fit items-center gap-2 border-b border-[#3f4935] pb-1 mono-face text-[10px] uppercase tracking-[.15em] text-[#3f4935]" data-testid="button-contact-reset">Send another note <ArrowUpRight size={14} /></button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" data-testid="form-contact">
              <div className="flex items-center justify-between border-b border-[#3f4935]/20 pb-5">
                <div className="mono-face text-[10px] uppercase tracking-[.18em] text-[#626750]">General enquiry</div>
                <span className="mono-face text-[10px] text-[#8a8c79]">PR / 001</span>
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                <label className="block"><span className="mono-face text-[10px] uppercase tracking-[.15em] text-[#626750]">Your name</span><input required name="name" type="text" placeholder="Full name" className="mt-3 w-full border-0 border-b border-[#3f4935]/30 bg-transparent px-0 py-2.5 text-sm text-[#3f4935] outline-none placeholder:text-[#9a9b8c] focus:border-[#3f4935]" data-testid="input-contact-name" /></label>
                <label className="block"><span className="mono-face text-[10px] uppercase tracking-[.15em] text-[#626750]">Email address</span><input required name="email" type="email" placeholder="you@example.com" className="mt-3 w-full border-0 border-b border-[#3f4935]/30 bg-transparent px-0 py-2.5 text-sm text-[#3f4935] outline-none placeholder:text-[#9a9b8c] focus:border-[#3f4935]" data-testid="input-contact-email" /></label>
              </div>
              <label className="block"><span className="mono-face text-[10px] uppercase tracking-[.15em] text-[#626750]">Subject</span><input required name="subject" type="text" placeholder="What would you like to discuss?" className="mt-3 w-full border-0 border-b border-[#3f4935]/30 bg-transparent px-0 py-2.5 text-sm text-[#3f4935] outline-none placeholder:text-[#9a9b8c] focus:border-[#3f4935]" data-testid="input-contact-subject" /></label>
              <label className="block"><span className="mono-face text-[10px] uppercase tracking-[.15em] text-[#626750]">Your message</span><textarea required name="message" rows={4} placeholder="Write a short note..." className="mt-3 w-full resize-none border-0 border-b border-[#3f4935]/30 bg-transparent px-0 py-2.5 text-sm text-[#3f4935] outline-none placeholder:text-[#9a9b8c] focus:border-[#3f4935]" data-testid="textarea-contact-message" /></label>
              <button type="submit" className="group inline-flex items-center gap-3 bg-[#3f4935] px-5 py-3.5 mono-face text-[10px] font-medium uppercase tracking-[.14em] text-[#f4f1e8] transition-transform hover:-translate-y-0.5" data-testid="button-contact-submit">Send message <Send size={15} className="transition-transform group-hover:translate-x-1" /></button>
              <p className="text-[11px] leading-5 text-[#8a8c79]" data-testid="text-contact-disclaimer">This is a fictional sample project. No personal information is transmitted or stored.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#293128] px-5 py-12 text-[#ded6bc] sm:px-8 lg:px-12" data-testid="site-footer">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col justify-between gap-10 border-b border-[#c5b889]/25 pb-10 md:flex-row md:items-end">
          <div className="flex items-center gap-3">
            <Crest dark />
            <div><div className="display-face text-2xl font-bold uppercase">42 Engineer Brigade</div><div className="mono-face mt-1 text-[9px] uppercase tracking-[.2em] text-[#a9aa95]">Building Strong, Building Nigeria</div></div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="#top" className="mono-face text-[10px] uppercase tracking-[.15em] text-[#d5d0bd] hover:text-[#c5b889]" data-testid="link-footer-top">Back to top <ArrowUpRight size={13} className="ml-1 inline" /></a>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-7 text-[11px] leading-5 text-[#a9aa95] md:flex-row">
          <p data-testid="text-footer-disclaimer">Concept design by Kal's Digital — sample project, not an official site.</p>
          <p className="mono-face text-[9px] uppercase tracking-[.16em]">Generic crest placeholder / No affiliation</p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="paper-grain min-h-[100dvh] overflow-x-hidden">
      <Hero />
      <About />
      <Capabilities />
      <Contact />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Router />
    </WouterRouter>
  );
}

export default App;