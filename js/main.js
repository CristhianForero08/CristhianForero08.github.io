/* ==========================================================
   Cristhian Forero — portfolio
   GSAP 3.13 + ScrollTrigger + SplitText + ScrambleText + Lenis
   ========================================================== */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const hasGsap = typeof window.gsap !== "undefined";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------------- idioma ---------------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin storage */ } }
  };
  let lang = store.get("cf-lang") || ((navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en");

  function t(key) { return (window.I18N[lang] && window.I18N[lang][key]) ?? window.I18N.es[key]; }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { const v = t(el.dataset.i18n); if (typeof v === "string") el.textContent = v; });
    $$("[data-i18n-html]").forEach(el => { const v = t(el.dataset.i18nHtml); if (typeof v === "string") el.innerHTML = v; });
    $$(".lang [data-lang]").forEach(s => s.classList.toggle("is-on", s.dataset.lang === lang));
  }
  applyLang();

  /* ---------------- utilidades sin GSAP ---------------- */
  const clock = $("#clock");
  const fmt = new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit", hour12: false });
  const tick = () => { clock.textContent = fmt.format(new Date()); };
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  const toast = $("#toast");
  let toastT;
  function showToast(msg) {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("is-on"), 2200);
  }
  $("#copyBtn").addEventListener("click", async () => {
    const mail = "cristhianforerobello@gmail.com";
    try { await navigator.clipboard.writeText(mail); showToast(t("contact.copied")); }
    catch (e) { window.location.href = "mailto:" + mail; }
  });

  // Fallback si el CDN de GSAP no carga: el sitio sigue siendo legible.
  if (!hasGsap) {
    $("#loader").remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

  /* ---------------- Lenis (scroll suave) ---------------- */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  $$("[data-scroll]").forEach(a => a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else window.scrollTo({ top: target === 0 ? 0 : target.offsetTop, behavior: reduceMotion ? "auto" : "smooth" });
  }));

  /* ---------------- fondo: grilla de puntos reactiva ---------------- */
  const canvas = $("#gridBg");
  const ctx2d = canvas.getContext("2d");
  const GAP = 34;
  let W = 0, H = 0, dpr = 1;
  const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999 };
  let scrollOff = 0, lastDraw = "";

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    lastDraw = "";
  }
  function drawGrid() {
    mouse.sx += (mouse.x - mouse.sx) * 0.15;
    mouse.sy += (mouse.y - mouse.sy) * 0.15;
    const off = (window.scrollY * 0.15) % GAP;
    const key = `${mouse.sx | 0},${mouse.sy | 0},${off | 0},${W},${H}`;
    if (key === lastDraw) return;
    lastDraw = key;
    ctx2d.clearRect(0, 0, W, H);
    const R = 170;
    for (let x = GAP / 2; x < W; x += GAP) {
      for (let y = GAP / 2 - off; y < H + GAP; y += GAP) {
        const dx = x - mouse.sx, dy = y - mouse.sy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < R) {
          const k = 1 - d / R;
          ctx2d.fillStyle = `rgba(198,255,61,${0.12 + k * 0.7})`;
          ctx2d.fillRect(x - dx * k * 0.18 - 1, y - dy * k * 0.18 - 1, 2 + k * 1.5, 2 + k * 1.5);
        } else {
          ctx2d.fillStyle = "rgba(230,237,243,0.07)";
          ctx2d.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    }
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  gsap.ticker.add(drawGrid);

  /* ---------------- cursor ---------------- */
  if (finePointer) {
    const cursor = $("#cursor"), label = $("#cursorLabel");
    const dot = $(".cursor__dot"), ring = $(".cursor__ring");
    const dx = gsap.quickTo(dot, "x", { duration: 0.05 }), dy = gsap.quickTo(dot, "y", { duration: 0.05 });
    const rx = gsap.quickTo([ring, label], "x", { duration: 0.35, ease: "power3" }), ry = gsap.quickTo([ring, label], "y", { duration: 0.35, ease: "power3" });
    const pad = n => String(Math.round(n)).padStart(4, "0");
    window.addEventListener("mousemove", e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      label.textContent = `x:${pad(e.clientX)} y:${pad(e.clientY + window.scrollY)}`;
    });
    document.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; gsap.to(cursor, { opacity: 0, duration: .2 }); });
    document.addEventListener("mouseenter", () => gsap.to(cursor, { opacity: 1, duration: .2 }));
    document.addEventListener("mouseover", e => { if (e.target.closest("a, button, .card, .row")) cursor.classList.add("is-hover"); });
    document.addEventListener("mouseout", e => { if (e.target.closest("a, button, .card, .row")) cursor.classList.remove("is-hover"); });

    // brillo que sigue al mouse en las tarjetas
    $$(".card").forEach(card => card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));

    // botones magnéticos
    $$(".magnetic").forEach(el => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
    });
  }

  /* ---------------- marquee infinito, acelera con el scroll ---------------- */
  const mq = $("#marquee");
  mq.innerHTML += mq.innerHTML;
  const marqueeTween = gsap.to(mq, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
  if (!reduceMotion) {
    ScrollTrigger.create({
      onUpdate(self) {
        const v = self.getVelocity();
        const boost = gsap.utils.clamp(-6, 6, v / 250);
        gsap.to(marqueeTween, { timeScale: boost >= 0 ? 1 + boost : -1 + boost, duration: 0.2, overwrite: true,
          onComplete: () => gsap.to(marqueeTween, { timeScale: boost >= 0 ? 1 : -1, duration: 1.2 }) });
      }
    });
  } else {
    marqueeTween.pause();
  }

  /* ---------------- rotador de rol (ScrambleText) ---------------- */
  let roleIdx = 0;
  const roleEl = $("#heroRole");
  function rotateRole() {
    const roles = t("hero.roles");
    roleIdx = (roleIdx + 1) % roles.length;
    gsap.to(roleEl, { duration: 1.1, scrambleText: { text: roles[roleIdx], chars: "01<>/#_$%", speed: 0.6 } });
  }

  /* ---------------- KPIs ---------------- */
  function countKpis() {
    $$("#kpis b").forEach((b, i) => {
      const end = +b.dataset.count, suf = b.dataset.suffix || "";
      const o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.6, delay: i * 0.12, ease: "power3.out",
        onUpdate: () => { b.textContent = String(Math.round(o.v)).padStart(2, "0") + suf; } });
    });
  }

  /* ---------------- preloader + intro ---------------- */
  const heroSplit = new SplitText(".hero__line", { type: "chars", charsClass: "char" });

  function intro() {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(heroSplit.chars, { yPercent: 115, rotate: 8, duration: 1.3, stagger: 0.035 })
      .from(".hero__prompt", { opacity: 0, x: -20, duration: .8 }, 0.1)
      .from(".photo-frame", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "expo.inOut" }, 0.1)
      .from(".photo-frame img", { scale: 1.3, duration: 1.8 }, 0.1)
      .from([".hero__role", ".hero__sub", ".hero__meta", ".hero__photo figcaption"], { opacity: 0, y: 24, duration: 1, stagger: 0.08 }, 0.5)
      .from("#kpis li", { opacity: 0, y: 30, duration: 1, stagger: 0.08, onStart: countKpis }, 0.7)
      .from(".nav", { yPercent: -100, opacity: 0, duration: 1 }, 0.4)
      .from(".scroll-hint", { opacity: 0, duration: 1 }, 1.2);
    // línea de escaneo sobre la foto
    gsap.fromTo(".scanline", { top: "0%" }, { top: "100%", duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });
    gsap.delayedCall(2.6, () => { rotateRole(); setInterval(rotateRole, 3000); });
    return tl;
  }

  function runLoader() {
    const log = $("#loaderLog"), bar = $("#loaderBar"), pct = $("#loaderPct");
    const lines = [
      "init cforero.portfolio v2026.11",
      "loading data_models ............ [ OK ]",
      "warming up growth_loops ........ [ OK ]",
      "syncing crm_segments ........... [ OK ]",
      "hardening security_layer ....... [ OK ]",
      "rendering ui ...................."
    ];
    document.body.classList.add("is-loading");
    const tl = gsap.timeline();
    const p = { v: 0 };
    tl.to(p, { v: 100, duration: reduceMotion ? 0.3 : 1.8, ease: "power2.inOut",
      onUpdate() {
        pct.textContent = String(Math.round(p.v)).padStart(3, "0");
        bar.style.width = p.v + "%";
        const n = Math.min(lines.length, Math.floor(p.v / (100 / lines.length)) + 1);
        if (log.childElementCount < n) {
          const el = document.createElement("p");
          el.innerHTML = lines[log.childElementCount].replace("[ OK ]", '<span class="ok">[ OK ]</span>');
          log.appendChild(el);
        }
      } })
      .to("#loader", { yPercent: -100, duration: reduceMotion ? 0.2 : 1, ease: "expo.inOut",
        onStart() { document.body.classList.remove("is-loading"); if (lenis) lenis.start(); intro(); },
        onComplete() { $("#loader").remove(); } }, "+=0.15");
  }

  /* ---------------- animaciones de scroll (reconstruibles al cambiar idioma) ---------------- */
  let mm, splits = [];

  function buildScroll() {
    mm = gsap.matchMedia();
    mm.add({ isDesktop: "(min-width: 900px)", isMobile: "(max-width: 899px)", reduce: "(prefers-reduced-motion: reduce)" }, (c) => {
      const { isDesktop, reduce } = c.conditions;

      // progreso global en la barra del nav
      gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

      // link activo del nav
      $$(".nav__links a").forEach(a => {
        const sec = $(a.getAttribute("href"));
        if (sec) ScrollTrigger.create({ trigger: sec, start: "top 50%", end: "bottom 50%", toggleClass: { targets: a, className: "is-active" } });
      });

      if (reduce) return;

      // hero: parallax al salir
      gsap.to(".hero__name", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__photo", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

      // títulos: revelado por líneas
      $$("[data-split]").forEach(el => {
        const s = new SplitText(el, { type: "lines", linesClass: "line", mask: "lines" });
        splits.push(s);
        gsap.from(s.lines, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" } });
      });
      $$(".section__label, .section__intro, .xp__hint").forEach(el => gsap.from(el, { opacity: 0, y: 20, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }));

      // about: palabras que se "encienden" con el scroll
      const about = new SplitText("#aboutText", { type: "words" });
      splits.push(about);
      gsap.fromTo(about.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: "#aboutText", start: "top 78%", end: "bottom 45%", scrub: true } });
      gsap.from(".chip", { opacity: 0, y: 20, scale: .9, stagger: 0.05, duration: .6, ease: "back.out(2)", scrollTrigger: { trigger: ".about__chips", start: "top 90%" } });

      // tarjetas de stack
      gsap.from(".card", { y: 80, opacity: 0, rotateX: -12, transformPerspective: 900, duration: 1.1, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".cards", start: "top 82%" } });

      // growth loop: dibuja la curva y enciende nodos
      const path = $("#loopPath");
      if (isDesktop && path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        const nodes = $$(".loop__node"), steps = $$(".step");
        gsap.set(nodes, { scale: 0 });
        gsap.set(steps, { opacity: 0.15, y: 20 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: "#loop", start: "top 75%", end: "bottom 55%", scrub: 0.8 } });
        tl.to(path, { strokeDashoffset: 0, duration: 3, ease: "none" }, 0);
        nodes.forEach((n, i) => {
          tl.to(n, { scale: 1, fill: "#c6ff3d", duration: 0.2, ease: "back.out(3)" }, i);
          tl.to(steps[i], { opacity: 1, y: 0, duration: 0.4 }, i);
        });
      } else {
        gsap.from(".step", { opacity: 0, x: -20, stagger: 0.12, duration: .8, ease: "power3.out", scrollTrigger: { trigger: ".loop__steps", start: "top 85%" } });
      }

      // experiencia: scroll horizontal fijado (desktop) / vertical (móvil)
      const track = $("#xpTrack");
      if (isDesktop) {
        const dist = () => track.scrollWidth - window.innerWidth;
        const horiz = gsap.to(track, { x: () => -dist(), ease: "none",
          scrollTrigger: { trigger: "#xp", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true,
            onUpdate: self => gsap.set("#xpBar", { scaleX: self.progress }) } });
        $$(".commit, .xp__end", track).forEach(card => {
          gsap.from(card, { opacity: 0.25, scale: 0.92, rotate: 2, ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: horiz, start: "left 95%", end: "left 55%", scrub: true } });
        });
      } else {
        $$(".commit, .xp__end", track).forEach(card => gsap.from(card, { opacity: 0, y: 50, duration: .9, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 88%" } }));
      }

      // terminal: escribe línea por línea
      const tLines = $$("#termBody .t");
      gsap.set(tLines, { opacity: 0 });
      gsap.timeline({ scrollTrigger: { trigger: "#terminal", start: "top 75%" } })
        .from("#terminal", { y: 60, opacity: 0, duration: .8, ease: "expo.out" })
        .to(tLines, { opacity: 1, duration: 0.01, stagger: { each: 0.11 } }, "-=0.3");

      // tabla de educación
      gsap.from(".table .row", { opacity: 0, x: -30, duration: .7, stagger: 0.06, ease: "power3.out", scrollTrigger: { trigger: ".table", start: "top 85%" } });

      // contacto: palabras que suben + leve escala
      const cs = new SplitText(".contact__line", { type: "words", wordsClass: "word", mask: "words" });
      splits.push(cs);
      gsap.from(cs.words, { yPercent: 110, duration: 1.2, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: "#contactTitle", start: "top 85%" } });
      gsap.from([".contact__sub", ".contact__actions", ".socials"], { opacity: 0, y: 30, stagger: .1, duration: .9, ease: "power3.out", scrollTrigger: { trigger: ".contact__sub", start: "top 92%" } });
    });
  }

  function rebuild() {
    const y = window.scrollY;
    mm && mm.revert();
    splits.forEach(s => s.revert());
    splits = [];
    applyLang();
    buildScroll();
    ScrollTrigger.refresh();
    if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
  }

  $("#langToggle").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    store.set("cf-lang", lang);
    gsap.to("main", { opacity: 0, duration: 0.2, onComplete() {
      rebuild();
      gsap.to("main", { opacity: 1, duration: 0.35 });
      gsap.to(roleEl, { duration: .8, scrambleText: { text: t("hero.roles")[roleIdx], chars: "01<>/#_$%" } });
    } });
  });

  // Arranque cuando las fuentes estén listas (SplitText mide líneas)
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    buildScroll();
    runLoader();
  });
})();
