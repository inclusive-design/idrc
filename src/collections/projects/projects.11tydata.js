import { generatePermalink } from "eleventy-plugin-fluid";

export default {
    eleventyComputed: {
        langDir: (data) => data.supportedLanguages[data.locale].dir,
        /* Configure navigation */
        eleventyNavigation: {
            key: (data) => data.translationKey,
            title: (data) => data.title,
            parent: "Projects",
            order: (data) => data.order,
            lang: (data) => data.locale
        },
        /* Build a permalink using the title or slug and language key. */
        permalink: (data) => {
            if (data.linking.type === "link") {
                return false;
            }

            const locale = data.locale;
            data.slug = data.linking.slug;

            return generatePermalink(
                data,
                "projects",
                locale === "fr-CA" ? "projets" : "projects"
            );
        }
    }
};
