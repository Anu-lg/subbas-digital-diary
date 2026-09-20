# Personalizing Subba's birthday experience

Everything is local and works without an internet connection.

## Replace photographs

1. Add compressed JPG or WebP files to `public/images/memories/`.
2. Open `src/data/memories.ts` and add an entry with its local path, date, place, title, caption, story, and layout.
3. Set `wall` or `universe` to control where the memory appears.

Recommended: 1600–2200px on the longest edge, under 500KB per photo. Keep a smaller thumbnail version if your collection grows beyond 50 photos.

## Replace messages

Edit `src/data/messages.ts`. Balloon notes, bouquet notes, both letters, and the little-things cards are all kept there.

## Add local sound

Place files at:

- `public/audio/background-music.mp3`
- `public/audio/balloon-pop.mp3`
- `public/audio/candle.mp3`
- `public/audio/envelope.mp3`
- `public/audio/photo-click.mp3`
- `public/audio/gift.mp3`

Missing audio is ignored and never blocks the experience. Music only starts after the opening button is pressed.
