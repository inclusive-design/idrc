const markdown = require("../../node_modules/eleventy-plugin-fluid/src/filters/markdown-filter.js");

module.exports = (content, image, alt, imagePosition, scale, maxHeight, verticalAlignment) => {
    content = content.trim();
    let output = "";

    if (content === "") {
        output += `<p><img src="${image}" alt="${alt}" class="image-position--${imagePosition} image-position--image-height image__scale--${scale} image__max-height--${maxHeight}" /></p>`;
    } else {
        output += `<div class="image-and-text image-and-text--image-${imagePosition} image-and-text--image-${scale} image-and-text--vertical-${verticalAlignment}"><figure class="image-and-text__media"><img src="${image}" alt="${alt}" class="image-position--image-height image__max-height--${maxHeight}" /></figure><div class="image-and-text__content">${markdown(content)}</div></div>`;
    }
    return output;
};
