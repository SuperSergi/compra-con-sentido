document.addEventListener("DOMContentLoaded", () => {

  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (!nav) return;

  const base =
    "/";

  const submenuData = [
    {
      label: "Gatos hidráulicos",
      items: [
        {
          label: "Gatos hidráulicos para coche comparados",
          href:
            base +
            "herramientas/gatos-hidraulicos/mejores-gatos-hidraulicos-para-coche/"
        }
      ]
    },
    {
      label: "Taladros a batería",
      items: [
        {
          label: "Taladros a batería comparados",
          href:
            base +
            "herramientas/taladros-a-bateria/mejores-taladros-a-bateria/"
        }
      ]
    },
    {
      label: "Impresoras 3D",
      items: [
        {
          label: "Impresoras 3D comparadas",
          href:
            base +
            "impresion-3d/impresoras-3d/mejores-impresoras-3d/"
        }
      ]
    },
    {
      label: "Filamentos 3D",
      items: [
        {
          label: "Mejores filamentos PLA",
          href:
            base +
            "impresion-3d/filamentos-3d/mejores-filamentos-pla/"
        }
      ]
    },
    {
      label: "Aspiradoras",
      items: [
        {
          label: "Robots aspiradores comparados",
          href:
            base +
            "hogar/aspiradoras/mejores-robots-aspiradores/"
        }
      ]
    },
    {
      label: "Deshumidificadores",
      items: [
        {
          label: "Litros/día según m²",
          href:
            base +
            "hogar/deshumidificadores/cuantos-litros-deshumidificador-metros-cuadrados/"
        },
        {
          label: "6 deshumidificadores para casa comparados",
          href:
            base +
            "hogar/deshumidificadores/mejores-deshumidificadores/"
        }
      ]
    }
  ];

  const normalize = value =>
    value
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const directHogarLink =
    Array.from(nav.children)
      .find(element =>
        element.tagName === "A" &&
        normalize(element.textContent) === "hogar"
      );

  if (directHogarLink) {

    const hogarGroup =
      document.createElement("div");

    hogarGroup.className =
      "nav-group";

    const hogarMain =
      document.createElement("a");

    hogarMain.href =
      base + "hogar/";

    if (
      directHogarLink.classList.contains(
        "active"
      )
    ) {
      hogarMain.classList.add("active");
    }

    hogarMain.innerHTML =
      'Hogar <span aria-hidden="true">⌄</span>';

    const hogarDropdown =
      document.createElement("div");

    hogarDropdown.className =
      "dropdown";

    hogarDropdown.innerHTML =
      '<a href="' +
      base +
      'hogar/aspiradoras/">Aspiradoras</a>' +
      '<a href="' +
      base +
      'hogar/deshumidificadores/">Deshumidificadores</a>';

    nav.replaceChild(
      hogarGroup,
      directHogarLink
    );

    hogarGroup.appendChild(hogarMain);
    hogarGroup.appendChild(hogarDropdown);

  }

  const dropdownLinks =
    nav.querySelectorAll(".dropdown > a");

  submenuData.forEach(item => {

    const targetLink =
      Array.from(dropdownLinks)
        .find(link =>
          normalize(link.textContent) ===
          normalize(item.label)
        );

    if (!targetLink) return;

    if (
      targetLink.parentElement
        ?.classList.contains("dropdown-subgroup")
    ) {
      return;
    }

    const wrapper =
      document.createElement("div");

    wrapper.className =
      "dropdown-subgroup";

    const parent =
      targetLink.parentNode;

    parent.insertBefore(wrapper, targetLink);

    wrapper.appendChild(targetLink);

    targetLink.classList.add(
      "dropdown-parent"
    );

    const toggle =
      document.createElement("button");

    toggle.type = "button";
    toggle.className = "submenu-toggle";
    toggle.setAttribute(
      "aria-label",
      "Abrir opciones de " + item.label
    );
    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle.innerHTML =
      '<span aria-hidden="true">›</span>';

    const submenu =
      document.createElement("div");

    submenu.className =
      "dropdown-submenu";

    submenu.innerHTML =
      item.items
        .map(link =>
          '<a href="' +
          link.href +
          '">' +
          link.label +
          '</a>'
        )
        .join("");

    wrapper.appendChild(toggle);
    wrapper.appendChild(submenu);

    const setOpen = open => {
      wrapper.classList.toggle(
        "open",
        open
      );

      toggle.setAttribute(
        "aria-expanded",
        String(open)
      );
    };

    toggle.addEventListener(
      "click",
      event => {
        event.preventDefault();
        event.stopPropagation();

        setOpen(
          !wrapper.classList.contains(
            "open"
          )
        );
      }
    );

    wrapper.addEventListener(
      "mouseenter",
      () => {
        if (window.innerWidth > 760) {
          setOpen(true);
        }
      }
    );

    wrapper.addEventListener(
      "mouseleave",
      () => {
        if (window.innerWidth > 760) {
          setOpen(false);
        }
      }
    );
  });

  if (button) {

    button.addEventListener(
      "click",
      () => {

        const open =
          nav.classList.toggle("open");

        button.setAttribute(
          "aria-expanded",
          String(open)
        );

      }
    );

    nav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            if (
              window.innerWidth <= 760
            ) {

              nav
                .classList
                .remove("open");

              button
                .setAttribute(
                  "aria-expanded",
                  "false"
                );

            }

          }
        );

      });

  }

  document.addEventListener(
    "click",
    event => {

      if (
        !event.target.closest(
          ".dropdown-subgroup"
        )
      ) {

        nav
          .querySelectorAll(
            ".dropdown-subgroup.open"
          )
          .forEach(group => {

            group
              .classList
              .remove("open");

            const toggle =
              group.querySelector(
                ".submenu-toggle"
              );

            if (toggle) {
              toggle.setAttribute(
                "aria-expanded",
                "false"
              );
            }

          });

      }

    }
  );

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 760
      ) {

        nav
          .classList
          .remove("open");

        if (button) {
          button.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      }

      nav
        .querySelectorAll(
          ".dropdown-subgroup.open"
        )
        .forEach(group => {

          group
            .classList
            .remove("open");

          const toggle =
            group.querySelector(
              ".submenu-toggle"
            );

          if (toggle) {
            toggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }

        });

    }
  );

});


/* =========================================================
   ANALÍTICA V2 · GA4 CON CONSENTIMIENTO
   Google Analytics NO se carga hasta que el usuario acepta.
   ========================================================= */

(() => {

  const MEASUREMENT_ID =
    "G-WQ9KB0DDP7";

  const STORAGE_KEY =
    "ccc_analytics_consent";

  const BASE =
    "/";

  const getConsent = () => {
    try {
      return localStorage.getItem(
        STORAGE_KEY
      );
    } catch {
      return null;
    }
  };

  const setConsent = value => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        value
      );
    } catch {}
  };

  const deleteAnalyticsCookies = () => {
    document.cookie
      .split(";")
      .map(cookie =>
        cookie.split("=")[0].trim()
      )
      .filter(name =>
        name === "_ga" ||
        name.startsWith("_ga_")
      )
      .forEach(name => {
        document.cookie =
          name +
          "=; Max-Age=0; path=/; SameSite=Lax";
      });
  };

  const loadAnalytics = () => {

    if (
      window.__cccAnalyticsLoaded
    ) {
      return;
    }

    window.__cccAnalyticsLoaded = true;

    window.dataLayer =
      window.dataLayer || [];

    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(
          arguments
        );
      };

    window.gtag(
      "consent",
      "default",
      {
        analytics_storage:
          "granted",
        ad_storage:
          "denied",
        ad_user_data:
          "denied",
        ad_personalization:
          "denied"
      }
    );

    window.gtag(
      "js",
      new Date()
    );

    window.gtag(
      "config",
      MEASUREMENT_ID
    );

    const script =
      document.createElement(
        "script"
      );

    script.async = true;
    script.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(
        MEASUREMENT_ID
      );

    document.head.appendChild(
      script
    );

  };

  const revokeAnalytics = () => {

    if (
      typeof window.gtag ===
      "function"
    ) {
      window.gtag(
        "consent",
        "update",
        {
          analytics_storage:
            "denied",
          ad_storage:
            "denied",
          ad_user_data:
            "denied",
          ad_personalization:
            "denied"
        }
      );
    }

    deleteAnalyticsCookies();

  };

  const addConsentStyles = () => {

    if (
      document.getElementById(
        "ccc-consent-styles"
      )
    ) {
      return;
    }

    const style =
      document.createElement(
        "style"
      );

    style.id =
      "ccc-consent-styles";

    style.textContent = `
      .ccc-cookie-banner{
        position:fixed;
        left:16px;
        right:16px;
        bottom:16px;
        z-index:9999;
        max-width:900px;
        margin:auto;
        padding:20px;
        border:1px solid #d7e3dc;
        border-radius:18px;
        background:#fff;
        box-shadow:0 18px 55px rgba(0,0,0,.20);
        color:#314239;
      }
      .ccc-cookie-banner[hidden]{display:none!important}
      .ccc-cookie-title{
        margin:0 0 7px;
        color:#063d26;
        font-size:19px;
        font-weight:900;
      }
      .ccc-cookie-text{
        margin:0;
        font-size:14px;
        line-height:1.58;
      }
      .ccc-cookie-text a{
        color:#0b6742;
        font-weight:800;
      }
      .ccc-cookie-actions{
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        margin-top:15px;
      }
      .ccc-cookie-btn{
        flex:1 1 210px;
        min-height:44px;
        padding:10px 16px;
        border:1px solid #0b6742;
        border-radius:11px;
        background:#0b6742;
        color:#fff;
        font:inherit;
        font-weight:850;
        cursor:pointer;
      }
      .ccc-cookie-btn:hover{
        filter:brightness(.94);
      }
      .ccc-cookie-prefs{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        margin-top:10px;
        padding:7px 10px;
        border:1px solid currentColor;
        border-radius:9px;
        background:transparent;
        color:inherit;
        font:inherit;
        font-size:12px;
        font-weight:750;
        cursor:pointer;
      }
      @media(max-width:600px){
        .ccc-cookie-banner{
          left:10px;
          right:10px;
          bottom:10px;
          padding:17px;
        }
        .ccc-cookie-actions{
          display:grid;
          grid-template-columns:1fr;
        }
      }
    `;

    document.head.appendChild(
      style
    );

  };

  let banner;

  const showBanner = () => {

    if (!banner) return;

    banner.hidden = false;

  };

  const hideBanner = () => {

    if (!banner) return;

    banner.hidden = true;

  };

  const createConsentUi = () => {

    addConsentStyles();

    banner =
      document.createElement(
        "section"
      );

    banner.className =
      "ccc-cookie-banner";

    banner.setAttribute(
      "role",
      "region"
    );

    banner.setAttribute(
      "aria-label",
      "Preferencias de cookies"
    );

    banner.innerHTML = `
      <p class="ccc-cookie-title">
        Analítica y privacidad
      </p>
      <p class="ccc-cookie-text">
        Usamos Google Analytics únicamente si aceptas las cookies de analítica.
        Nos ayuda a saber qué páginas funcionan y qué enlaces de Amazon reciben clics.
        Puedes aceptar o rechazar con la misma facilidad y cambiar tu decisión después.
        <a href="${BASE}aviso-legal/#cookies">Más información</a>.
      </p>
      <div class="ccc-cookie-actions">
        <button class="ccc-cookie-btn" type="button" data-consent="denied">
          Rechazar analíticas
        </button>
        <button class="ccc-cookie-btn" type="button" data-consent="granted">
          Aceptar analíticas
        </button>
      </div>
    `;

    document.body.appendChild(
      banner
    );

    banner
      .querySelectorAll(
        "[data-consent]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const choice =
              button.dataset
                .consent;

            setConsent(choice);

            if (
              choice ===
              "granted"
            ) {
              loadAnalytics();
            } else {
              revokeAnalytics();
            }

            hideBanner();

          }
        );

      });

    const footer =
      document.querySelector(
        ".footer-bottom"
      ) ||
      document.querySelector(
        ".site-footer"
      ) ||
      document.body;

    const prefs =
      document.createElement(
        "button"
      );

    prefs.type = "button";
    prefs.className =
      "ccc-cookie-prefs";
    prefs.textContent =
      "Preferencias de cookies";

    prefs.addEventListener(
      "click",
      showBanner
    );

    footer.appendChild(prefs);

    window.cccOpenCookiePreferences =
      showBanner;

    if (!getConsent()) {
      showBanner();
    } else {
      hideBanner();
    }

  };

  if (
    getConsent() ===
    "granted"
  ) {
    loadAnalytics();
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      createConsentUi
    );
  } else {
    createConsentUi();
  }

  window.cccAnalyticsGranted =
    () =>
      getConsent() ===
      "granted";

})();


/* =========================================================
   MEDICIÓN V2 · CLICS DE AFILIACIÓN
   El evento amazon_click solo se envía si el usuario
   ha aceptado analíticas.
   ========================================================= */

document.addEventListener("click", event => {

  const link =
    event.target.closest(
      'a[href*="amazon.es"], a[href*="amzn.to"]'
    );

  if (!link) return;

  if (
    typeof window
      .cccAnalyticsGranted !==
      "function" ||
    !window
      .cccAnalyticsGranted()
  ) {
    return;
  }

  let url;

  try {
    url = new URL(
      link.href,
      window.location.href
    );
  } catch {
    return;
  }

  const asinMatch =
    url.pathname.match(
      /\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i
    );

  const container =
    link.closest(
      "article, .product-card, .robot-card, .comparison-card, .guide-card"
    );

  const heading =
    container?.querySelector(
      "h1, h2, h3"
    );

  const product =
    link.dataset.product ||
    heading?.textContent
      ?.replace(/\s+/g, " ")
      .trim() ||
    link.textContent
      .replace(/\s+/g, " ")
      .trim();

  if (
    typeof window.gtag !==
    "function"
  ) {
    return;
  }

  window.gtag(
    "event",
    "amazon_click",
    {
      page_path:
        window.location.pathname,
      page_title:
        document.title,
      product_name:
        product ||
        "Producto Amazon",
      asin:
        asinMatch?.[1] || "",
      affiliate_tag:
        url.searchParams.get(
          "tag"
        ) || "",
      link_url:
        url.href
    }
  );

});
