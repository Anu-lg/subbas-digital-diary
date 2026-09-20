# Subba — Interactive Birthday Memory Book

## Experience Architecture

A single immersive experience at `/`, presented as ten controlled chapters rather than a scrolling website. The opening unlocks music and begins the journey; each chapter has one clear interaction and one emotional beat. A subtle chapter rail enables revisiting unlocked chapters without feeling like navigation.

```text
00 Opening
   21 • 09 → timed message reveal → Open your surprise
        ↓
01 First Surprise
   Tap five floating balloons → confetti + tiny notes → completion reveal
        ↓
02 Make a Wish
   Candle flame → click/hold or optional microphone → darkness → glowing line
        ↓
03 Flowers
   Bouquet assembles → personal notes appear → “There’s more…”
        ↓
04 Heart Letter
   Sealed envelope → open → letter rises → paragraphs reveal while reading
        ↓
05 Memory Timeline
   Chronological editorial chapters → select memory → cinematic detail viewer
        ↓
06 Little Things
   Small note cards appear sequentially → tap to reveal personal messages
        ↓
07 Photo Wall
   Curated scrapbook wall → select photo → shared cinematic viewer
        ↓
08 Our Little Universe
   Lightweight constellation of memories → select star → focused memory
        ↓
09 One Last Thing
   Slowed pacing → gift interaction → meaningful final reveal
        ↓
10 Final Letter & Memory
   Line-by-line message → final photo slow zoom → replay / open memories
```

## Interaction and Transition Rules

- Chapters occupy the viewport and transition through restrained fade, blur, depth, and paper-like movement.
- The experience advances only after the chapter’s emotional interaction completes; unlocked chapters remain accessible.
- Desktop uses cinematic framing, lateral editorial compositions, and keyboard-friendly controls.
- Mobile uses vertical compositions, large touch targets, reduced particles, swipe-friendly memory navigation, and simpler motion.
- Reduced-motion preferences replace parallax, floating, and long reveals with short fades.
- No traditional header, footer, dashboard, or all-in-one scrolling page.

## Visual System

- **Palette:** warm ivory paper, deep wine, dusty rose, antique gold, charcoal-burgundy night.
- **Typography:** one elegant editorial serif, one modern sans-serif, and one restrained handwritten accent. Fonts are bundled locally so the experience remains offline.
- **Texture:** locally generated paper grain, film grain, soft light leaks, tape, shadows, borders, and dust—used sparingly.
- **Direction:** a bound memory book crossing into a short film: structured grids and calm whitespace in reflective moments, playful dimensional staging for balloons, cake, bouquet, and gift.
- **Accessibility:** visible focus, readable contrast, keyboard activation, meaningful labels, optional sound, and no interaction that depends on microphone access.

## Component Hierarchy

```text
BirthdayExperience
├── ExperienceShell
│   ├── ChapterStage
│   ├── ChapterIndicator
│   ├── MusicControl
│   └── AmbientLayer
├── OpeningScene
├── BalloonScene
│   ├── Balloon
│   └── ConfettiBurst
├── CakeScene
│   ├── StylizedCake
│   └── CandleInteraction
├── BouquetScene
│   ├── RoseBouquet
│   └── FloatingNote
├── HeartLetterScene
│   ├── Envelope
│   └── ProgressiveLetter
├── MemoryTimeline
│   ├── YearMarker
│   ├── EditorialMemoryLayout
│   └── MemoryPreview
├── MemoryViewer
│   ├── FocusedMedia
│   ├── MemoryStory
│   └── PreviousNextControls
├── LittleThingsScene
├── PhotoWall
├── UniverseScene
│   ├── ConstellationCanvas
│   └── MemoryStar
├── GiftRevealScene
├── FinalLetterScene
└── FinalMemoryScene
```

Shared primitives include `SceneHeading`, `ChapterContinue`, `IconButton`, `ProgressiveText`, `LocalMedia`, `SoundEffect`, and `FilmOverlay`.

## Editable Content Model

All personal content lives in typed configuration files, separate from visual components:

- `experience.ts`: name, date, opening lines, chapter labels, and final reveal.
- `messages.ts`: balloon notes, bouquet notes, heart letter, little-things cards, final letter.
- `memories.ts`: image/video path, date, place, title, caption, story, layout style, focal position, timeline grouping, wall/universe inclusion, and optional related images.
- `audio.ts`: optional local music and effect paths.

Adding or changing a memory requires editing only the data file and placing media in the matching public folder.

## Offline Asset Structure

```text
public/
├── images/
│   ├── memories/
│   ├── hero/
│   └── final/
├── audio/
├── video/
├── decorations/
└── fonts/
```

- No remote URLs, APIs, database, analytics, or network-required resources.
- Decorative imagery will be created locally; sample memory images will be clearly marked and replaceable.
- Missing optional sound/media fails quietly and never blocks progress.
- A short local README will explain exact filenames, content editing, recommended image sizes, and compression.

## Memory System

- Timeline groups entries chronologically and rotates through a controlled set of layouts: hero, Polaroid, film strip, scrapbook, paired spread, three-photo collage, and full-bleed.
- Layout selection is explicit in each memory object, keeping compositions intentional rather than random.
- All memory entry points use one accessible full-screen viewer with darkened surroundings, progressive metadata/story reveal, previous/next controls, keyboard arrows, Escape close, and mobile swipe.
- The initial sample set demonstrates every layout; the structure scales to 100+ entries.

## Audio and Candle Behavior

- The first “Open your surprise” interaction may start the local background track; browsers are never asked to autoplay.
- The music control provides play/pause, mute, and progress with compact labels/tooltips.
- Candle supports tap, a short press-and-hold, and an optional microphone attempt. Permission denial or unavailable browser support leaves the “Blow it out” action fully functional.
- Sound effects are independently optional and guarded against missing files.

## Performance Strategy

- Only the opening and current chapter are mounted eagerly; neighboring chapters may be prepared for smooth transitions.
- Images use lazy decoding/loading, responsive dimensions, stable aspect ratios, and thumbnail/full-size separation where configured.
- The timeline and wall progressively reveal content rather than decoding 50–100 full-size files at once.
- Particle counts scale down on mobile and reduced-motion devices.
- Animation uses transforms and opacity, avoids layout-heavy loops, and pauses ambient movement outside the active chapter.

## Implementation Sequence

1. Establish the semantic visual system, local fonts, asset folders, and typed content configuration.
2. Build the experience controller, chapter stage, indicator, audio manager, transitions, and accessibility behavior.
3. Build opening, balloons, cake, bouquet, and envelope/letter scenes.
4. Build the timeline, editorial layouts, shared memory viewer, photo wall, and constellation experience.
5. Build little-things, gift, final letter, final memory, replay, and open-memories flows.
6. Add local decorative assets and realistic editable sample content without pretending they are Subba’s real memories.
7. Verify desktop and mobile journeys, keyboard/touch controls, missing-media behavior, reduced motion, and offline operation.
