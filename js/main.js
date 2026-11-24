/* ==========================================================
   Budget Stop Iconic
   1. Image fallback if a logo image fails to load
   2. Gold spotlight that follows the pointer on link cards
   3. Crest leans toward the pointer (desktop only)
   4. Floating gold dust on a canvas
   ========================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- 1. Image fallback ---------- */
  function showFallback(img) {
    if (img.dataset.failed) return;
    img.dataset.failed = "true";

    var label = img.getAttribute("data-fallback") || "";
    if (!label) {
      img.style.display = "none";
      return;
    }

    var box = document.createElement("div");
    box.className = "img-fallback " + img.className;
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", img.alt);
    box.textContent = label;
    img.replaceWith(box);
  }

  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      showFallback(img);
    });
    if (img.complete && img.naturalWidth === 0) {
      showFallback(img);
    }
  });

  /* ---------- 2. Spotlight on link cards ---------- */
  if (finePointer) {
    document.querySelectorAll(".link-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------- 3. Crest leans toward the pointer ---------- */
  var crest = document.querySelector(".crest");
  if (crest && finePointer && !reduceMotion) {
    var ticking = false;
    window.addEventListener("pointermove", function (e) {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        var y = (e.clientY / window.innerHeight - 0.5) * 2;
        crest.style.transform = "rotateY(" + x * 9 + "deg) rotateX(" + -y * 6 + "deg)";
        ticking = false;
      });
    });
    document.addEventListener("pointerleave", function () {
      crest.style.transform = "";
    });
  }

  /* ---------- 4. Gold dust ---------- */
  var canvas = document.getElementById("dust");
  if (!canvas || reduceMotion) return;

  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0;
  var h = 0;
  var specks = [];
  var COUNT = window.innerWidth < 640 ? 22 : 34;
  var raf = null;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeSpeck(startAnywhere) {
    return {
      x: Math.random() * w,
      y: startAnywhere ? Math.random() * h : h + 10,
      r: 0.8 + Math.random() * 1.9,
      vy: 0.12 + Math.random() * 0.3,
      sway: 8 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
      tw: Math.random() * Math.PI * 2
    };
  }

  function init() {
    resize();
    specks = [];
    for (var i = 0; i < COUNT; i++) specks.push(makeSpeck(true));
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    var s = t / 1000;
    for (var i = 0; i < specks.length; i++) {
      var p = specks[i];
      p.y -= p.vy;
      if (p.y < -10) specks[i] = p = makeSpeck(false);

      var x = p.x + Math.sin(s * p.speed + p.phase) * p.sway;
      var a = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(s * 1.6 + p.tw));

      ctx.beginPath();
      ctx.fillStyle = "rgba(191, 159, 98, " + a.toFixed(3) + ")";
      ctx.shadowColor = "rgba(227, 207, 159, 0.9)";
      ctx.shadowBlur = 6;
      ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = window.requestAnimationFrame(frame);
  }

  function start() {
    if (!raf) raf = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (raf) window.cancelAnimationFrame(raf);
    raf = null;
  }

  init();
  start();

  window.addEventListener("resize", init);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });
})();
