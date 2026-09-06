import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { ArrowDown, ArrowRight, ExternalLink, Menu, Pause, Play, Send, SkipBack, SkipForward, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const artist = {
  name: 'Kaalim',
  fullName: 'Kaalim (The Great)',
  signoff: 'The channel. The music. The world.',
  tagline: 'A living broadcast for the beautifully strange.',
  bio: 'Somewhere between a bedroom transmitter and a midnight cartoon, Kaalim sends songs into the dark and waits for the right people to find the frequency. The signal is restless, tender, and never quite where you left it.',
};

const releases = [
  { id: 'paranoid-dreams', title: 'Paranoid Dreams', year: '2024', type: 'Album', color: '#ff4c9a', shape: '#3da9e8', word: 'DREAMS', tilt: '-3deg' },
  { id: 'static-season', title: 'Static Season', year: '2024', type: 'EP', color: '#94ef68', shape: '#ffda2f', word: 'STATIC', tilt: '4deg' },
  { id: 'late-night-animations', title: 'Late Night Animations', year: '2023', type: 'Single', color: '#3da9e8', shape: '#ff4c9a', word: 'LATE', tilt: '-5deg' },
  { id: 'channel-zero', title: 'Channel Zero', year: '2022', type: 'Single', color: '#ffda2f', shape: '#94ef68', word: 'ZERO', tilt: '2deg' },
];

const videos = [
  { id: 'program-001', number: 'PROGRAM 001', title: 'Paranoid Dreams', type: 'Music video' },
  { id: 'program-002', number: 'PROGRAM 002', title: 'Live From The Static', type: 'Live session' },
  { id: 'program-003', number: 'PROGRAM 003', title: 'Signal Study 04', type: 'Visualizer' },
  { id: 'program-004', number: 'PROGRAM 004', title: 'Behind The Signal', type: 'Field tape' },
];

const schedule = [
  { time: '08:00', show: 'New Single', type: 'FIRST TRANSMISSION' },
  { time: '11:30', show: 'Behind The Scenes', type: 'FIELD TAPE' },
  { time: '14:00', show: 'Paranoid Dreams', type: 'MUSIC VIDEO' },
  { time: '18:00', show: 'Live Session', type: 'STUDIO A' },
  { time: '22:00', show: 'Late Night Mix', type: 'AFTER HOURS' },
];

const socials = [
  { label: 'Instagram', code: 'IG — SIGNAL 01', href: 'https://instagram.com', rotate: '-2deg' },
  { label: 'TikTok', code: 'TT — SIGNAL 02', href: 'https://tiktok.com', rotate: '3deg' },
  { label: 'YouTube', code: 'YT — SIGNAL 03', href: 'https://youtube.com', rotate: '-1deg' },
  { label: 'X / Twitter', code: 'XX — SIGNAL 04', href: 'https://x.com', rotate: '2deg' },
  { label: 'Spotify', code: 'SP — SIGNAL 05', href: 'https://spotify.com', rotate: '-3deg' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Brand() {
  return (
    <span className="brand-lockup" aria-label="Kaalim Television">
      {'KAALIM'.split('').map((letter, index) => (
        <span className="brand-letter" style={{ '--r': `${[-3, 2, -2, 3, -4, 1][index]}deg` } as CSSProperties} key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
      <span className="brand-sub">TV CHANNEL</span>
    </span>
  );
}

function ChannelNav({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  const navItems = [
    { label: 'On Air', id: 'on-air' },
    { label: 'Music', id: 'library' },
    { label: 'Visuals', id: 'programming' },
    { label: 'About', id: 'character' },
  ];
  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };
  return (
    <>
      <header className="topbar">
        <button type="button" className="brand-lockup" onClick={() => go('home')} data-testid="button-brand-home">
          <Brand />
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button type="button" className="nav-link" onClick={() => go(item.id)} key={item.id} data-testid={`button-nav-${item.id}`}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="on-air"><span />ON AIR</div>
        <span className="channel-mark">CH. 01</span>
        <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button type="button" className="nav-link" onClick={() => go(item.id)} key={item.id} data-testid={`button-mobile-nav-${item.id}`}>
            {item.label}
          </button>
        ))}
        <div className="on-air"><span />CHANNEL SIGNAL ACTIVE</div>
      </div>
    </>
  );
}

function Intro({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const sequence = ['STATIC', 'CHANNEL SIGNAL', 'CH. 01', 'KAALIM', 'WEBSITE'];
  useEffect(() => {
    const stepTimer = window.setInterval(() => setStep((current) => Math.min(current + 1, sequence.length - 1)), 330);
    const closeTimer = window.setTimeout(onComplete, 1900);
    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(closeTimer);
    };
  }, [onComplete, sequence.length]);
  return (
    <div className="intro-screen" role="dialog" aria-label="Channel ident">
      <div className="intro-inner">
        <div className="intro-static" />
        <div className="intro-status mono" data-testid="status-intro-sequence">{sequence[step]}</div>
        <button type="button" className="skip-intro" onClick={onComplete} data-testid="button-skip-intro">SKIP INTRO <ArrowRight size={11} /></button>
      </div>
    </div>
  );
}

function TvSet() {
  return (
    <div className="tv-set" aria-label="Retro television with a live abstract signal">
      <div className="tv-antenna" />
      <div className="tv-screen" />
      <div className="tv-control"><span className="tv-knob" /><span className="tv-knob" /></div>
      <div className="tv-speaker" />
      <div className="tv-foot" /><div className="tv-foot" />
      <span className="broadcast-stamp">LIVE SIGNAL</span>
      <span className="hero-corner">VOL. 001 / CH. 01</span>
    </div>
  );
}

function Player({ activeTrack, setActiveTrack }: { activeTrack: string; setActiveTrack: (track: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const current = useMemo(() => releases.find((release) => release.id === activeTrack) ?? releases[0], [activeTrack]);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((value) => value >= 100 ? 0 : value + 1.25), 300);
    return () => window.clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    setProgress(18);
  }, [activeTrack]);
  const updateProgress = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setProgress(Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100)));
  };
  const waveform = Array.from({ length: 31 }, (_, index) => 14 + ((index * 17) % 30));
  return (
    <div className="player" data-testid="player-on-air">
      <div className="player-head"><span>NOW PLAYING</span><span>CH. 01 / SIGNAL: ACTIVE</span></div>
      <div className="player-title">{current.title.toUpperCase()}</div>
      <div className={`waveform ${playing ? 'playing' : ''}`} aria-label={playing ? 'Audio playing' : 'Audio paused'}>
        {waveform.map((height, index) => <i key={index} style={{ '--h': `${height}%`, animationDelay: `${index * -0.04}s` } as CSSProperties} />)}
      </div>
      <div className="progress-line" style={{ '--progress': `${progress}%` } as CSSProperties} onClick={updateProgress} role="slider" aria-label="Track progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} tabIndex={0} data-testid="slider-track-progress"><span /></div>
      <div className="player-time"><span>0:{String(Math.floor(progress * 1.58)).padStart(2, '0')}</span><span>2:38</span></div>
      <div className="player-controls">
        <button type="button" aria-label="Previous track" onClick={() => setActiveTrack(releases[(releases.findIndex((release) => release.id === activeTrack) + releases.length - 1) % releases.length].id)} data-testid="button-previous-track"><SkipBack size={17} /></button>
        <button type="button" className="play" aria-label={playing ? 'Pause track' : 'Play track'} onClick={() => setPlaying(!playing)} data-testid="button-play-pause">{playing ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button>
        <button type="button" aria-label="Next track" onClick={() => setActiveTrack(releases[(releases.findIndex((release) => release.id === activeTrack) + 1) % releases.length].id)} data-testid="button-next-track"><SkipForward size={17} /></button>
      </div>
      <div className="stream-links">
        {['Spotify', 'Apple Music', 'YouTube', 'Audiomack'].map((platform) => <a className="stream-link" href={`https://${platform.toLowerCase().replace(' ', '')}.com`} target="_blank" rel="noreferrer" key={platform} data-testid={`link-stream-${platform.toLowerCase().replace(' ', '-')}`}>{platform} <ExternalLink size={10} /></a>)}
      </div>
    </div>
  );
}

function ReleaseCard({ release, onPlay }: { release: typeof releases[number]; onPlay: (id: string) => void }) {
  return (
    <article className="release-card" onClick={() => onPlay(release.id)} style={{ '--tilt': release.tilt } as CSSProperties} data-testid={`card-release-${release.id}`}>
      <div className="release-cover" style={{ '--cover': release.color, '--shape': release.shape } as CSSProperties} data-index={`${release.year} / ${release.type.toUpperCase()}`}>
        <div className="cover-shape" /><div className="cover-word">{release.word}</div>
      </div>
      <div className="release-meta">
        <div><h3>{release.title}</h3><p>{release.year} / {release.type}</p></div>
        <button type="button" className="card-play" aria-label={`Play ${release.title}`} onClick={(event) => { event.stopPropagation(); onPlay(release.id); }} data-testid={`button-play-release-${release.id}`}><Play size={12} fill="currentColor" /></button>
      </div>
    </article>
  );
}

function VideoModal({ video, onClose }: { video: typeof videos[number]; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${video.title} video`} onClick={onClose}>
      <div className="video-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Close video" onClick={onClose} data-testid="button-close-video"><X /></button>
        <div className="modal-screen" />
        <div className="modal-caption"><span>{video.number} / {video.title}</span><span>{video.type}</span></div>
      </div>
    </div>
  );
}

function Home() {
  const [introVisible, setIntroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeTrack, setActiveTrack] = useState(releases[0].id);
  const [video, setVideo] = useState<typeof videos[number] | null>(null);
  const [sent, setSent] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const visibleReleases = filter === 'All' ? releases : releases.filter((release) => release.type === filter);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };
  const playRelease = (id: string) => {
    setActiveTrack(id);
    scrollToSection('on-air');
  };

  return (
    <main className="channel-page" ref={revealRef}>
      {introVisible && <Intro onComplete={() => setIntroVisible(false)} />}
      <ChannelNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="hero" id="home">
        <div className="section-wrap hero-grid">
          <div className="hero-copy reveal">
            <div className="hero-kicker eyebrow"><span className="on-air"><span />ON AIR</span> / YOU ARE HERE</div>
            <h1 className="hero-title display"><span>NOW</span><span className="blue-block">TUNING</span><span>IN...</span></h1>
            <p className="hero-caption"><strong>{artist.fullName}</strong><br />{artist.tagline}</p>
            <button type="button" className="yellow-button" onClick={() => scrollToSection('on-air')} data-testid="button-listen-now">LISTEN NOW <ArrowRight className="arrow" size={18} /></button>
          </div>
          <div className="reveal"><TvSet /><span className="hero-orbit">*</span></div>
        </div>
        <span className="hero-fineprint">THE CHANNEL / THE MUSIC / THE WORLD</span>
      </section>

      <div className="marquee" aria-label="Kaalim channel broadcast message"><div className="marquee-track">KAALIM TV CHANNEL <span>+</span> LIVE FROM SOMEWHERE BETWEEN REALITY &amp; CH. 301 <span>+</span> DO NOT ADJUST YOUR SET <span>+</span> KAALIM TV CHANNEL <span>+</span> LIVE FROM SOMEWHERE BETWEEN REALITY &amp; CH. 301 <span>+</span></div></div>

      <section className="on-air-section section-pad" id="on-air">
        <div className="section-wrap">
          <div className="on-air-grid">
            <div className="reveal"><div className="eyebrow">SECTION 02 / NEW TRANSMISSION</div><div className="release-art" aria-label="Paranoid Dreams artwork"><div className="art-hair" /><div className="art-face" /></div></div>
            <div className="release-copy reveal"><div className="eyebrow">NOW PLAYING / ON AIR</div><h2 className="section-title">ON<br />AIR</h2><h3>{releases.find((release) => release.id === activeTrack)?.title}</h3><div className="artist">{artist.fullName} / CH. 01</div><p className="release-desc">A new transmission for sleepless minds, bad decisions, and anyone listening from the other side of the wall.</p><Player activeTrack={activeTrack} setActiveTrack={setActiveTrack} /></div>
          </div>
        </div>
      </section>

      <section className="library-section section-pad" id="library">
        <div className="section-wrap">
          <div className="section-head reveal"><div><div className="eyebrow text-lime">SECTION 03 / NETWORK ARCHIVE</div><h2 className="section-title">THE<br /><span className="text-yellow">LIBRARY</span></h2></div><div className="filter-bar" role="group" aria-label="Filter releases">{['All', 'Single', 'EP', 'Album'].map((item) => <button type="button" className={`filter-btn ${filter === item ? 'active' : ''}`} onClick={() => setFilter(item)} key={item} data-testid={`button-filter-${item.toLowerCase()}`}>{item === 'All' ? 'ALL' : `${item.toUpperCase()}${item === 'EP' ? 'S' : 'S'}`}</button>)}</div></div>
          <div className="release-grid">{visibleReleases.map((release) => <ReleaseCard key={release.id} release={release} onPlay={playRelease} />)}</div>
        </div>
      </section>

      <section className="programming section-pad" id="programming">
        <div className="section-wrap">
          <div className="section-head reveal"><div><div className="eyebrow">SECTION 04 / MOVING PICTURES</div><h2 className="section-title">PRO<br />GRAMMING</h2></div><p className="hand" style={{ fontSize: 25, maxWidth: 180, transform: 'rotate(-5deg)' }}>watch the weird stuff →</p></div>
          <div className="video-grid reveal">{videos.map((item) => <button type="button" className="video-card" onClick={() => setVideo(item)} key={item.id} data-testid={`button-video-${item.id}`}><span className="video-no">{item.number}</span><div className="video-blob" /><div className="video-info"><div><h3>{item.title}</h3><p>{item.type}</p></div><span className="video-play"><Play size={16} fill="currentColor" /></span></div></button>)}</div>
        </div>
      </section>

      <section className="character-section section-pad" id="character">
        <div className="section-wrap character-grid">
          <div className="character-art reveal"><div className="character-head" /><span className="character-label one">SPECIES: HUMAN?</span><span className="character-label two">STATUS: ACTIVE</span><span className="character-label three">SIGNAL: STRONG</span></div>
          <div className="character-copy reveal"><div className="eyebrow text-pink">SECTION 05 / THE OPERATOR</div><h2 className="display">MEET THE<br /><span className="text-blue">CHARACTER</span></h2><p>{artist.bio}</p><div className="fact-list"><div className="fact"><b>Origin</b>Unknown</div><div className="fact"><b>Current location</b>Somewhere between reality &amp; CH. 301</div><div className="fact"><b>Occupation</b>Signal operator</div><div className="fact"><b>Favorite noise</b>Rain on bad antennae</div></div></div>
        </div>
      </section>

      <section className="schedule-section section-pad" id="schedule">
        <div className="section-wrap">
          <div className="section-head reveal"><div><div className="eyebrow">SECTION 06 / KEEP WATCH</div><h2 className="section-title">TODAY'S<br /><span className="text-blue">PROGRAMMING</span></h2></div><ArrowDown size={34} /></div>
          <div className="schedule-layout"><p className="schedule-note reveal">The schedule is approximate. Broadcast interruptions are not only possible, they are encouraged.</p><div className="schedule-table reveal">{schedule.map((item, index) => <div className="schedule-row" key={item.time} data-testid={`row-schedule-${index}`}><span className="schedule-time">{item.time}</span><span className="schedule-show">{item.show}</span><span className="schedule-type">{item.type}</span></div>)}</div></div>
        </div>
      </section>

      <section className="signal-section section-pad" id="signal">
        <div className="section-wrap"><div className="eyebrow">SECTION 07 / FIND THE FREQUENCY</div><h2 className="section-title reveal">TUNE<br />IN<span className="text-cream">.</span></h2><div className="signal-grid">{socials.map((social) => <a className="signal-link reveal" style={{ '--rotate': social.rotate } as CSSProperties} href={social.href} target="_blank" rel="noreferrer" key={social.label} data-testid={`link-social-${social.label.toLowerCase().replace(/[^a-z]/g, '-')}`}><span className="signal-code">{social.code}</span><span className="signal-name">{social.label}</span><ExternalLink size={16} /></a>)}</div></div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="section-wrap contact-grid">
          <div className="reveal"><div className="eyebrow text-yellow">SECTION 08 / OPEN LINE</div><h2 className="contact-title">TRANSMIT<br /><span className="text-pink">A MESSAGE</span></h2><p className="contact-blurb">Bookings, strange collaborations, press, or a note from the other side. The control room is listening.</p></div>
          <form className="contact-form reveal" onSubmit={handleSubmit} data-testid="form-contact">
            <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="WHO IS CALLING?" data-testid="input-contact-name" /></div>
            <div className="form-field"><label htmlFor="email">Return frequency</label><input id="email" name="email" type="email" required placeholder="YOUR@SIGNAL.COM" data-testid="input-contact-email" /></div>
            <div className="form-field"><label htmlFor="reason">Transmission type</label><select id="reason" name="reason" defaultValue="Booking" data-testid="select-contact-reason"><option>Booking</option><option>Collaboration</option><option>Press / media</option><option>Just saying hi</option></select></div>
            <div className="form-field"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="SAY THE THING..." data-testid="textarea-contact-message" /></div>
            <button type="submit" className="yellow-button form-submit" data-testid="button-send-message">{sent ? 'MESSAGE RECEIVED' : 'SEND TRANSMISSION'} {sent ? <span>OK</span> : <Send size={15} />}</button>
            {sent && <p className="form-feedback" role="status" data-testid="status-contact-success">Your signal made it through. We will tune back soon.</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="section-wrap">
          <div className="footer-top"><div><Brand /><h2 className="footer-title">THANKS FOR<br /><span className="text-yellow">TUNING IN.</span></h2></div><p className="footer-copy">{artist.signoff}<br /><br />Keep the volume strange. Keep the signal alive.</p></div>
          <div className="footer-bottom"><span>© 2024 KAALIM TV CHANNEL / ALL SIGNALS RESERVED</span><span className="signal-lost">SIGNAL LOST... <span aria-hidden="true">*</span></span><span>CH. 01 / END OF TRANSMISSION</span></div>
        </div>
      </footer>
      {video && <VideoModal video={video} onClose={() => setVideo(null)} />}
    </main>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch>
    </ErrorBoundary>
  );
}

function App() {
  return <TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider>;
}

export default App;