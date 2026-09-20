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

// Replace these sample entries with your real memories. Components never need editing.
export const memories: Memory[] = [
  {
    id: 1,
    image: "/images/memories/memory-01.jpg",
    date: "2023",
    place: "The beginning",
    title: "Where it all started",
    caption: "Some moments don't look important when they happen…",
    story:
      "And then, much later, you realize they quietly changed everything. This is sample copy—replace it with the real story of the day you first knew this bond was different.",
    layout: "hero",
    wall: true,
    universe: true,
  },
  {
    id: 2,
    image: "/images/memories/memory-02.jpg",
    date: "2023",
    place: "Bengaluru",
    title: "The conversations that stayed",
    caption: "A cup of tea, an ordinary evening, and somehow a core memory.",
    story:
      "The best conversations never needed a plan. They only needed time, two chairs, and the kind of honesty that makes an ordinary evening feel rare.",
    layout: "spread",
    wall: true,
    universe: true,
  },
  {
    id: 3,
    image: "/images/memories/memory-03.jpg",
    date: "2024",
    place: "A rainy night",
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
    image: "/images/memories/memory-04.jpg",
    date: "2025",
    place: "Somewhere on the road",
    title: "No map, no hurry",
    caption: "The wrong turn became the part we remember most.",
    story:
      "We have a talent for turning unfinished plans into unforgettable stories. I hope life gives us many more roads with no reason to rush home.",
    layout: "film",
    wall: true,
    universe: true,
  },
  {
    id: 5,
    image: "/images/memories/memory-05.jpg",
    date: "2026",
    place: "Under the city lights",
    title: "The quiet kind of happy",
    caption: "Nothing spectacular happened. That was the beautiful part.",
    story:
      "No grand event, no perfect photograph—just the rare peace of being completely yourself beside someone who understands. That is a kind of home.",
    layout: "scrapbook",
    wall: true,
    universe: true,
  },
];