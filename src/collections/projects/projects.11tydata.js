const { generatePermalink } = require("eleventy-plugin-fluid");

module.exports = {
    eleventyComputed: {
        langDir: (data) => data.supportedLanguages[data.locale].dir,
        /* Configure navigation */
        eleventyNavigation: {
            key: (data) => data.title,
            parent: (data) => data.parentTitle || "Projects",
            order: (data) => data.subPageOrder
        },
        /* Build a permalink using the title or slug and language key. */
        permalink: (data) => {
            if (data.link) {
                return null;
            }

            const locale = data.locale;
            return generatePermalink(
                data,
                "projects",
                locale === "fr-CA" ? "projets" : "projects"
            );
        }
    }
};
