/* =============================================
   AUREA DESCANSO — Journey (scroll-film) v7
   Fábrica que se ensambla sobre suelo reflectante,
   luz dinámica, god-rays, warp estelar, estallido
   dorado y cinemática con barras de cine.
   Solo se activa donde exista #journey (home).
   ============================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var section = document.getElementById('journey');
    if (!section) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── DOM base ── */
    section.innerHTML =
      '<div class="jrn__sticky">' +
        '<div class="jrn__scene" data-ch="f">' +
          '<div class="fbeam" aria-hidden="true"></div>' +
          '<div class="fstage fstage--mirror" aria-hidden="true"><div class="fcube" id="fcubeM"></div></div>' +
          '<div class="fstage"><div class="fcube" id="fcube"></div></div>' +
          '<div class="fglow" aria-hidden="true"></div>' +
          '<div class="fspeedy" aria-hidden="true"></div>' +
          '<div class="jrn__head">' +
            '<span class="jrn__kicker">Así nace tu descanso</span>' +
            '<h2 class="jrn__title" id="jrnTitleF">La fábrica <em>Aurea</em></h2>' +
          '</div>' +
        '</div>' +
        '<canvas class="jrn__fx" id="jrnFx" aria-hidden="true"></canvas>' +
        '<div class="jrn__scene" data-ch="p">' +
          '<div class="jrn__bed" data-ph="a"><img src="images/serenity-frontal.png" alt="Colchón Aurea Serenity en un dormitorio cálido" loading="lazy"></div>' +
          '<div class="jrn__bed" data-ph="b"><img src="images/serenity-asas.png" alt="Detalle de las asas y el acolchado del Serenity" loading="lazy"></div>' +
          '<div class="jrn__head" data-cap="a">' +
            '<span class="jrn__kicker">Sin intermediarios</span>' +
            '<h2 class="jrn__title">De la fábrica, <em>a tu dormitorio</em></h2>' +
          '</div>' +
          '<div class="jrn__head" data-cap="b">' +
            '<span class="jrn__kicker">Cada detalle, cosido</span>' +
            '<h2 class="jrn__title">Pruébalo <em>100 noches</em></h2>' +
          '</div>' +
        '</div>' +
        '<div class="jrn__bar jrn__bar--top" aria-hidden="true"></div>' +
        '<div class="jrn__bar jrn__bar--bottom" aria-hidden="true"></div>' +
        '<div class="jrn__flood" aria-hidden="true"></div>' +
        '<a class="jrn__cta" href="producto.html?m=serenity">Descubrir el Serenity' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
        '</a>' +
        '<div class="jrn__track" aria-hidden="true"><div class="jrn__fill"></div></div>' +
      '</div>';

    var scF = section.querySelector('[data-ch="f"]');
    var scP = section.querySelector('[data-ch="p"]');
    var cube = document.getElementById('fcube');
    var cubeM = document.getElementById('fcubeM');
    var beam = section.querySelector('.fbeam');
    var speedy = section.querySelector('.fspeedy');
    var flood = section.querySelector('.jrn__flood');
    var headF = scF.querySelector('.jrn__head');
    var titleF = document.getElementById('jrnTitleF');
    var photoA = scP.querySelector('[data-ph="a"]');
    var photoB = scP.querySelector('[data-ph="b"]');
    var imgA = photoA.querySelector('img');
    var imgB = photoB.querySelector('img');
    var capA = scP.querySelector('[data-cap="a"]');
    var capB = scP.querySelector('[data-cap="b"]');
    var barT = section.querySelector('.jrn__bar--top');
    var barB = section.querySelector('.jrn__bar--bottom');
    var cta = section.querySelector('.jrn__cta');
    var fill = section.querySelector('.jrn__fill');
    var fx = document.getElementById('jrnFx');

    /* ── Título que se ensambla letra a letra ── */
    (function splitTitle() {
      var out = [];
      function splitNode(node, wrapEm) {
        var txt = node.textContent;
        for (var i = 0; i < txt.length; i++) {
          var ch = txt.charAt(i);
          if (ch === ' ') { out.push(' '); continue; }
          out.push('<span class="jl' + (wrapEm ? ' jl--em' : '') + '">' + ch + '</span>');
        }
      }
      Array.prototype.forEach.call(titleF.childNodes, function (nd) {
        if (nd.nodeType === 3) splitNode(nd, false);
        else splitNode(nd, true);
      });
      titleF.innerHTML = out.join('');
    })();
    var letters = titleF.querySelectorAll('.jl');

    /* ══════════════════════════════════════════════
       LA FÁBRICA-CUBO ×2 (real + reflejo)
       ══════════════════════════════════════════════ */
    var W = 380, D = 300, H = 250;

    function el(parent, css, html) {
      var d = document.createElement('div');
      for (var k in css) d.style[k] = css[k];
      if (html) d.innerHTML = html;
      parent.appendChild(d);
      return d;
    }

    function buildFactory(target) {
      var fs = [];
      function makeFace(w, h, final, from, yaw) {
        var f = document.createElement('div');
        f.className = 'fcube__face';
        f.style.width = w + 'px';
        f.style.height = h + 'px';
        f.style.marginLeft = (-w / 2) + 'px';
        f.style.marginTop = (-h / 2) + 'px';
        f.style.transform = final;
        target.appendChild(f);
        var o = { el: f, F: final, from: from, yaw: yaw };
        fs.push(o);
        return o;
      }
      function windows(f, count, y, w, h, gap) {
        var total = count * w + (count - 1) * gap;
        for (var i = 0; i < count; i++) {
          el(f.el, {
            position: 'absolute',
            left: 'calc(50% - ' + (total / 2 - i * (w + gap)) + 'px)',
            top: y + 'px', width: w + 'px', height: h + 'px',
            borderRadius: '3px',
            background: 'linear-gradient(180deg, #E8C766 0%, #C89F35 100%)',
            boxShadow: '0 0 14px rgba(212,175,55,0.35)'
          }).className = 'jr-win fwin';
        }
      }

      var front = makeFace(W, H, 'translateZ(' + (D / 2) + 'px)',
        { x: 0, y: 40, z: 620, rx: 0, ry: -70 }, 0);
      el(front.el, {
        position: 'absolute', left: '50%', top: '22px', transform: 'translateX(-50%)',
        fontFamily: 'Georgia, serif', fontSize: '30px', letterSpacing: '9px',
        color: '#D4AF37', textShadow: '0 0 18px rgba(212,175,55,0.5)', whiteSpace: 'nowrap'
      }, 'AUREA');
      el(front.el, {
        position: 'absolute', left: '50%', top: '58px', transform: 'translateX(-50%)',
        fontFamily: 'Arial, sans-serif', fontSize: '9px', letterSpacing: '6px',
        color: 'rgba(212,175,55,0.75)', whiteSpace: 'nowrap'
      }, 'DESCANSO');
      windows(front, 2, 92, 58, 48, 150);
      el(front.el, {
        position: 'absolute', left: '50%', bottom: '0', width: '86px', height: '104px',
        transform: 'translateX(-50%)', borderRadius: '46px 46px 0 0',
        background: 'linear-gradient(180deg, #FFF3D6 0%, #E4BE5E 100%)',
        boxShadow: '0 0 34px rgba(255,232,160,0.65)'
      }).className = 'fwin';
      el(front.el, {
        position: 'absolute', left: '50%', bottom: '10px', width: '52px', height: '15px',
        transform: 'translateX(-50%)', borderRadius: '5px 5px 0 0', background: '#F6F3EA'
      });
      el(front.el, {
        position: 'absolute', left: '50%', bottom: '4px', width: '52px', height: '7px',
        transform: 'translateX(-50%)', background: '#1B2D5B'
      });

      var back = makeFace(W, H, 'rotateY(180deg) translateZ(' + (D / 2) + 'px)',
        { x: 0, y: -30, z: -620, rx: 0, ry: 70 }, 180);
      windows(back, 3, 60, 58, 48, 60);
      windows(back, 3, 150, 58, 48, 60);

      var right = makeFace(D, H, 'rotateY(90deg) translateZ(' + (W / 2) + 'px)',
        { x: 700, y: 0, z: 0, rx: 0, ry: 90 }, 90);
      windows(right, 3, 60, 48, 44, 44);
      windows(right, 3, 148, 48, 44, 44);

      var left = makeFace(D, H, 'rotateY(-90deg) translateZ(' + (W / 2) + 'px)',
        { x: -700, y: 0, z: 0, rx: 0, ry: -90 }, -90);
      windows(left, 3, 60, 48, 44, 44);
      windows(left, 3, 148, 48, 44, 44);

      var roof = makeFace(W, D, 'rotateX(90deg) translateZ(' + (H / 2) + 'px)',
        { x: 0, y: -720, z: 0, rx: 80, ry: 25 }, null);
      roof.el.style.background =
        'repeating-linear-gradient(90deg, transparent 0 74px, rgba(212,175,55,0.25) 74px 104px, transparent 104px 128px), #0B1731';

      return fs;
    }

    var faces = buildFactory(cube);
    var facesM = buildFactory(cubeM);

    /* ── Modo estático (accesibilidad): solo la foto final ── */
    if (reduce) {
      section.classList.add('jrn--static');
      scF.remove(); flood.remove(); fx.remove(); barT.remove(); barB.remove();
      scP.style.position = 'relative';
      scP.style.opacity = 1;
      scP.style.minHeight = '80vh';
      photoA.remove();
      photoB.style.opacity = 1;
      imgB.style.transform = 'none';
      capB.style.opacity = 1;
      cta.classList.add('is-on');
      return;
    }

    /* ══════════════════════════════════════════════
       CANVAS: estrellas, warp y estallido dorado
       ══════════════════════════════════════════════ */
    var ctx = fx.getContext('2d');
    var stars = [], burst = [], burstDone = false;
    var vw = 0, vhh = 0;
    function sizeFx() {
      vw = fx.width = fx.offsetWidth;
      vhh = fx.height = fx.offsetHeight;
    }
    sizeFx();
    window.addEventListener('resize', sizeFx);
    for (var i = 0; i < 210; i++) {
      stars.push({
        a: Math.random() * Math.PI * 2,
        r: Math.random(),
        spd: 0.15 + Math.random() * 0.85,
        size: 0.6 + Math.random() * 1.6,
        tw: Math.random() * Math.PI * 2
      });
    }
    function spawnBurst() {
      for (var i = 0; i < 150; i++) {
        burst.push({
          a: Math.random() * Math.PI * 2,
          r: 10 + Math.random() * 30,
          v: 5 + Math.random() * 15,
          size: 1 + Math.random() * 2.6,
          life: 1
        });
      }
    }

    var lastP = 0, fxOn = false, fxRaf = null;
    function fxLoop() {
      if (!fxOn) return;
      ctx.clearRect(0, 0, vw, vhh);
      var cx = vw / 2, cy = vhh / 2;
      var warp = clamp((lastP - 0.42) / 0.11, 0, 1);
      var starAlpha = clamp((0.60 - lastP) / 0.08, 0, 1);
      var maxR = Math.sqrt(cx * cx + cy * cy);

      if (starAlpha > 0) {
        for (var i = 0; i < stars.length; i++) {
          var s = stars[i];
          var prevR = s.r;
          s.r += s.spd * (0.0004 + warp * 0.045);
          if (s.r > 1) { s.r = 0.02 + Math.random() * 0.1; prevR = s.r; }
          s.tw += 0.03;
          var rr = Math.pow(s.r, 1.6) * maxR;
          var x = cx + Math.cos(s.a) * rr;
          var y = cy + Math.sin(s.a) * rr;
          var al = starAlpha * (0.25 + 0.5 * Math.abs(Math.sin(s.tw))) * (0.4 + s.r * 0.6);
          if (warp > 0.12) {
            var pr = Math.pow(Math.max(prevR - warp * 0.06, 0), 1.6) * maxR;
            ctx.strokeStyle = 'rgba(239,230,201,' + (al * 0.9) + ')';
            ctx.lineWidth = s.size * 0.8;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(s.a) * pr, cy + Math.sin(s.a) * pr);
            ctx.lineTo(x, y);
            ctx.stroke();
          } else {
            ctx.fillStyle = 'rgba(239,230,201,' + al + ')';
            ctx.beginPath();
            ctx.arc(x, y, s.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      for (var b = burst.length - 1; b >= 0; b--) {
        var q = burst[b];
        q.r += q.v;
        q.v *= 0.965;
        q.life -= 0.016;
        if (q.life <= 0) { burst.splice(b, 1); continue; }
        ctx.fillStyle = 'rgba(228,190,94,' + (q.life * 0.9) + ')';
        ctx.beginPath();
        ctx.arc(cx + Math.cos(q.a) * q.r, cy + Math.sin(q.a) * q.r, q.size * q.life, 0, Math.PI * 2);
        ctx.fill();
      }
      fxRaf = requestAnimationFrame(fxLoop);
    }

    var titleShown = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var vis = entries[0].isIntersecting;
        if (vis && !fxOn) { fxOn = true; sizeFx(); fxRaf = requestAnimationFrame(fxLoop); }
        if (!vis && fxOn) { fxOn = false; if (fxRaf) cancelAnimationFrame(fxRaf); }
        /* el título se ensambla la primera vez que asoma la sección */
        if (vis && !titleShown) {
          titleShown = true;
          Array.prototype.forEach.call(letters, function (l, i) {
            setTimeout(function () { l.classList.add('is-in'); }, 260 + i * 42);
          });
        }
      }, { threshold: 0.02 }).observe(section);
    } else {
      fxOn = true;
      requestAnimationFrame(fxLoop);
      Array.prototype.forEach.call(letters, function (l) { l.classList.add('is-in'); });
    }

    /* ── Dirección con el scroll ── */
    function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
    function fade(el2, op) { el2.style.opacity = op; }
    function easeOut(q) { return 1 - (1 - q) * (1 - q); }
    function easeInOut(q) { return q < 0.5 ? 2 * q * q : 1 - 2 * (1 - q) * (1 - q); }

    var tiltX = 0, tiltY = 0;
    if (window.matchMedia('(hover: hover)').matches) {
      section.addEventListener('mousemove', function (e) {
        tiltY = (e.clientX / window.innerWidth - 0.5) * 7;
        tiltX = -(e.clientY / window.innerHeight - 0.5) * 5;
        onScroll();
      });
      section.addEventListener('mouseleave', function () { tiltX = 0; tiltY = 0; onScroll(); });
    }

    var mobile = window.matchMedia('(max-width: 760px)');
    var LIGHT = -35;

    function update() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = clamp(-rect.top / (rect.height - vh), 0, 1);
      lastP = p;
      fill.style.height = (p * 100) + '%';

      var fOp = p < 0.50 ? 1 : clamp(1 - (p - 0.50) / 0.06, 0, 1);
      fade(scF, fOp);
      scF.style.visibility = fOp <= 0 ? 'hidden' : 'visible';

      /* Acto 1 — montaje · Acto 2 — órbita · Acto 3 — zambullida */
      var asm = clamp(p / 0.18, 0, 1);
      var q1 = easeInOut(clamp((p - 0.16) / 0.26, 0, 1));
      var spin = -64 + q1 * 424;
      if (asm < 1) spin = -64 * asm;
      var bob = Math.sin(p * 12) * 7;
      var q2 = clamp((p - 0.42) / 0.13, 0, 1);
      var dive = q2 * q2;
      var scale = (mobile.matches ? 0.62 : 1) *
        (0.86 + easeOut(clamp((p - 0.16) / 0.26, 0, 1)) * 0.16 + dive * 7.4);

      var pose =
        'translateY(' + (bob + dive * 130) + 'px)' +
        ' rotateX(' + (-17 + tiltX + dive * 15) + 'deg)' +
        ' rotateY(' + (spin + tiltY) + 'deg)' +
        ' scale3d(' + scale + ',' + scale + ',' + scale + ')';
      cube.style.transform = pose;
      cubeM.style.transform = pose;

      /* piezas volando a su sitio (en el reflejo también) */
      [faces, facesM].forEach(function (fs) {
        fs.forEach(function (f, idx) {
          var t = easeOut(clamp((asm - idx * 0.12) / 0.55, 0, 1));
          if (t >= 1) {
            if (f.el.style.opacity !== '1') f.el.style.opacity = '1';
            f.el.style.transform = f.F;
          } else {
            var inv = 1 - t;
            f.el.style.opacity = Math.min(1, t * 2.2);
            f.el.style.transform =
              'translate3d(' + (f.from.x * inv) + 'px,' + (f.from.y * inv) + 'px,' + (f.from.z * inv) + 'px)' +
              ' rotateX(' + (f.from.rx * inv) + 'deg) rotateY(' + (f.from.ry * inv) + 'deg) ' + f.F;
          }
          /* luz dinámica según el ángulo de cada cara */
          var b;
          if (f.yaw === null) b = 0.82;
          else b = 0.62 + 0.42 * Math.max(0, Math.cos((f.yaw + spin - LIGHT) * Math.PI / 180));
          f.el.style.filter = 'brightness(' + b.toFixed(3) + ')';
        });
      });

      cube.classList.toggle('is-lit', asm >= 1);
      cubeM.classList.toggle('is-lit', asm >= 1);

      fade(headF, clamp(1 - (p - 0.05) / 0.10, 0, 1));

      /* God-rays cuando la puerta encara la cámara, antes del salto */
      fade(beam, clamp((p - 0.35) / 0.05, 0, 1) * clamp((0.50 - p) / 0.05, 0, 1));
      /* Viñeta de velocidad durante la zambullida */
      fade(speedy, dive);

      /* Destello + estallido al cruzar la puerta */
      fade(flood, 0.95 * clamp(1 - Math.abs(p - 0.53) / 0.05, 0, 1));
      if (p > 0.515 && !burstDone) { burstDone = true; spawnBurst(); }
      if (p < 0.40) burstDone = false;

      /* Acto 4 — cinemática con barras de cine */
      var pIn = clamp((p - 0.52) / 0.06, 0, 1);
      fade(scP, pIn);
      barT.style.height = (pIn * 6.5) + 'vh';
      barB.style.height = (pIn * 6.5) + 'vh';

      var qa = clamp((p - 0.55) / 0.24, 0, 1);
      var aOut = clamp((0.83 - p) / 0.05, 0, 1);
      fade(photoA, Math.min(1, aOut));
      imgA.style.transform = 'scale(' + (1.30 - easeOut(qa) * 0.24) + ')';
      fade(capA, Math.min(clamp((p - 0.57) / 0.05, 0, 1), clamp((0.76 - p) / 0.05, 0, 1)));

      var qb = clamp((p - 0.80) / 0.18, 0, 1);
      fade(photoB, clamp((p - 0.80) / 0.05, 0, 1));
      imgB.style.transform = 'scale(' + (1.20 - easeOut(qb) * 0.16) + ')';
      fade(capB, clamp((p - 0.84) / 0.05, 0, 1));

      cta.classList.toggle('is-on', p > 0.93);
    }

    var ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { update(); ticking = false; });
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  });
})();
