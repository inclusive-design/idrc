import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import MarkdownIt from "markdown-it";

// const eleventySharp = require("eleventy-plugin-sharp");
import fluidPlugin from "eleventy-plugin-fluid";
import parseTransform from "./src/_transforms/parse.js";
import siteConfig from "./src/_data/config.json" with { type: "json" };
import siteData from "./src/_data/site.json" with { type: "json" };

export default eleventyConfig => {

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

            return projects.sort((a, b) => Number.parseInt(b.data.order) - Number.parseInt(a.data.order)).reverse();
        });

        eleventyConfig.addCollection(`projectSubpages_${lang}`, collection => {
            const projectSubpages = [...collection.getFilteredByGlob(`src/collections/project-subpages/${lang}/*.md`)];

            return projectSubpages.sort((a, b) => Number.parseInt(b.data.order) - Number.parseInt(a.data.order)).reverse();
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

    /** TODO: Swap this for renderContent("md") once https://github.com/11ty/eleventy/issues/3665 is addressed */
    eleventyConfig.addFilter("markdownFilter", (value) => {
        const md = new MarkdownIt({
            html: true,
            linkify: true
        });

        return md.render(value);
    });

    eleventyConfig.addFilter("findByKey", (navItems, value) => {
        return navItems.filter(item => {
            return item.key === value;
        });
    });

    // Plugins.
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        formats: ["avif", "webp", "jpeg"],
        htmlOptions: {
            imgAttributes: {
                loading: "lazy",
                decoding: "async"
            }
        },
        transform: (sharp) => {
            sharp.resize(570, 382, {fit: "cover"});
        }
    });
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(feedPlugin, {
        type:"atom",
        outputPath: "/feed.xml",
        collection: {
            name: "postFeed",
            limit: 10
        },
        metadata: {
            language: "en-CA",
            title: siteData.title,
            base: `${ siteData.url }/`,
            author: {
                name: siteData.name,
                email: siteData.email
            }
        }
    });
    eleventyConfig.addPlugin(fluidPlugin, {
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

    // Transforms.
    eleventyConfig.addTransform("parse", parseTransform);

    // Passthrough file copy.
    eleventyConfig.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    eleventyConfig.addPassthroughCopy({"src/assets/images": "assets/images"});
    eleventyConfig.addPassthroughCopy({"src/media": "media"});
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");

    return {
        dir: {
            input: "src"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
    };
};
