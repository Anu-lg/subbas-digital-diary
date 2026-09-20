import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Gift,
  Heart,
  MapPin,
  Mic,
  Music2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { chapters, experience } from "@/data/experience";
import { memories, type Memory } from "@/data/memories";
import { balloonNotes, bouquetNotes, finalLetter, heartLetter, littleThings } from "@/data/messages";

type SceneProps = { next: () => void; openMemory: (index: number) => void };

export function BirthdayExperience() {
  const [chapter, setChapter] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [memoryIndex, setMemoryIndex] = useState<number | null>(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  const goTo = useCallback((next: number) => {
    const safe = Math.max(0, Math.min(chapters.length - 1, next));
    setUnlocked((value) => Math.max(value, safe));
    setChapter(safe);
  }, []);

  const openMemory = (index: number) => setMemoryIndex(index);
  const sceneProps = { next: () => goTo(chapter + 1), openMemory };

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-background text-foreground">
      <div className="grain pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(12px)", scale: 1.015 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(8px)", scale: 0.99 }}
          transition={{ duration: reducedMotion ? 0.2 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[100svh]"
        >
          {chapter === 0 && <OpeningScene next={() => { setMusicStarted(true); goTo(1); }} openMemory={openMemory} />}
          {chapter === 1 && <BalloonScene {...sceneProps} />}
          {chapter === 2 && <CakeScene {...sceneProps} />}
          {chapter === 3 && <BouquetScene {...sceneProps} />}
          {chapter === 4 && <HeartLetterScene {...sceneProps} />}
          {chapter === 5 && <MemoryTimeline {...sceneProps} />}
          {chapter === 6 && <LittleThingsScene {...sceneProps} />}
          {chapter === 7 && <PhotoWall {...sceneProps} />}
          {chapter === 8 && <UniverseScene {...sceneProps} />}
          {chapter === 9 && <GiftScene {...sceneProps} />}
          {chapter === 10 && <FinaleScene {...sceneProps} replay={() => goTo(0)} memories={() => goTo(5)} />}
        </motion.div>
      </AnimatePresence>

      {chapter > 0 && (
        <ChapterIndicator chapter={chapter} unlocked={unlocked} goTo={goTo} />
      )}
      {musicStarted && <MusicControl />}
      <AnimatePresence>
        {memoryIndex !== null && (
          <MemoryViewer index={memoryIndex} setIndex={setMemoryIndex} close={() => setMemoryIndex(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}

function Scene({ children, dark = false, className = "" }: { children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <section className={`scene ${dark ? "scene-dark" : "scene-paper"} ${className}`}>
      <div className="scene-inner">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-accent-foreground/75">{children}</p>;
}

function OpeningScene({ next }: SceneProps) {
  return (
    <Scene dark className="opening-scene">
      <div className="ambient-stars" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} className="font-display text-5xl text-gold sm:text-7xl md:text-8xl">
          {experience.date}
        </motion.p>
        <div className="mx-auto my-7 h-px w-12 bg-gold/60" />
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }} className="text-sm tracking-[0.12em] text-night-muted sm:text-base">
          Today isn't just another day…
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 1.1 }} className="mt-5 font-display text-4xl leading-tight text-night-foreground sm:text-6xl md:text-7xl">
          It's <em className="font-normal text-rose">your</em> day, Subba.
        </motion.h1>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 0.8 }} className="mt-12">
          <Button variant="quiet" size="story" onClick={next}>Open your surprise <ArrowRight /></Button>
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-night-muted">Best experienced with sound</p>
        </motion.div>
      </div>
    </Scene>
  );
}

function BalloonScene({ next }: SceneProps) {
  const [popped, setPopped] = useState<number[]>([]);
  const complete = popped.length === balloonNotes.length;
  return (
    <Scene className="balloon-scene">
      <div className="relative z-10 text-center">
        <Eyebrow>Chapter 01 · The first surprise</Eyebrow>
        <h2 className="font-display text-4xl sm:text-6xl">There are five little things<br />waiting for you.</h2>
        <p className="mt-4 text-sm text-muted-foreground">Tap each balloon to set it free.</p>
      </div>
      <div className="balloon-field mx-auto mt-8 max-w-5xl">
        {balloonNotes.map((note, index) => (
          <div key={note} className={`balloon-slot balloon-slot-${index + 1}`}>
            <AnimatePresence mode="wait">
              {!popped.includes(index) ? (
                <motion.button
                  key="balloon"
                  type="button"
                  aria-label={`Open balloon ${index + 1}`}
                  className={`balloon balloon-${(index % 3) + 1}`}
                  animate={{ y: [0, -9, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 3.6 + index * 0.25, repeat: Infinity }}
                  onClick={() => setPopped((items) => [...items, index])}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </motion.button>
              ) : (
                <motion.div key="note" initial={{ opacity: 0, scale: 0.7, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: index % 2 ? 2 : -2 }} className="balloon-note">
                  <Sparkles className="mx-auto mb-2 size-4 text-gold" />{note}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {complete && <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mt-8 text-center">
          <p className="font-display text-2xl">Okay… now we're getting started.</p>
          <Button className="mt-5" variant="story" size="story" onClick={next}>Make a wish <ChevronRight /></Button>
        </motion.div>}
      </AnimatePresence>
    </Scene>
  );
}

function CakeScene({ next }: SceneProps) {
  const [out, setOut] = useState(false);
  const [holding, setHolding] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const extinguish = () => setOut(true);
  const startHold = () => { setHolding(true); timer.current = setTimeout(extinguish, 900); };
  const stopHold = () => { setHolding(false); if (timer.current) clearTimeout(timer.current); };
  const tryMic = async () => {
    try {
      const stream = await navigator.mediaDevices?.getUserMedia({ audio: true });
      stream?.getTracks().forEach((track) => track.stop());
      extinguish();
    } catch { /* The visible fallback remains available. */ }
  };
  return (
    <Scene dark className={out ? "wish-complete" : ""}>
      <div className="text-center">
        <Eyebrow>Chapter 02 · Make a wish</Eyebrow>
        <h2 className="font-display text-4xl sm:text-6xl">Before you continue…</h2>
        <p className="mt-3 font-script text-3xl text-rose">Make a wish.</p>
      </div>
      <div className="cake-wrap" aria-label="A birthday cake with one candle">
        <div className="candle"><span className={`flame ${out ? "flame-out" : ""}`} /></div>
        <div className="cake-top" />
        <div className="cake-body"><span /><span /><span /></div>
        <div className="cake-plate" />
      </div>
      <AnimatePresence mode="wait">
        {!out ? <motion.div key="controls" exit={{ opacity: 0 }} className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="quiet" size="story" onPointerDown={startHold} onPointerUp={stopHold} onPointerLeave={stopHold}>{holding ? "Keep holding…" : "Press & hold"}</Button>
          <Button variant="quiet" size="story" onClick={tryMic}><Mic /> Try blowing</Button>
          <Button variant="story" size="story" onClick={extinguish}>Blow it out <Sparkles /></Button>
        </motion.div> : <motion.div key="wish" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1.2 }} className="mt-8 text-center">
          <p className="font-display text-3xl text-gold sm:text-5xl">Some wishes are meant to come true.</p>
          <Button className="mt-8" variant="quiet" size="story" onClick={next}>Continue <ArrowRight /></Button>
        </motion.div>}
      </AnimatePresence>
    </Scene>
  );
}

function BouquetScene({ next }: SceneProps) {
  const [revealed, setRevealed] = useState(false);
  return (
    <Scene className="bouquet-scene">
      <div className="bouquet-copy">
        <Eyebrow>Chapter 03 · The flowers</Eyebrow>
        <h2 className="font-display text-5xl leading-tight sm:text-7xl">A little something<br /><em>for you…</em></h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">Not because flowers last forever. Because the feeling behind them can.</p>
        <Button className="mt-7" variant="story" size="story" onClick={() => setRevealed(true)}>Untie the ribbon <Heart /></Button>
      </div>
      <div className="bouquet-wrap" aria-label="An illustrated bouquet of roses">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2, type: "spring" }} className="bouquet">
          {[...Array(11)].map((_, index) => <span key={index} className={`rose rose-${index + 1}`}><i /></span>)}
          <span className="stem stem-a" /><span className="stem stem-b" /><span className="stem stem-c" />
          <span className="bouquet-paper" /><span className="ribbon" />
        </motion.div>
        <AnimatePresence>
          {revealed && bouquetNotes.map((note, index) => <motion.span key={note} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1, rotate: index % 2 ? 2 : -2 }} transition={{ delay: index * 0.16 }} className={`flower-note flower-note-${index + 1}`}>{note}</motion.span>)}
        </AnimatePresence>
      </div>
      {revealed && <Button className="bouquet-next" variant="paper" size="story" onClick={next}>There's more… <ArrowRight /></Button>}
    </Scene>
  );
}

function HeartLetterScene({ next }: SceneProps) {
  const [open, setOpen] = useState(false);
  return (
    <Scene className="letter-scene">
      <div className="text-center">
        <Eyebrow>Chapter 04</Eyebrow>
        <h2 className="font-display text-4xl sm:text-6xl">A message from my heart</h2>
        {!open && <p className="mt-3 text-sm text-muted-foreground">Tap the seal to open</p>}
      </div>
      <div className={`envelope-stage ${open ? "is-open" : ""}`}>
        <div className="letter-paper">
          <p className="font-script text-2xl text-primary">Dear Subba,</p>
          {heartLetter.map((line, index) => <motion.p key={line} initial={{ opacity: 0, y: 8 }} animate={open ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 + index * 0.5 }}>{line}</motion.p>)}
          <motion.p initial={{ opacity: 0 }} animate={open ? { opacity: 1 } : {}} transition={{ delay: 3 }} className="font-script text-xl">Always in your corner.</motion.p>
        </div>
        <div className="envelope-back" />
        <div className="envelope-front" />
        <div className="envelope-flap" />
        {!open && <Button size="icon" aria-label="Open the letter" className="envelope-seal rounded-full" onClick={() => setOpen(true)}><Heart /></Button>}
      </div>
      {open && <Button className="mt-8" variant="story" size="story" onClick={next}>Turn the page <BookOpen /></Button>}
    </Scene>
  );
}

function MemoryTimeline({ next, openMemory }: SceneProps) {
  return (
    <Scene className="timeline-scene">
      <div className="timeline-heading">
        <Eyebrow>Chapter 05 · Our memory timeline</Eyebrow>
        <h2 className="font-display text-5xl sm:text-7xl">The days that<br />became <em>ours.</em></h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">These are sample moments. Replace the photographs and words with your own—the rhythm of the story will remain.</p>
      </div>
      <div className="timeline-list">
        {memories.map((memory, index) => <motion.article key={memory.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-15%" }} className={`memory-preview layout-${memory.layout}`}>
          <button type="button" className="memory-image-button" onClick={() => openMemory(index)} aria-label={`Open memory: ${memory.title}`}>
            <img src={memory.image} alt="Sample memory—replace with your photograph" loading="lazy" decoding="async" width={1408} height={1024} style={{ objectPosition: memory.position }} />
            <span className="photo-index">{String(index + 1).padStart(2, "0")}</span>
          </button>
          <div className="memory-preview-copy">
            <p className="memory-meta">{memory.date} · {memory.place}</p>
            <h3>{memory.title}</h3>
            <p>{memory.caption}</p>
            <Button variant="link" onClick={() => openMemory(index)}>Remember this day? <ArrowRight /></Button>
          </div>
        </motion.article>)}
      </div>
      <div className="pb-24 text-center"><Button variant="story" size="story" onClick={next}>The little things <ArrowRight /></Button></div>
    </Scene>
  );
}

function LittleThingsScene({ next }: SceneProps) {
  const [open, setOpen] = useState<number | null>(null);
  return <Scene className="little-things-scene">
    <div className="max-w-xl">
      <Eyebrow>Chapter 06 · Little things about you</Eyebrow>
      <h2 className="font-display text-5xl sm:text-7xl">Things you may<br />not realize.</h2>
      <p className="mt-5 text-sm text-muted-foreground">Choose a note. Keep the one you need today.</p>
    </div>
    <div className="notes-grid">
      {littleThings.map((item, index) => <motion.button type="button" key={item.title} initial={{ opacity: 0, y: 25, rotate: index % 2 ? 2 : -2 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.13 }} onClick={() => setOpen(open === index ? null : index)} className={`personal-note ${open === index ? "is-open" : ""}`}>
        <span className="note-number">0{index + 1}</span>
        <strong>{item.title}</strong>
        <span>{open === index ? item.message : "Tap to unfold"}</span>
      </motion.button>)}
    </div>
    <Button variant="story" size="story" onClick={next}>See our photo wall <ArrowRight /></Button>
  </Scene>;
}

function PhotoWall({ next, openMemory }: SceneProps) {
  const wall = [...memories, ...memories, ...memories, ...memories].slice(0, 20);
  return <Scene className="photo-wall-scene">
    <div className="wall-heading"><Eyebrow>Chapter 07 · Photo wall</Eyebrow><h2 className="font-display text-5xl sm:text-7xl">Proof that we<br /><em>were here.</em></h2></div>
    <div className="photo-wall">
      {wall.map((memory, index) => <motion.button type="button" whileHover={{ y: -5, rotate: 0 }} key={`${memory.id}-${index}`} onClick={() => openMemory(index % memories.length)} className={`wall-photo wall-photo-${(index % 7) + 1}`} aria-label={`View ${memory.title}`}>
        <span className="tape" /><img src={memory.image} alt="Sample memory" loading="lazy" decoding="async" width={400} height={400} />
        {index % 4 === 0 && <small>{memory.caption}</small>}
      </motion.button>)}
    </div>
    <div className="pb-20 text-center"><Button variant="story" size="story" onClick={next}>Enter our little universe <Sparkles /></Button></div>
  </Scene>;
}

function UniverseScene({ next, openMemory }: SceneProps) {
  return <Scene dark className="universe-scene">
    <div className="universe-copy"><Eyebrow>Chapter 08</Eyebrow><h2 className="font-display text-5xl sm:text-7xl">Our little universe.</h2><p className="mt-4 text-sm text-night-muted">Every light is a moment that still shines.</p></div>
    <div className="constellation" aria-label="A constellation of memories">
      <svg aria-hidden="true" viewBox="0 0 1000 600" preserveAspectRatio="none"><path d="M150 370 L310 160 L490 330 L685 120 L830 360" /></svg>
      {memories.map((memory, index) => <button type="button" key={memory.id} className={`memory-star star-${index + 1}`} onClick={() => openMemory(index)} aria-label={`Open star memory: ${memory.title}`}><span /><small>{memory.date}</small></button>)}
    </div>
    <Button variant="quiet" size="story" onClick={next}>One last thing <ArrowRight /></Button>
  </Scene>;
}

function GiftScene({ next }: SceneProps) {
  const [open, setOpen] = useState(false);
  return <Scene dark className="gift-scene">
    <div className="text-center"><Eyebrow>Chapter 09</Eyebrow><motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} className="font-display text-5xl sm:text-7xl">One last thing…</motion.h2><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-4 text-night-muted">I saved this one for the end.</motion.p></div>
    <button type="button" className={`gift-box ${open ? "is-open" : ""}`} onClick={() => setOpen(true)} aria-label="Open the gift">
      <span className="gift-lid" /><span className="gift-bow">✦</span><span className="gift-base"><Gift /></span>
    </button>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="gift-message"><p className="font-script text-2xl text-rose">The real gift?</p><h3 className="mt-2 font-display text-3xl sm:text-5xl">Getting to call you my brother.</h3><Button className="mt-7" variant="quiet" size="story" onClick={next}>Read the last page <ArrowRight /></Button></motion.div>}</AnimatePresence>
  </Scene>;
}

function FinaleScene({ replay, memories: goMemories }: SceneProps & { replay: () => void; memories: () => void }) {
  const [showPhoto, setShowPhoto] = useState(false);
  return <Scene className="finale-scene">
    {!showPhoto ? <div className="final-letter">
      {finalLetter.map((line, index) => index === 0 ? <motion.h2 key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-display text-5xl sm:text-7xl">{line}</motion.h2> : <motion.p key={line} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.55 }} className={index >= finalLetter.length - 2 ? "font-script finale-signoff" : ""}>{line}</motion.p>)}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.8 }}><Button variant="story" size="story" onClick={() => setShowPhoto(true)}>One final memory <Heart /></Button></motion.div>
    </div> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="final-memory">
      <div className="final-photo"><motion.img initial={{ scale: 1 }} animate={{ scale: 1.08 }} transition={{ duration: 12, ease: "linear" }} src="/images/final/final-memory.jpg" alt="A symbolic final memory of friendship" width={1200} height={1200} /></div>
      <div className="final-overlay"><p className="font-display text-3xl sm:text-5xl">Some people become memories.<br />Some people become <em>home.</em></p><p className="mt-5 font-script text-3xl text-rose">Happy Birthday ♥</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button variant="quiet" size="story" onClick={replay}><RotateCcw /> Replay</Button><Button variant="quiet" size="story" onClick={goMemories}><BookOpen /> Open memories</Button></div></div>
    </motion.div>}
  </Scene>;
}

function ChapterIndicator({ chapter, unlocked, goTo }: { chapter: number; unlocked: number; goTo: (index: number) => void }) {
  return <nav aria-label="Birthday chapters" className="chapter-indicator">
    {chapters.slice(1).map((label, index) => { const target = index + 1; return <Button key={`${label}-${target}`} variant="ghost" size="icon" disabled={target > unlocked} onClick={() => goTo(target)} aria-label={`${String(target).padStart(2, "0")} ${label}`} className={target === chapter ? "is-active" : ""}><span>{String(target).padStart(2, "0")}</span><small>{label}</small></Button>; })}
  </nav>;
}

function MusicControl() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const element = new Audio(experience.music); element.loop = true; element.volume = 0.32; audio.current = element;
    element.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    const tick = () => setProgress(element.duration ? element.currentTime / element.duration : 0);
    element.addEventListener("timeupdate", tick);
    return () => { element.pause(); element.removeEventListener("timeupdate", tick); };
  }, []);
  const toggle = () => { if (!audio.current) return; if (playing) audio.current.pause(); else audio.current.play().catch(() => {}); setPlaying(!playing); };
  const mute = () => { if (!audio.current) return; audio.current.muted = !muted; setMuted(!muted); };
  return <div className="music-control"><Music2 className="size-3.5" /><span className="music-progress"><i style={{ transform: `scaleX(${progress})` }} /></span><Button variant="ghost" size="icon" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>{playing ? <Pause /> : <Play />}</Button><Button variant="ghost" size="icon" onClick={mute} aria-label={muted ? "Unmute music" : "Mute music"}>{muted ? <VolumeX /> : <Volume2 />}</Button></div>;
}

function MemoryViewer({ index, setIndex, close }: { index: number; setIndex: (index: number) => void; close: () => void }) {
  const memory = memories[index];
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowRight") setIndex((index + 1) % memories.length); if (event.key === "ArrowLeft") setIndex((index - 1 + memories.length) % memories.length); };
    window.addEventListener("keydown", keydown); return () => window.removeEventListener("keydown", keydown);
  }, [close, index, setIndex]);
  if (!memory) return null;
  return <motion.div role="dialog" aria-modal="true" aria-label={memory.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="memory-viewer">
    <Button variant="quiet" size="icon" className="memory-close" onClick={close} aria-label="Close memory"><X /></Button>
    <motion.div key={memory.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="viewer-photo"><img src={memory.image} alt="Sample memory—replace with your photograph" width={1408} height={1024} style={{ objectPosition: memory.position }} /></motion.div>
    <motion.div key={`copy-${memory.id}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="viewer-copy"><p className="memory-meta"><MapPin /> {memory.date} · {memory.place}</p><h2>{memory.title}</h2><p className="viewer-caption">“{memory.caption}”</p><p className="viewer-story">{memory.story}</p></motion.div>
    <div className="viewer-nav"><Button variant="quiet" size="story" onClick={() => setIndex((index - 1 + memories.length) % memories.length)}><ArrowLeft /> Previous</Button><span>{index + 1} / {memories.length}</span><Button variant="quiet" size="story" onClick={() => setIndex((index + 1) % memories.length)}>Next <ArrowRight /></Button></div>
  </motion.div>;
}