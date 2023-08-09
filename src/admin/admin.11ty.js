const nunjucks = require("nunjucks");
const path = require("path");

const IExtension = function () {
    this.tags = ["_i"];

    this.parse = function (parser, nodes) {
	  // Get the tag token
	  const token = parser.nextToken();

	  // Get the arguments passed to the tag
	  const args = parser.parseSignature(null, true);

	  // Parse the body of the tag
	  parser.advanceAfterBlockEnd(token.value);

	  // Return the custom node
	  return new nodes.CallExtension(this, "run", args);
    };

    this.run = function (context, locale, message, data) {
	  // Replace '${locale}' with the locale value from the data object
	  const replacedMessage = message.replace("${locale}", data[locale]);

	  // Return the modified message
	  return replacedMessage;
    };
};

module.exports = class {
    async data() {
        return {
            permalink: "/admin/templates.js",
            eleventyExcludeFromCollections: true
        };
    }

    async precompile() {

        return new Promise((resolve, reject) => {
            const env = new nunjucks.Environment();

            env.addExtension("_i", new IExtension());
            env.addFilter("eleventyNavigation", () => []);
            env.addFilter("eleventyNavigationBreadcrumb", () => []);

            const templates = nunjucks.precompile(
                path.join(__dirname, "../_includes/"),
                {
                    env,
                    include: [
                        "preview.njk",
                        "page.njk",
                        "page-header.njk",
                        "history.njk",
                        "projects.njk",
                        "section.njk",
                        "single.njk",
                        "single-header.njk",
                        "person-header.njk",
                        "single--person.njk",
                        "single--news.njk",
                        "single--idea.njk",
                        "project.njk",
                        "single--resource.njk",
                        "footer.njk",
                        "\\.svg$"
                    ]
                }
            );
            if (templates) {
                resolve(templates);
            } else {
                reject(templates);
            }
        });
    }

    async render() {
        try {
            const result = await this.precompile();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
};
