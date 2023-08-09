/*
Copyright the Inclusive Design Research Centre copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/idrc/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/idrc/raw/main/LICENSE.md.
*/



const _paq = window._paq || [];
_paq.push(["trackPageView"], ["enableLinkTracking"]);
(function () {
    const siteId = "3"; // Set this to the ID of your site in Matomo. Value must be quoted.
    const u = "https://analytics.inclusivedesign.ca/";
    _paq.push(["setTrackerUrl", u + "matomo.php"], ["setSiteId", siteId]);
    const d = document;
    const g = d.createElement("script");
    const s = d.querySelectorAll("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.defer = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
})();
