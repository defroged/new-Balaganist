# Balaganist website

Static website for Balaganist, an instrumental progressive-fusion band from Tokyo.

## Preview locally

The 360° viewer should be tested through a local server rather than by double-clicking `index.html`.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Add an upcoming show

Open `js/site-data.js` and add an object to `upcomingShows`:

```js
{
  id: "venue-name-2026-09-18",
  title: "Balaganist Live",
  start: "2026-09-18T19:00:00+09:00",
  end: "2026-09-18T21:00:00+09:00",
  timezone: "Asia/Tokyo",
  venue: "Venue name",
  city: "Tokyo",
  address: "Full venue address",
  mapUrl: "https://maps.google.com/...",
  ticketUrl: "https://...",
  note: "Doors 18:30"
}
```

Past dates are removed from the page automatically. Each future event gets ticket, map, Google Calendar and `.ics` calendar actions when the corresponding details are present.

## Media

The page uses the optimized files below:

- `img/balaganist-panorama.webp`
- `img/balaganist-logo.webp`
- `img/ep-no-1.webp`
- `img/my-light-poster.webp`
- `videos/my-light-session.mp4`

The old `videos/clip for Twitter 1.mp4` is no longer used and may be deleted after confirming the optimized video works.

## Deployment

No build step is required. Deploy the repository root as a static site.
