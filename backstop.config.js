/* eslint-disable camelcase */

const baseUrl = process.env.BASE_URL || "http://host.docker.internal:8080";

module.exports = {
    id: "backstop_default",
    dockerCommandTemplate: "docker run --rm -i --mount type=bind,source=\"{cwd}\",target=/src backstopjs/backstopjs:{version} {backstopCommand} {args}",
    viewports: [
        {
            label: "phone",
            width: 320,
            height: 480
        },
        {
            label: "tablet",
            width: 768,
            height: 1024
        },
        {
            label: "desktop",
            width: 1024,
            height: 768
        }
    ],
    onBeforeScript: "puppet/onBefore.js",
    onReadyScript: "puppet/onReady.js",
    scenarios: [
        {
            label: "Repertoire",
            url: `${baseUrl}/repertoire/`,
            referenceUrl: "https://dev--idrc.netlify.app/repertoire/"
        }
    ],
    paths: {
        bitmaps_reference: "backstop_data/bitmaps_reference",
        bitmaps_test: "backstop_data/bitmaps_test",
        engine_scripts: "backstop_data/engine_scripts",
        html_report: "backstop_data/html_report",
        ci_report: "backstop_data/ci_report"
    },
    report: ["browser", "json"],
    engine: "puppeteer",
    engineOptions: {
        args: ["--no-sandbox"]
    },
    asyncCaptureLimit: 5,
    asyncCompareLimit: 50,
    debug: false,
    debugWindow: false
};
