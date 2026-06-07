(function () {
  var CONSENT_KEY = 'analytics_consent';
  var METRIKA_ID = 109690388;

  function loadMetrika() {
    var webvisor = (window._ymWebvisor !== undefined) ? window._ymWebvisor : true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) { return; }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + METRIKA_ID, 'ym');
    ym(METRIKA_ID, 'init', {
      ssr: true,
      webvisor: webvisor,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true
    });
  }

  function showBanner() {
    if (document.getElementById('cookie-banner')) { return; }

    var style = document.createElement('style');
    style.textContent = [
      '#cookie-banner{',
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;',
        'background:#2C2416;border-top:1px solid rgba(255,253,249,.12);',
        'padding:16px 24px;',
        'display:flex;align-items:center;justify-content:space-between;',
        'gap:16px;flex-wrap:wrap;',
        'font-family:"DM Sans",system-ui,sans-serif;font-size:.88rem;',
        'line-height:1.5;',
      '}',
      '#cookie-banner p{',
        'color:rgba(255,253,249,.72);margin:0;flex:1;min-width:200px;',
      '}',
      '#cookie-banner a{color:#C17F4A;text-decoration:underline;}',
      '#cookie-banner a:hover{color:#F0DCC8;}',
      '.cb-btns{display:flex;gap:10px;flex-shrink:0;}',
      '.cb-btn{',
        'padding:9px 20px;border-radius:10px;font-size:.85rem;font-weight:600;',
        'cursor:pointer;border:none;font-family:inherit;transition:background .2s;',
      '}',
      '.cb-btn-accept{background:#C17F4A;color:#fff;}',
      '.cb-btn-accept:hover{background:#A06535;}',
      '.cb-btn-decline{background:rgba(255,253,249,.1);color:rgba(255,253,249,.7);}',
      '.cb-btn-decline:hover{background:rgba(255,253,249,.18);}'
    ].join('');
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<p>Сайт использует Яндекс.Метрику (включая Вебвизор) для анализа посещаемости. ' +
      'Просматривать материалы можно без согласия на аналитику. ' +
      '<a href="/privacy.html">Политика конфиденциальности</a></p>' +
      '<div class="cb-btns">' +
        '<button class="cb-btn cb-btn-decline" onclick="declineCookies()">Отказаться</button>' +
        '<button class="cb-btn cb-btn-accept" onclick="acceptCookies()">Принять аналитику</button>' +
      '</div>';
    document.body.appendChild(banner);
  }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) { b.parentNode.removeChild(b); }
  }

  window.acceptCookies = function () {
    localStorage.setItem(CONSENT_KEY, 'true');
    hideBanner();
    loadMetrika();
  };

  window.declineCookies = function () {
    localStorage.setItem(CONSENT_KEY, 'false');
    hideBanner();
  };

  var consent = localStorage.getItem(CONSENT_KEY);
  if (consent === 'true') {
    loadMetrika();
  } else if (!consent) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
