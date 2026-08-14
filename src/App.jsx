import { useEffect, useRef, useState, useCallback } from "react";

/* ============================================================
   CONTACT + BOOKING DATA — edit here, updates everywhere.
   ============================================================ */

const PHONE_1 = "917018019755";
const PHONE_2 = "919418650051";
const PHONE_1_PRETTY = "+91 70180 19755";
const PHONE_2_PRETTY = "+91 94186 50051";

const MAPS = "https://maps.app.goo.gl/CpXiL4vA5LcFfBHk7";
const REVIEW = "https://g.page/r/CeY6IkCJnyMLEAI/review";
const BOOKING_COM = "https://www.booking.com/hotel/in/white-magnolia.en-gb.html";
const INSTAGRAM = "https://instagram.com/thewhiteemagnolia";

const wa = (msg) => `https://wa.me/${PHONE_1}?text=${encodeURIComponent(msg)}`;

const ROOMS = [
  {
    id: "lux-shimla",
    num: "01",
    eyebrow: "Top floor · the one with the sunrise",
    name: "Luxury 2BHK — Shimla View",
    short: "2BHK Shimla View",
    meta: "2 bedrooms · both baths attached · sleeps 4–6",
    img: "/img/room-shimla.jpg",
    alt: "Wooden windows opening onto pine forest and the Shimla hills",
    copy: "Two bedrooms, two attached baths, and windows that open straight into the hills. The light comes in early here, and in three years nobody has once complained about it. This is the room people photograph before they have unpacked.",
    airbnb: "https://www.airbnb.co.in/h/luxury-2bhk-s-thewhitemagnolia-kasauli",
  },
  {
    id: "lux-chd",
    num: "02",
    eyebrow: "Top floor · friends-trip approved",
    name: "Luxury 2BHK — Chandigarh View",
    short: "2BHK Chandigarh View",
    meta: "2 bedrooms · bunk beds · common washroom · sleeps 4–6",
    img: "/img/room-chd.jpg",
    alt: "Warm wood-panelled bedroom on the Chandigarh-facing side",
    copy: "Bunk beds, the plains stretched out below, and city lights flickering on after dark. This is the room where the conversation runs long past the plan, and the veranda outside has heard most of it.",
    airbnb: "https://www.airbnb.co.in/h/luxury-2bhk-c-thewhitemagnolia-kasauli",
  },
  {
    id: "deluxe-3bhk",
    num: "03",
    eyebrow: "Ground floor · bring everyone",
    name: "Deluxe 3BHK",
    short: "3BHK Ground Floor",
    meta: "3 bedrooms · garden access · sleeps 6–8",
    img: "/img/room-3bhk.jpg",
    alt: "Traditional bedroom with warm wood furnishings in the 3BHK",
    copy: "Our largest ground-floor home, opening straight onto the garden. Made for the trips where someone always ends up cooking, someone always ends up napping, and everyone has quietly agreed this is fine.",
    airbnb: "https://www.airbnb.co.in/h/3bhk-thewhitemagnolia-kasauli",
  },
  {
    id: "deluxe-2bhk",
    num: "04",
    eyebrow: "Ground floor · sleeps a small crew",
    name: "Deluxe 2BHK",
    short: "2BHK Ground Floor",
    meta: "2 bedrooms · garden side · sleeps 4–5",
    img: "/img/room-2bhk-gf.jpg",
    alt: "Deluxe 2BHK bedroom in warm wood and forest green",
    copy: "Warm wood, forest green, and a bed that makes a persuasive case for five more minutes. Steps from the garden, and closer still to the bonfire — you will smell the woodsmoke before you see it.",
    airbnb: "https://www.airbnb.co.in/h/2bhk-thewhitemagnolia-kasauli",
  },
  {
    id: "single",
    num: "05",
    eyebrow: "Ground floor · solo travellers, this is you",
    name: "The Spacious Single",
    short: "Single Room",
    meta: "1 bedroom · beside the kitchen · sleeps 2",
    img: "/img/room-single.jpg",
    alt: "Rustic single bedroom with soft natural light",
    copy: "Quiet, generous, and suspiciously close to the kitchen — which we have always considered a feature, not a flaw. Come alone; you will not be left alone unless you would rather be.",
    airbnb: "https://www.airbnb.co.in/h/luxury-bedroom-whitemagnolia-kasauli",
  },
];

const PLACES = [
  { d: "A 10-minute walk", t: "Gilbert Trail", p: "A narrow path through pine and oak, best walked slowly with a flask. Birdsong the whole way, and almost nobody else on it." },
  { d: "Short drive", t: "Sunset Point", p: "Once called Hawa Ghar. The hills go orange, everyone goes quiet, and then everyone reaches for their phone at the same moment." },
  { d: "Short drive", t: "Monkey Point", p: "Kasauli's highest point, with a Hanuman temple at the top and the plains laid out below. Leave your snacks in the car — and mind the monkeys." },
  { d: "In town", t: "Christ Church", p: "Built in 1853, all gothic arches and stained glass, with old chestnut trees leaning over the churchyard." },
  { d: "In town", t: "The Mall Road", p: "Cobbles, colonial-era shopfronts, woollens, and small cafés. The kind of walk where you buy something you did not plan to." },
  { d: "Nearby", t: "Kasauli Brewery", p: "One of India's oldest distilleries, running since the 1820s. Worth the detour for the history alone." },
];

const NOTES = [
  ["Dogs, cats, good boys", "free, always"],
  ["Your own bottle", "bring it, we will find glasses"],
  ["Bonfire", "lit on request, stories extra"],
  ["Meals", "home-cooked, from our kitchen"],
  ["Wi-Fi", "everywhere, even the garden"],
  ["Parking", "six cars, easy"],
  ["Check-in / check-out", "1:00 pm / 11:00 am"],
];

/* ============================================================ */
const Ico = {
  calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...p}><path d="M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></svg>),
  chat: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.8-.8L3 21l1.9-4.9A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4Z" /></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>),
};

const Spark = ({ c = "#B16945" }) => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 0L8.6 5.4L14 7L8.6 8.6L7 14L5.4 8.6L0 7L5.4 5.4L7 0Z" fill={c} />
  </svg>
);
const ArchRule = ({ light }) => (
  <div className="arch-rule" aria-hidden="true">
    <i /><Spark c={light ? "#C58563" : "#B16945"} /><i />
  </div>
);

/* ============================================================
   HOOKS
   ============================================================ */

/** Scroll reveal. CSS hides .reveal only when <html> has .js,
    so content is never invisible if this hook fails to run. */
function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // safety: anything still hidden after 2.5s becomes visible
    const t = setTimeout(() => els.forEach((el) => el.classList.add("in")), 2500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
}

/** Parallax on every .plx > img. Images are pre-scaled 1.16 in CSS,
    so they can drift without exposing edges. */
function useParallax() {
  const ticking = useRef(false);
  const run = useCallback(() => {
    const vh = window.innerHeight;
    document.querySelectorAll(".plx").forEach((box) => {
      const img = box.firstElementChild;
      if (!img) return;
      const r = box.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;   // -0.5 … 0.5-ish
      const range = r.height * 0.12;
      img.style.transform = `translate3d(0, ${(p * -range).toFixed(1)}px, 0)`;
    });
    ticking.current = false;
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 760px)").matches;
    if (reduced || narrow) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [run]);
}

/* ============================================================ */

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal();
  useParallax();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setPastHero(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const nav = [
    ["The House", "#story"],
    ["Rooms", "#rooms"],
    ["Book", "#book"],
    ["Around", "#around"],
    ["Finding Us", "#location"],
  ];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <a className="skip" href="#book">Skip to booking</a>

      {/* ---------------- NAV ---------------- */}
      <header className={`nav ${scrolled ? "solid" : "on-dark"}`}>
        <div className="nav__inner">
          <a className="brand" href="#top" aria-label="The White Magnolia, home">
            <span className="brand__m">
              <img src="/img/monogram-light.png" alt="" aria-hidden="true" />
              <img src="/img/monogram.png" alt="" aria-hidden="true" />
            </span>
            <span className="brand__t">
              <b>The White Magnolia</b>
              <span>Boutique Homestay · Kasauli</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.map(([label, href]) => (
              <a key={href} className="nav__link" href={href}>{label}</a>
            ))}
            <a className="btn btn--solid btn--sm" href="#book">Reserve</a>
          </nav>

          <button
            className={`nav__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
          </button>
        </div>
      </header>

      {/* ---------------- MOBILE DRAWER ---------------- */}
      <div className={`drawer ${menuOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        {nav.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <div className="drawer__foot">
          <a href={`tel:+${PHONE_1}`}>{PHONE_1_PRETTY}</a><br />
          Kasauli · Himachal Pradesh
        </div>
      </div>

      <main id="top">
        {/* ---------------- HERO ---------------- */}
        <section className="hero">
          <div className="plx hero__media">
            <img src="/img/hero.jpg" alt="The sunroom veranda at The White Magnolia, looking over the Kasauli valley" fetchPriority="high" width="1800" height="1330" style={{ aspectRatio: "auto", height: "100%" }} />
          </div>
          <div className="hero__scrim" />
          <div className="hero__content">
            <div className="hero__place">Kasauli · Himachal Pradesh · Est. by a family</div>
            <img className="hero__logo" src="/img/logo-light.png" alt="The White Magnolia — boutique homestay" width="1000" height="379" />
            <p className="hero__tag">A house in the pines that is in no particular hurry.</p>
            <div className="hero__cta">
              <a className="btn btn--solid" href="#book">Reserve a Room</a>
              <a className="btn btn--ghost-lt" href={wa("Hello! I would like to check availability at The White Magnolia, Kasauli.")} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </div>
          </div>
          <div className="hero__scroll" aria-hidden="true"><span>Scroll</span><i /></div>
        </section>

        {/* ---------------- QUICK ACTIONS ---------------- */}
        <section className="quickbar" aria-label="Quick actions">
          <div className="quickbar__grid">
            <a className="quickbar__item" href="#book">
              <Ico.calendar /><span className="quickbar__label">Reserve</span>
              <span className="quickbar__sub">five rooms, or the whole house</span>
            </a>
            <a className="quickbar__item" href={wa("Hello! I have a question about staying at The White Magnolia.")} target="_blank" rel="noopener noreferrer">
              <Ico.chat /><span className="quickbar__label">Ask Us Anything</span>
              <span className="quickbar__sub">we reply quickly, and personally</span>
            </a>
            <a className="quickbar__item" href={MAPS} target="_blank" rel="noopener noreferrer">
              <Ico.pin /><span className="quickbar__label">Get Directions</span>
              <span className="quickbar__sub">open in Google Maps</span>
            </a>
            <a className="quickbar__item" href={`tel:+${PHONE_1}`}>
              <Ico.phone /><span className="quickbar__label">Call the House</span>
              <span className="quickbar__sub">{PHONE_1_PRETTY}</span>
            </a>
          </div>
        </section>

        {/* ---------------- ABOUT / STORY ---------------- */}
        <section className="section" id="story">
          <div className="wrap">
            <div className="story__grid">
              <div className="story__copy reveal">
                <span className="kicker">Our House, Our Family</span>
                <h2 className="h-display sec-title" style={{ margin: "14px 0 26px" }}>
                  Run by a father and son,<br />not a front desk.
                </h2>
                <p className="dropcap">
                  The White Magnolia began the way most good things in the hills do — slowly, and as a
                  family matter. My father and I look after this house ourselves. There is no reception
                  counter, no lanyards, no script. When you arrive, one of us opens the gate.
                </p>
                <p>
                  Between us we hold a simple division of labour: he knows every stone of the property and
                  the name of everyone in the bazaar; I handle the bookings, the playlists, and the argument
                  about whether the bonfire needs more wood. (It always needs more wood.)
                </p>
                <div className="pull">
                  “Atithi Devo Bhava — the guest is God. We grew up with it. We simply never stopped
                  believing it.”
                </div>
                <p>
                  There are five homes across two floors, a garden that earns its keep every winter evening,
                  and a kitchen that cooks what is fresh rather than what is laminated. Dogs stay free.
                  Bottles you bring are your own business — we will find the glasses. Nothing here is
                  designed to impress you in the first ten minutes. It is designed for the third morning,
                  when you have stopped checking the time.
                </p>
                <div className="story__stats">
                  <div className="stat"><b>5</b><span>Private homes</span></div>
                  <div className="stat"><b>10</b><span>Bedrooms in all</span></div>
                  <div className="stat"><b>2</b><span>Hosts, one family</span></div>
                  <div className="stat"><b>6+</b><span>Cars, parked easy</span></div>
                </div>
                <p className="story__sign">— Anirudh &amp; his father, your hosts</p>
              </div>

              <figure className="story__media reveal" style={{ "--d": "140ms" }}>
                <div className="arch-frame">
                  <img src="/img/exterior.jpg" alt="The White Magnolia homestay seen from the garden" loading="lazy" width="1288" height="952" />
                </div>
                <figcaption>The house, from the garden gate.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------- CATALOGUE ---------------- */}
        <section className="section section--warm" id="rooms" style={{ paddingBottom: "clamp(50px,7vw,90px)" }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <ArchRule />
              <span className="kicker">The Catalogue</span>
              <h2 className="h-display sec-title">Five Rooms, Five Moods</h2>
              <p className="lede">
                Read them like a magazine, or skip straight to <a href="#book" style={{ color: "var(--terracotta)" }}>booking</a>.
                Either way, every one of them comes with the garden, the bonfire, and the kitchen.
              </p>
            </div>

            {ROOMS.map((r, i) => (
              <article className={`spread ${i % 2 ? "spread--flip" : ""}`} key={r.id} id={`room-${r.id}`}>
                <div className="spread__media reveal">
                  <div className="num" aria-hidden="true">{r.num}</div>
                  <div className="plx">
                    <img src={r.img} alt={r.alt} loading="lazy" width="1200" height="900" />
                  </div>
                </div>
                <div className="spread__body reveal" style={{ "--d": "120ms" }}>
                  <div className="spread__eyebrow">{r.eyebrow}</div>
                  <h3 className="spread__name">{r.name}</h3>
                  <div className="spread__meta">{r.meta}</div>
                  <p className="spread__copy">{r.copy}</p>
                  <div className="spread__book">
                    <a className="btn btn--solid btn--sm" href={r.airbnb} target="_blank" rel="noopener noreferrer">Airbnb</a>
                    <a className="btn btn--ghost btn--sm" href={BOOKING_COM} target="_blank" rel="noopener noreferrer">Booking.com</a>
                    <a className="btn btn--forest btn--sm" href={wa(`Hello! I would like to check dates and rates for the ${r.name} at The White Magnolia.`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </div>
                </div>
              </article>
            ))}

            <div className="villa reveal">
              <div className="villa__media">
                <img src="/img/living.jpg" alt="Open-plan living space at The White Magnolia" loading="lazy" width="952" height="1288" />
              </div>
              <div className="villa__body">
                <span className="kicker">Nº 06 — For the whole group</span>
                <h3>Or take the entire house.</h3>
                <p>
                  Birthdays, reunions, and the trip your group chat has been planning for two years.
                  Rooms combine into full-floor and full-villa stays — garden, bonfire, kitchen and all.
                </p>
                <div className="villa__configs">
                  <span>5BR Ground</span><span>6BR Ground</span>
                  <span>4BR Top Floor</span><span>10BR Full Villa</span>
                </div>
                <div className="villa__cta">
                  <a className="btn btn--solid" href={wa("Hello! We are a group interested in booking a full floor or the entire villa at The White Magnolia. Could you share package rates and availability?")} target="_blank" rel="noopener noreferrer">Ask About Packages</a>
                  <a className="btn btn--ghost-lt" href={`tel:+${PHONE_1}`}>Call Us</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- RESERVE INDEX ---------------- */}
        <section className="section" id="book">
          <div className="wrap">
            <div className="sec-head reveal">
              <ArchRule />
              <span className="kicker">Reserve</span>
              <h2 className="h-display sec-title">Pick a Room, Pick a Platform</h2>
              <p className="lede">
                Every room, every way to book it — so you know exactly what you are getting.
                Direct on WhatsApp is fastest, and it comes with the family treatment.
              </p>
            </div>

            <div className="reserve">
              {ROOMS.map((r, i) => (
                <div className="unitrow reveal" key={r.id} style={{ "--d": `${i * 60}ms` }}>
                  <div>
                    <div className="unitrow__name">{r.short}</div>
                    <div className="unitrow__meta">{r.meta}</div>
                  </div>
                  <div className="unitrow__btns">
                    <a className="btn btn--solid btn--sm" href={r.airbnb} target="_blank" rel="noopener noreferrer">Airbnb</a>
                    <a className="btn btn--ghost btn--sm" href={BOOKING_COM} target="_blank" rel="noopener noreferrer">Booking.com</a>
                    <a className="btn btn--forest btn--sm" href={wa(`Hello! I would like to book the ${r.short} at The White Magnolia. Could you share dates and rates?`)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </div>
                </div>
              ))}
              <div className="unitrow reveal" style={{ "--d": "320ms" }}>
                <div>
                  <div className="unitrow__name">The Full Villa</div>
                  <div className="unitrow__meta">Up to 10 bedrooms · full floors also available</div>
                </div>
                <div className="unitrow__btns">
                  <a className="btn btn--solid btn--sm" href={wa("Hello! We would like to enquire about booking the full villa or a full floor at The White Magnolia.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  <a className="btn btn--ghost btn--sm" href={`tel:+${PHONE_1}`}>Call</a>
                </div>
              </div>
              <p className="reserve__note">
                Not sure which one fits? Message us your dates and group size — we will tell you honestly.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- PARALLAX QUOTE ---------------- */}
        <section className="quote">
          <div className="plx">
            <img src="/img/sunroom.jpg" alt="Morning light in the sunroom, looking out at the hills" loading="lazy" width="1400" height="1035" />
          </div>
          <div className="quote__scrim" />
          <div className="quote__content reveal">
            <p>The mountains do not ask you to do anything. Neither do we.</p>
            <span>Kasauli, Himachal Pradesh</span>
          </div>
        </section>

        {/* ---------------- HOUSE NOTES ---------------- */}
        <section className="section">
          <div className="wrap">
            <div className="sec-head reveal">
              <ArchRule />
              <span className="kicker">Good to know</span>
              <h2 className="h-display sec-title">House Notes</h2>
            </div>
            <div className="notes">
              {NOTES.map(([k, v], i) => (
                <div className="note reveal" key={k} style={{ "--d": `${i * 50}ms` }}>
                  <b>{k}</b><i aria-hidden="true" /><em>{v}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- GALLERY ---------------- */}
        <section className="section section--warm">
          <div className="wrap">
            <div className="sec-head reveal">
              <ArchRule />
              <span className="kicker">A look around</span>
              <h2 className="h-display sec-title">The House, Quietly</h2>
            </div>
            <div className="gallery">
              <div className="gtile gtile--tall gtile--arch reveal"><img src="/img/nook.jpg" alt="A wood-panelled reading nook" loading="lazy" /></div>
              <div className="gtile gtile--wide reveal" style={{ "--d": "80ms" }}><img src="/img/kitchen.jpg" alt="The café kitchen with trailing greenery" loading="lazy" /></div>
              <div className="gtile gtile--tall reveal" style={{ "--d": "160ms" }}><img src="/img/hallway.jpg" alt="The hallway with magnolia prints and stairs" loading="lazy" /></div>
              <div className="gtile reveal" style={{ "--d": "240ms" }}><img src="/img/lounge.jpg" alt="A rustic lounge corner" loading="lazy" /></div>
              <div className="gtile reveal" style={{ "--d": "300ms" }}><img src="/img/living2.jpg" alt="The living room in the evening" loading="lazy" /></div>
            </div>
          </div>
        </section>

        {/* ---------------- AROUND ---------------- */}
        <section className="section" id="around">
          <div className="wrap">
            <div className="sec-head reveal">
              <ArchRule />
              <span className="kicker">Beyond the gate</span>
              <h2 className="h-display sec-title">Around Kasauli</h2>
              <p className="lede">
                Small town, short distances. Most of this is a walk or a very short drive,
                and we are happy to point you at the quieter versions of all of it.
              </p>
            </div>
            <div className="around">
              {PLACES.map((p, i) => (
                <article className="place reveal" key={p.t} style={{ "--d": `${(i % 3) * 90}ms` }}>
                  <div className="place__dist">{p.d}</div>
                  <h4>{p.t}</h4>
                  <p>{p.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- LOCATION ---------------- */}
        <section className="section section--forest" id="location">
          <div className="wrap">
            <div className="loc__grid">
              <div className="reveal">
                <ArchRule light />
                <span className="kicker">Finding us</span>
                <h2 className="h-display sec-title" style={{ margin: "14px 0 20px" }}>
                  Easier to reach<br />than it looks.
                </h2>
                <p className="lede" style={{ opacity: .9 }}>
                  We are in Kasauli, Himachal Pradesh — an easy climb up from the plains and a world away
                  from them. Send us your starting point and we will send back directions that actually help.
                </p>
                <div className="routes">
                  <div className="route"><b>From Chandigarh</b><span>≈ 60 km · about 2 hours</span></div>
                  <div className="route"><b>Nearest railhead — Kalka</b><span>≈ 40 km</span></div>
                  <div className="route"><b>Nearest airport — Chandigarh</b><span>≈ 65 km</span></div>
                  <div className="route"><b>Parking at the house</b><span>Six cars and more</span></div>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "32px" }}>
                  <a className="btn btn--solid" href={MAPS} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                  <a className="btn btn--ghost-lt" href={wa("Hello! Could you share directions to The White Magnolia? I will be starting from — ")} target="_blank" rel="noopener noreferrer">Ask for Directions</a>
                </div>
              </div>
              <div className="reveal" style={{ "--d": "140ms" }}>
                <div className="arch-frame">
                  <img src="/img/room-shimla.jpg" alt="The view of the hills from a guest room window" loading="lazy" width="1200" height="692" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- FINAL CTA ---------------- */}
        <section className="section">
          <div className="wrap finalcta reveal">
            <ArchRule />
            <span className="kicker">Come stay</span>
            <h2 className="h-display sec-title" style={{ margin: "14px 0 18px" }}>
              So — when are you coming?
            </h2>
            <p className="lede" style={{ maxWidth: "600px", margin: "0 auto 34px" }}>
              Dates, rates, and whether the bonfire is really free. One message and we will sort it out.
            </p>
            <a className="btn btn--solid" href={wa("Hello! I would like to check dates at The White Magnolia, Kasauli.")} target="_blank" rel="noopener noreferrer">Message Us on WhatsApp</a>
            <a className="btn btn--ghost" href={BOOKING_COM} target="_blank" rel="noopener noreferrer">Book on Booking.com</a>
            <a className="btn btn--ghost" href={REVIEW} target="_blank" rel="noopener noreferrer">Read Our Reviews</a>
            <div className="finalcta__num">
              or call <a href={`tel:+${PHONE_1}`}>{PHONE_1_PRETTY}</a> · <a href={`tel:+${PHONE_2}`}>{PHONE_2_PRETTY}</a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="foot">
        <div className="wrap">
          <div className="foot__top">
            <div>
              <img className="foot__logo" src="/img/logo-light.png" alt="The White Magnolia" width="1000" height="379" />
              <p>A boutique homestay in the Kasauli pines.<br />Five homes, one garden, and a kitchen that never quite closes.</p>
              <p className="foot__policy">
                Direct bookings are non-refundable — we hold the house for you, and we hold you to it warmly.
              </p>
            </div>
            <div>
              <h5>Visit</h5>
              <ul className="foot__list">
                <li><a href="#story">Our House</a></li>
                <li><a href="#rooms">The Catalogue</a></li>
                <li><a href="#book">Reserve</a></li>
                <li><a href="#around">Around Kasauli</a></li>
                <li><a href={REVIEW} target="_blank" rel="noopener noreferrer">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h5>Reach Us</h5>
              <ul className="foot__list">
                <li><a href={wa("Hello! I would like to know more about The White Magnolia.")} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href={`tel:+${PHONE_1}`}>{PHONE_1_PRETTY}</a></li>
                <li><a href={`tel:+${PHONE_2}`}>{PHONE_2_PRETTY}</a></li>
                <li><a href={MAPS} target="_blank" rel="noopener noreferrer">Kasauli, Himachal Pradesh</a></li>
                <li><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="foot__bottom">
            <span>© {new Date().getFullYear()} The White Magnolia · Kasauli</span>
            <span>Check-in 1:00 pm · Check-out 11:00 am</span>
          </div>
        </div>
      </footer>

      {/* ---------------- MOBILE ACTION BAR ---------------- */}
      <nav className={`mobar ${pastHero ? "show" : ""}`} aria-label="Quick contact">
        <a href="#book"><Ico.calendar /><span>Reserve</span></a>
        <a href={wa("Hello! I would like to check availability at The White Magnolia.")} target="_blank" rel="noopener noreferrer">
          <Ico.chat /><span>WhatsApp</span>
        </a>
        <a href={MAPS} target="_blank" rel="noopener noreferrer"><Ico.pin /><span>Directions</span></a>
      </nav>
    </>
  );
}
