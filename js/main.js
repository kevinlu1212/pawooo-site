/* ============================================================
   pawooo - Scrollytelling 滚动叙事
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ─── Elements ────────────────────────────────────────────────
  var scenes = document.querySelectorAll('.narrative-scene');
  var scrollyEl = document.getElementById('scrollyContainer');
  var dogImg = document.getElementById('dogImg');
  var counterCurrent = document.getElementById('counterCurrent');
  var progressBar = document.getElementById('progressBar');
  var scrollHint = document.getElementById('scrollHint');
  var narrative = document.getElementById('scrollyNarrative');

  if (!scenes.length) return;

  // ─── Scene Config ────────────────────────────────────────────
  // Each scene defines how the dog looks and the visual style.
  // Replace the image src with different pose images as you get them.
  var sceneConfig = [
    {
      // Scene 0: 初见
      imgSrc: 'assets/hero-samoyed.png',   // ← 换图片：狗狗坐着
      dogTransform: 'scale(1) translate(0, 0)',
      dogBorderRadius: '2rem',
      dogFrameSize: '100%',
      counterText: '01'
    },
    {
      // Scene 1: 相伴
      imgSrc: 'assets/hero-samoyed.png',   // ← 换图片：狗狗歪头/好奇
      dogTransform: 'scale(1.25) translate(-5%, -2%)',
      dogBorderRadius: '40% 40% 2rem 2rem',
      dogFrameSize: '100%',
      counterText: '02'
    },
    {
      // Scene 2: 永恒
      imgSrc: 'assets/hero-samoyed.png',   // ← 换图片：狗狗趴着/侧躺
      dogTransform: 'scale(0.8) translate(0, 0)',
      dogBorderRadius: '50% 50% 2rem 2rem',
      dogFrameSize: '75%',
      counterText: '03'
    }
  ];

  var currentScene = -1;
  var isTransitioning = false;

  // ─── IntersectionObserver: detect active scene ──────────────
  var sceneObserver = new IntersectionObserver(function (entries) {
    var maxRatio = 0;
    var mostVisibleScene = -1;

    entries.forEach(function (entry) {
      var ratio = entry.intersectionRatio;
      if (ratio > maxRatio) {
        maxRatio = ratio;
        mostVisibleScene = parseInt(entry.target.dataset.scene);
      }
    });

    if (mostVisibleScene >= 0 && mostVisibleScene !== currentScene && !isTransitioning) {
      activateScene(mostVisibleScene);
    }
  }, {
    threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
    rootMargin: '0px'
  });

  scenes.forEach(function (scene) {
    sceneObserver.observe(scene);
  });

  // ─── Activate Scene ──────────────────────────────────────────
  function activateScene(index) {
    isTransitioning = true;
    currentScene = index;
    var config = sceneConfig[index];

    // 1. Scene class on container (triggers CSS transitions)
    scrollyEl.className = 'scrolly scene-' + index;

    // 2. Update counter
    counterCurrent.textContent = config.counterText;

    // 3. Animate dog
    dogImg.style.transform = config.dogTransform;
    dogImg.style.borderRadius = config.dogBorderRadius;
    dogImg.parentElement.style.width = config.dogFrameSize;
    dogImg.parentElement.style.height = config.dogFrameSize;

    // 4. Hide scroll hint after first scene
    if (index > 0 && scrollHint) {
      scrollHint.classList.add('hidden');
    }

    // 5. Update page <title> subtly
    var titles = [
      'pawooo - 把毛孩子最美的样子留在时光里',
      'pawooo - 每一只毛孩子都有独一无二的神态',
      'pawooo - 我们用手工将它定格成永恒'
    ];
    if (titles[index]) {
      document.title = titles[index];
    }

    setTimeout(function () {
      isTransitioning = false;
    }, 900);
  }

  // ─── Progress Bar ────────────────────────────────────────────
  function updateProgress() {
    var narrativeRect = narrative.getBoundingClientRect();
    var totalHeight = narrative.scrollHeight - window.innerHeight;
    var scrolled = Math.abs(narrativeRect.top);
    var progress = Math.min(scrolled / totalHeight, 1);
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }
  }

  window.addEventListener('scroll', updateProgress);
  // Also track during touch/mobile scroll
  window.addEventListener('touchmove', updateProgress);

  // ─── Smooth anchor links (preserved from original) ──────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── Init: activate first scene ─────────────────────────────
  // Small delay to let CSS settle
  setTimeout(function () {
    activateScene(0);
    updateProgress();
  }, 100);

});
