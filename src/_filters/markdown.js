const markdownIt = require("markdown-it")({
    html: true
});

module.exports = value => {
    return markdownIt.render(value);
};
