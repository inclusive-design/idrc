const {parseHTML} = require("linkedom");
const getId = require("../_utils/extract-youtube-id.js");

module.exports = (value, outputPath) => {
    if (outputPath && outputPath.includes(".html")) {
        const {document} = parseHTML(value);
        const images = [
            ...document.querySelectorAll("main article img")
        ];
        const links = [
            ...document.querySelectorAll("main a")
        ];
        const youtubeLinks = [
            ...document.querySelectorAll("main a[href*='youtube'], main a[href*='youtu.be']")
        ];
        const subheads = [
            ...document.querySelectorAll("[data-subsection-level=\"3\"] h3, [data-subsection-level=\"4\"] h4")
        ];

        if (images.length > 0) {
            for (const image of images) {
                image.setAttribute("loading", "lazy");

                // If an image has a title it means that the user added a caption
                // so replace the image with a figure containing that image and a caption
                if (image.hasAttribute("title")) {
                    const figure = document.createElement("figure");
                    const figCaption = document.createElement("figcaption");

                    figCaption.innerHTML = image.getAttribute("title");

                    image.removeAttribute("title");

                    figure.append(image.cloneNode(true));
                    figure.append(figCaption);

                    image.replaceWith(figure);
                }
            }
        }

        if (links.length > 0) {
            for (const link of links) {
                if (
                    link.href &&
                    !link.href.startsWith("/") &&
					(!["localhost:3000", "localhost:8080", "idrc.ocadu.ca"].includes(link.host) || !link.host.endsWith("idrc.netlify.app"))
                ) {
                    link.setAttribute("rel", "external");
                    if (!link.closest("nav") && link.className !== "project__link") {
                        link.innerHTML = `<span>${link.innerHTML}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" role="presentation" aria-hidden="true"><path d="M13.4444 8.77778V13.4444C13.4444 13.857 13.2806 14.2527 12.9888 14.5444C12.6971 14.8361 12.3014 15 11.8889 15H2.55556C2.143 15 1.74733 14.8361 1.45561 14.5444C1.16389 14.2527 1 13.857 1 13.4444V4.11111C1 3.69855 1.16389 3.30289 1.45561 3.01117C1.74733 2.71944 2.143 2.55556 2.55556 2.55556H7.22222V4.11111H2.55556V13.4444H11.8889V8.77778H13.4444ZM8.77778 1V2.55556H12.3447L6.28344 8.61678L7.38322 9.71656L13.4444 3.65533V7.22222H15V1H8.77778Z" fill="currentColor"/></svg>`;
                    }
                }

                if (
                    link.href.endsWith(".docx") || link.href.endsWith(".pdf")
                ) {
                    link.setAttribute("download", "");
                    link.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16" role="presentation" aria-hidden="true"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 11.5v1.75A1.75 1.75 0 0 0 2.75 15h10.5A1.75 1.75 0 0 0 15 13.25V11.5M11.5 8 8 11.5m0 0L4.5 8M8 11.5V1"/></svg><span>${link.innerHTML}</span>`;
                }
            }
        }

        if (youtubeLinks.length > 0) {
            for (const link of links) {
                if (link.href === link.textContent) {
                    const id = getId(link.href);

                    if (id) {
                        const figure = document.createElement("figure");
                        figure.className = "embed--youtube";
                        figure.innerHTML = `<iframe title="YouTube video player" class="video" src="https://www.youtube.com/embed/${id}/" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                        link.replaceWith(figure);
                    }
                }
            }
        }

        if (subheads.length > 0) {
            // Loop each heading and add a little anchor and an ID to each one
            for (const heading of subheads) {
                // Function to create a node list
                // of the content between this <h2> and the next
                const getContent = element => {
                    const elems = [];
                    const headings = (element.tagName === "H3") ? new Set(["H2", "H3"]) : new Set(["H2", "H3", "H4"]);
                    while (element.nextElementSibling && !headings.has(element.nextElementSibling.tagName)) {
                        elems.push(element.nextElementSibling);
                        element = element.nextElementSibling;
                    }

                    // Delete the old versions of the content nodes
                    for (const node of elems) {
                        node.remove();
                    }

                    return elems;
                };

                const contents = getContent(heading);

                const wrapper = document.createElement("div");

                wrapper.className = "subsection";

                // Add each element of `contents` to `wrapper`
                for (const node of contents) {
                    wrapper.append(node);
                }

                // Add the wrapped content back into the DOM
                // after the heading
                heading.parentNode.insertBefore(wrapper, heading.nextElementSibling);
                wrapper.prepend(heading);
            }
        }

        return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
    }

    return value;
};
