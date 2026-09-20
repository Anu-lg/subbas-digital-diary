export type MemoryLayout = "hero" | "polaroid" | "film" | "spread" | "scrapbook";

export type Memory = {
  id: number;
  image: string;
  date: string;
  place: string;
  title: string;
  caption: string;
  story: string;
  layout: MemoryLayout;
  wall?: boolean;
  universe?: boolean;
  position?: string;
};

export const memories: Memory[] = [
  {
    id: 1,
    image: "/images/memories/IMG-20250809-WA0111.jpg",
    date: "2023",
    place: "By the lake",
    title: "Where it all started",
    caption: "Some moments become home before we notice.",
    story:
      "Just the two of us, the water, and a sunset we did not need to explain. Some beginnings are quiet enough to stay with you.",
    layout: "hero",
    wall: true,
    universe: true,
  },
  {
    id: 2,
    image: "/images/memories/IMG-20251213-WA0326.jpg",
    date: "2023",
    place: "An afternoon café",
    title: "The conversations that stayed",
    caption: "A cup of tea, an ordinary evening, and a core memory.",
    story:
      "The best conversations never needed a plan. They only needed time, two chairs, and the kind of honesty that makes an ordinary evening feel rare.",
    layout: "spread",
    wall: true,
    universe: true,
  },
  {
    id: 3,
    image: "/images/memories/IMG-20251225-WA0030.jpg",
    date: "2024",
    place: "A rainy city evening",
    title: "Same side of the storm",
    caption: "Even the rain felt warmer with you there.",
    story:
      "Not every season was easy. But there was comfort in knowing neither of us had to cross the difficult ones alone. Remember this day? Because I still do.",
    layout: "polaroid",
    wall: true,
    universe: true,
    position: "center 58%",
  },
  {
    id: 4,
    image: "/images/memories/IMG-20260311-WA0399.jpg",
    date: "2025",
    place: "Somewhere on the road",
    title: "No map, no hurry",
    caption: "The long way became the part we remember most.",
    story:
      "We have a talent for turning unfinished plans into unforgettable stories. I hope life gives us many more roads with no reason to rush home.",
    layout: "film",
    wall: true,
    universe: true,
  },
  {
    id: 5,
    image: "/images/memories/IMG-20260514-WA0080.jpg",
    date: "2026",
    place: "Under the city lights",
    title: "The quiet kind of happy",
    caption: "A small celebration, held close.",
    story:
      "No grand event, no perfect photograph—just the rare peace of being completely yourself beside someone who understands. That is a kind of home.",
    layout: "scrapbook",
    wall: true,
    universe: true,
  },
  {
    id: 6,
    image: "/images/memories/IMG_4324.JPG",
    date: "2024",
    place: "A day together",
    title: "The easy kind of joy",
    caption: "The best memories are often the unplanned ones.",
    story: "A simple day, a familiar smile, and another memory worth keeping close.",
    layout: "polaroid",
    wall: true,
    universe: true,
  },
  {
    id: 7,
    image: "/images/memories/IMG_7608.JPG",
    date: "2025",
    place: "A favorite afternoon",
    title: "Still choosing the same side",
    caption: "Wherever we are, it feels better together.",
    story: "Some photographs hold more than a moment. They hold the feeling of being understood.",
    layout: "film",
    wall: true,
    universe: true,
  },
  {
    id: 8,
    image: "/images/memories/IMG_7640.JPG",
    date: "2026",
    place: "A memory worth saving",
    title: "The people who feel like home",
    caption: "This is the kind of moment I want to remember.",
    story: "One more page in a story made from ordinary days and extraordinary love.",
    layout: "scrapbook",
    wall: true,
    universe: true,
  },
];
