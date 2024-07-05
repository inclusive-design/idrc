module.exports = {
    ci: {
        collect: {
            settings: {
                // Fix the CI failure with error "Unable to connect to chrome".
                // See: https://github.com/GoogleChrome/lighthouse-ci/issues/802
                hostname: "127.0.0.1",
                // Source the form factor from an environment variable set in the CI run
                formFactor: process.env.EMULATE_DEVICE || "mobile",
                screenEmulation: {
                    mobile: !(process.env.EMULATE_DEVICE === "desktop")
                },
                // Do not apply any throttling
                throttlingMethod: "provided",
                // Skipping "uses-http2" due to errors with reports see: http2 https://github.com/GoogleChrome/lighthouse/issues/6539
                // Skipping "is-crawlable" because Netlify's preview preview for PRs add `x-robots-tag: noindex`
                // Skipping "service-worker" because the service worker is disabled on deploy previews.
                // Skipping "works-offline" and "offline-start-url" because the service worker is disabled on deploy previews.
                skipAudits: [
                    "uses-http2",
                    "is-crawlable",
                    "service-worker",
                    "offline-start-url",
                    "works-offline"
                ]
            }
        },
        assert: {
            assertions: {
                "categories:performance": ["error", { minScore: 0.9 }],
                "categories:accessibility": ["error", { minScore: 1 }],
                "categories:best-practices": ["error", { minScore: 1 }],
                "categories:seo": ["error", { minScore: 1 }]
            }
        }
    }
};
