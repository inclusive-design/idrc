/* eslint-disable react/display-name, no-unused-vars */
/* global CMS, nunjucks, PropTypes, React */

import formatDateFilter from "eleventy-plugin-fluid/src/filters/format-date-filter.js";
import isoDateFilter from "eleventy-plugin-fluid/src/filters/iso-date-filter.js";
import limitFilter from "eleventy-plugin-fluid/src/filters/limit-filter.js";
import markdownFilter from "eleventy-plugin-fluid/src/filters/markdown-filter.js";
import splitFilter from "eleventy-plugin-fluid/src/filters/split-filter.js";
import getResourceMetadataLabelFilter from "../_filters/getResourceMetadataLabel.js";
import site from "../_data/site.json";
import imagePositionWithTextShortcode from "../_shortcodes/image-position-with-text.js";
import getId from "../_utils/extract-youtube-id.js";
import slugify from "@sindresorhus/slugify";

const env = nunjucks.configure();

const markdown = function (value) {
    const options = {
        html: true,
        linkify: true,
        typographer: true
    };
    const plugins = [];
    return markdownFilter(value, options, plugins);
};

env.addFilter("formatDate", formatDateFilter);
env.addFilter("isoDate", isoDateFilter);
env.addFilter("limit", limitFilter);
env.addFilter("markdown", markdown);
env.addFilter("slugify", slugify);
env.addFilter("split", splitFilter);
env.addFilter("locale_links", function (value) {
    return [];
});
env.addFilter("eleventyNavigation", () => []);
env.addFilter("eleventyNavigationBreadcrumb", () => []);
env.addFilter("getResourceMetadataLabel", getResourceMetadataLabelFilter);

const Preview = ({entry, path, context}) => {
    const data = context(entry.get("data").toJS());
    const html = env.render(path, {...data, site});
    return <div dangerouslySetInnerHTML={{__html: html}}/>;
};

Preview.propTypes = {
    entry: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    context: PropTypes.func.isRequired
};

CMS.registerPreviewStyle("/assets/styles/app.css");

const Page = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/page.njk"
        context={({site, title, intro, body, sections, headerBgColor, headerTextColor, headerBorderColor}) => ({
            previewMode: true,
            site,
            title,
            intro,
            content: markdown(body || ""),
            sections,
            headerBgColor,
            headerTextColor,
            headerBorderColor
        })}
    />
);

Page.propTypes = {
    entry: PropTypes.object.isRequired
};

const History = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/history.njk"
        context={({site, title, intro, milestones, body, headerBgColor, headerTextColor, headerBorderColor}) => ({
            previewMode: true,
            site,
            title,
            intro,
            content: markdown(body || ""),
            headerBgColor,
            headerTextColor,
            headerBorderColor,
            milestones
        })}
    />
);

History.propTypes = {
    entry: PropTypes.object.isRequired
};

const Person = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/single--person.njk"
        context={({title, intro, pronouns, job, projects, interests, body, email, website, twitter, linkedin, github}) => ({
            previewMode: true,
            title,
            intro,
            pronouns,
            job,
            projects,
            interests,
            content: markdown(body || ""),
            email,
            website,
            twitter,
            linkedin,
            github
        })}
    />
);

Person.propTypes = {
    entry: PropTypes.object.isRequired
};

const News = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/single--news.njk"
        context={({site, title, date, author, body}) => ({
            previewMode: true,
            site,
            title,
            date,
            author,
            headerBgColor: "white",
            content: markdown(body || "")
        })}
    />
);

News.propTypes = {
    entry: PropTypes.object.isRequired
};

const Idea = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/single--idea.njk"
        context={({site, title, date, author, body}) => ({
            previewMode: true,
            site,
            title,
            date,
            author,
            headerBgColor: "white",
            content: markdown(body || "")
        })}
    />
);

Idea.propTypes = {
    entry: PropTypes.object.isRequired
};

const Project = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/project.njk"
        context={({parentTitle, projectName, title, body}) => ({
            previewMode: true,
            parentTitle,
            title,
            headerBgColor: "coral-500",
            headerBorderColor: "coral-800",
            headerTextColor: "black",
            content: markdown(body || "")
        })}
    />
);

Project.propTypes = {
    entry: PropTypes.object.isRequired
};

const Resource = ({entry}) => (
    <Preview
        entry={entry}
        path="layouts/single--resource.njk"
        context={({title, description, publishedYear, topics, types, thumbnailImage, thumbnailAltText, link }) => ({
            previewMode: true,
            title,
            description,
            publishedYear,
            thumbnailImage,
            thumbnailAltText,
            link,
            topics,
            types
        })}
    />
);

Resource.propTypes = {
    entry: PropTypes.object.isRequired
};

const SiteData = ({entry}) => (
    <Preview
        entry={entry}
        path="partials/global/footer.njk"
        context={({name, description, url, email, phone, fax, address, twitter, medium, youtube}) => ({
            site: {
                name,
                description,
                url,
                email,
                phone,
                fax,
                address,
                twitter,
                medium,
                youtube
            }
        })}
    />
);

SiteData.propTypes = {
    entry: PropTypes.object.isRequired
};

CMS.registerPreviewTemplate("home", Page);
CMS.registerPreviewTemplate("history", History);
CMS.registerPreviewTemplate("pages", Page);
CMS.registerPreviewTemplate("news", News);
CMS.registerPreviewTemplate("ideas", Idea);
CMS.registerPreviewTemplate("people", Person);
CMS.registerPreviewTemplate("projects", Project);
CMS.registerPreviewTemplate("resources", Resource);
CMS.registerPreviewTemplate("site_data", SiteData);

// Custom widgets
CMS.registerEditorComponent({
    id: "image-position-with-text",
    label: "Image Position with Text",
    fields: [
        {
            name: "image",
            label: "Image",
            widget: "image",
            required: true
        },
        {
            name: "alt",
            label: "Alternative Text",
            default: "",
            widget: "string"
        },
        {
            name: "imagePosition",
            label: "Image Position",
            hint: "The \"Center\" choice only applies if the \"Content\" field below is empty.",
            widget: "select",
            options: [{value:"left", label: "Left"}, {value:"center", label: "Center (default)"}, {value:"right", label: "Right"}],
            default: "center"
        },
        {
            name: "scale",
            label: "Scale Image Width",
            widget: "select",
            default: "100",
            options: [{value:"25", label: "25%"}, {value:"50", label: "50%"}, {value:"75", label: "75%"}, {value:"100", label: "100% (default)"}]
        },
        {
            name: "maxHeight",
            label: "Max Height of Image",
            hint: "Useful for restricting height of tall images that may take too much vertical space.",
            widget: "select",
            default: "Auto",
            options: [{value:"auto", label: "Auto (default)"},{value:"200px", label: "200px"}, {value:"400px", label: "400px"}, {value:"600px", label: "600px"},{value:"800px", label: "800px"} ]
        },
        {
            name: "content",
            label: "Content",
            widget: "markdown",
            default: "",
            editor_components: [],
            required: false
        },
        {
            name: "verticalAlignment",
            label: "Vertical Alignment of Content to Image",
            hint: "Vertical Alignment of Content only applies if \"Content\" field above is not empty.",
            required: false,
            widget: "select",
            options: [{value:"top", label: "Top (default)"}, {value:"center", label: "Center"}, {value:"bottom", label: "Bottom"}]
        }
    ],
    pattern: /^{% imagePositionWithText "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)", "([\s\S]*?)" %}([\s\S]*?){% endimagePositionWithText %}/,
    fromBlock: function (match) {
        return {
            image: match[1],
            alt: match[2],
            imagePosition: match[3],
            scale: match[4],
            maxHeight: match[5],
            verticalAlignment: match[6],
            content: match[7]
        };
    },
    toBlock: function (obj) {
        return `{% imagePositionWithText "${obj.image}", "${obj.alt}", "${obj.imagePosition}", "${obj.scale}", "${obj.maxHeight}", "${obj.verticalAlignment}" %}\n${obj.content}\n{% endimagePositionWithText %}`;
    },
    toPreview: function (obj, getAsset, fields) {
        const {content, image, alt, imagePosition, scale, maxHeight, verticalAlignment} = obj;
        const imageField = fields.find(f => f.get("widget") === "image");
        const src = getAsset(image, imageField);
        return imagePositionWithTextShortcode(content, src, alt, imagePosition, scale, maxHeight, verticalAlignment);
    }
});

CMS.registerEditorComponent({
    id: "youtube",
    label: "YouTube Embed",
    fields: [
        {name: "url", label: "YouTube Video URL", widget: "string"}
    ],
    pattern: /^{% youtube "(\S+)" %}$/,
    fromBlock: function (match) {
        return {
            url: match[1]
        };
    },
    toBlock: function (obj) {
        return `{% youtube "${obj.url}" %}`;
    },
    toPreview: function (obj) {
        return (
            `<figure class="embed--youtube"><iframe class="video" src="https://youtube.com/embed/${getId(obj.url)}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></figure>`
        );
    }
});

CMS.registerEditorComponent({
    label: "File",
    id: "file",
    fromBlock: match =>
        match && {
            file: match[2],
            text: match[1]
        },
    toBlock: ({ text, file }) =>
        `[${text || ""}](${file || ""})`,
    toPreview: (obj) => {
        return <a href={obj.file || ""}>{obj.text}</a>;
    },
    pattern: /^\[(.*)\]\((.*?)\)$/,
    fields: [
        {
            label: "File",
            name: "file",
            widget: "file",
            media_library: {
                allow_multiple: false
            }
        },
        {
            label: "Link Text",
            name: "text"
        }
    ]
});
