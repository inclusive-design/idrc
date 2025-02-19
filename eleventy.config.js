const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventyRssPlugin = require("@11ty/eleventy-plugin-rss");
const eleventyPWA = require("@pkvach/eleventy-plugin-pwa");
const eleventySharp = require("eleventy-plugin-sharp");
const fluidPlugin = require("eleventy-plugin-fluid");
const parseTransform = require("./src/_transforms/parse.js");
const youtubeShortcode = require("./src/_shortcodes/youtube.js");
const imagePositionWithTextShortcode = require("./src/_shortcodes/image-position-with-text.js");

const workboxOptions = {
    cacheId: "idrc",
    swDest: "./_site/sw.js",
    globPatterns: ["assets/fonts/*.{woff,woff2}", "assets/images/*.{png,svg}"],
    globIgnores: ["admin/**/*", "node_modules/**/*"],
    clientsClaim: true,
    skipWaiting: true
};

// Import data files
const siteConfig = require("./src/_data/config.json");

module.exports = eleventyConfig => {
    const now = new Date();

    // Collections.
    const livePosts = post => post.date <= now && !post.data.draft && !post.data.archived;

    eleventyConfig.addCollection("people", collection => {
        return collection.getFilteredByGlob("src/collections/people/*.md").sort((a, b) => {
            const nameA = a.data.title;
            const nameB = b.data.title;

            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }

            return 0;
        });
    });

    for (const lang of siteConfig.locales) {
        eleventyConfig.addCollection(`projects_${lang}`, collection => {
            const projects = [...collection.getFilteredByGlob(`src/collections/projects/${lang}/*.md`)];
            const uniqueProjects = [];

            // Skip project subpages.
            for (const project of projects) {
                if (!project.data.parentTitle || project.data.parentTitle === "") {
                    uniqueProjects.push(project);
                }
            };

            return uniqueProjects.sort((a, b) => Number.parseInt(b.data.order) - Number.parseInt(a.data.order)).reverse();
        });
    };

    eleventyConfig.addCollection("news", collection => {
        return [
            ...collection.getFilteredByGlob("./src/collections/news/*.md").filter(post => livePosts(post))
        ].reverse();
    });

    eleventyConfig.addCollection("ideas", collection => {
        return [
            ...collection.getFilteredByGlob("./src/collections/ideas/*.md").filter(post => livePosts(post))
        ].reverse();
    });

    eleventyConfig.addCollection("postFeed", collection => {
        return [...collection.getFilteredByGlob(["./src/collections/news/*.md", "./src/ideas/*.md"]).filter(post => livePosts(post))]
            .reverse()
            .slice(0, 10);
    });

    eleventyConfig.addCollection("resources", collection => {
        return collection.getFilteredByGlob("src/collections/resources/*.md");
    });

    eleventyConfig.setUseGitIgnore(false);

    // Plugins.
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(eleventyPWA, workboxOptions);
    eleventyConfig.addPlugin(eleventyRssPlugin);
    eleventyConfig.addPlugin(fluidPlugin, {
        css: {
            enabled: false
        },
        sass: {
            enabled: true
        },
        defaultLanguage: "en-CA",
        supportedLanguages: {
            "en-CA": {
                slug: "en",
                name: "English"
            },
            "fr-CA": {
                slug: "fr",
                name: "Français",
                dir: "ltr",
                uioSlug: "fr"
            }
        }
    });
    eleventyConfig.addPlugin(eleventySharp({
        urlPath: "/media",
        outputDir: "_site/media/"
    }));

    // Transforms.
    eleventyConfig.addTransform("parse", parseTransform);

    // Add shortcodes.
    eleventyConfig.addPairedShortcode("imagePositionWithText", imagePositionWithTextShortcode);
    eleventyConfig.addShortcode("youtube", youtubeShortcode);


    // Passthrough file copy.
    eleventyConfig.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});
    eleventyConfig.addPassthroughCopy({"src/media": "media"});
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");
    eleventyConfig.addPassthroughCopy({
        "node_modules/decap-cms/dist/decap-cms.js": "lib/cms/decap-cms.js",
        "node_modules/decap-cms/dist/decap-cms.js.map": "lib/cms/decap-cms.js.map",
        "node_modules/nunjucks/browser/nunjucks-slim.min.js": "lib/cms/nunjucks-slim.min.js",
        "node_modules/prop-types/prop-types.min.js": "lib/cms/prop-types.min.js",
        "node_modules/react/umd/react.development.js": "lib/cms/react.development.js",
        "node_modules/react/umd/react.production.min.js": "lib/cms/react.production.min.js"
    });
    eleventyConfig.addPassthroughCopy("_redirects");

    return {
        dir: {
            input: "src"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
    };
};
