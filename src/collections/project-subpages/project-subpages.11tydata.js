import { generatePermalink } from "eleventy-plugin-fluid";

export default {
    eleventyComputed: {
        langDir: (data) => data.supportedLanguages[data.locale].dir,
        /* Configure navigation */
        eleventyNavigation: {
            key: (data) => data.uuid,
            title: (data) => data.title,
            parent: (data) => data.parent,
            order: (data) => data.order
        },
        permalink: (data) => {
            const locale = data.locale;
            const slug = `${data.parent}/${data.slug}`;
            data.slug = slug;

            return generatePermalink(
                data,
                "projects",
                locale === "fr-CA" ? "projets" : "projects"
            );
        }
    }
};
